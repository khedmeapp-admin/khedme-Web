import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function getPendingProviders(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { rows } = await pool.query(
      'SELECT * FROM providers WHERE approved = false'
    );
    console.log("Pending Providers: ", rows); // Log the providers fetched from DB
    res.status(200).json({ providers: rows });
  } catch (err) {
    console.error('[PENDING PROVIDERS ERROR]', err); // Log the error
    res.status(500).json({ message: 'Server error while fetching providers' });
  }
}
