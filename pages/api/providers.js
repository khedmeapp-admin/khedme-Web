// pages/api/providers.js
import fs from 'fs';
import path from 'path';
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

export const config = { api: { bodyParser: false } }; // handle multipart

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {
    // 1. Parse multipart form (minimal, no external lib)
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const data = Buffer.concat(chunks).toString('latin1');
    const boundary = data.split('\r\n')[0];
    const parts = data.split(boundary).filter(p => p.includes('Content-Disposition'));

    const body = {};
    const files = {};
    parts.forEach(part => {
      const [disposition, ...rest] = part.split('\r\n');
      const name = disposition.match(/name="([^"]+)"/)?.[1];
      const filename = disposition.match(/filename="([^"]+)"/)?.[1];
      const content = rest.slice(2, -2).join('\r\n');
      if (filename) {
        files[name] = { filename, buffer: Buffer.from(content, 'latin1') };
      } else {
        body[name] = content.replace(/\r\n$/, '');
      }
    });

    // 2. Basic validation
    const { branch, service, district, phone, bio, price } = body;
    if (!branch || !service || !district || !phone || !bio || !price || !files.idFile || !files.selfieFile) {
      return res.status(400).json({ message: 'Missing fields or files' });
    }

    // 3. Save files locally (you can swap to Cloudinary later)
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    const idPath = `/uploads/${Date.now()}_id.jpg`;
    const selfiePath = `/uploads/${Date.now()}_selfie.jpg`;
    fs.writeFileSync(path.join(process.cwd(), idPath), files.idFile.buffer);
    fs.writeFileSync(path.join(process.cwd(), selfiePath), files.selfieFile.buffer);

    // 4. Insert provider (pending)
    const { rows } = await pool.query(
      `INSERT INTO providers(branch, service, district, phone, bio, price, id_doc, selfie, approved, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, false, NOW()) RETURNING id`,
      [branch, service, district, phone, bio, price, idPath, selfiePath]
    );

    // 5. Mock notification (you can add SMS later)
    console.log(`[PROVIDER-${rows[0].id}] New ${service} provider in ${district} – phone ${phone}`);

    res.status(201).json({ message: 'Application received – pending approval', id: rows[0].id });
  } catch (err) {
    console.error('[PROVIDER]', err);
    res.status(500).json({ message: 'Server error' });
  }
}
