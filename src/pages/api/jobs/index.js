// pages/api/jobs/index.js
import pg from "pg";
const { Pool } = pg;

// ✅ 1. Secure Supabase connection (works on Render, Vercel, or local)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,              // Force SSL
    rejectUnauthorized: false,  // Ignore self-signed certs (Supabase safe)
  },
  idleTimeoutMillis: 10000,     // Prevent hanging connections
  connectionTimeoutMillis: 5000 // Fail fast if DB unreachable
});

// ✅ 2. Query helper
const query = (text, params) => pool.query(text, params);

export default async function handler(req, res) {
  // ✅ GET — fetch all jobs
  if (req.method === "GET") {
    try {
      const { rows } = await query(
        `SELECT id, service, district, description, budget, status, created_at
         FROM jobs
         ORDER BY created_at DESC`
      );
      return res.status(200).json(rows);
    } catch (err) {
      console.error("[DB ERROR - GET]", err);
      return res.status(500).json({ message: "Failed to fetch jobs" });
    }
  }

  // ✅ POST — create new job
  if (req.method === "POST") {
    const { service, district, description, budget } = req.body;

    // ✅ 3. Basic validation
    if (!service || !district || !description || budget < 10) {
      return res.status(400).json({ message: "Missing or invalid fields" });
    }

    try {
      // ✅ 4. Insert job into DB
      const { rows } = await query(
        `INSERT INTO jobs (service, district, description, budget, status, created_at)
         VALUES ($1, $2, $3, $4, 'open', NOW())
         RETURNING id`,
        [service, district, description, budget]
      );

      const jobId = rows[0]?.id;

      // ✅ 5. Log success (mock provider notification)
      console.log(`[JOB-${jobId}] New ${service} job in ${district} – $${budget}`);

      // ✅ 6. Respond success
      return res.status(201).json({ message: "Job posted successfully", id: jobId });
    } catch (err) {
      console.error("[DB ERROR - POST]", err);
      return res.status(500).json({ message: "Database connection failed" });
    }
  }

  // ✅ 7. Handle invalid methods
  return res.status(405).json({ message: "Method not allowed" });
}
