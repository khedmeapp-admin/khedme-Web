// pages/api/jobs.js
import pg from 'pg';
const { Pool } = pg;

// 1. Connection pool (free plan safe)
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

// 2. Helper: run query
const query = (text, params) => pool.query(text, params);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { service, district, description, budget } = req.body;

  // 3. Basic validation
  if (!service || !district || !description || budget < 10) {
    return res.status(400).json({ message: 'Missing or invalid fields' });
  }

  try {
    // 4. Insert job
    const { rows } = await query(
      `INSERT INTO jobs(service, district, description, budget, status, created_at)
       VALUES ($1, $2, $3, $4, 'open', NOW()) RETURNING id`,
      [service, district, description, budget]
    );
    const jobId = rows[0].id;

    // 5. Mock provider notification (replace with SMS later)
    console.log(`[JOB-${jobId}] New ${service} job in ${district} – $${budget}`);

    // 6. Success
    res.status(201).json({ message: 'Job posted', id: jobId });
  } catch (err) {
    console.error('[DB]', err);
    res.status(500).json({ message: 'Server error' });
  }
}
