// pages/api/providers/approve.js
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function approveProvider(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Get the provider ID from the request query
  const { id } = req.query;

  try {
    // Update the provider's approval status
    const { rowCount } = await pool.query(
      'UPDATE providers SET approved = true WHERE id = $1 RETURNING id',
      [id]
    );

    if (rowCount === 0) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    res.status(200).json({ message: 'Provider approved' });
  } catch (err) {
    console.error('[APPROVE PROVIDER]', err);
    res.status(500).json({ message: 'Server error' });
  }
}
