import { createPool } from 'mysql2/promise';

import { host } from '../../../utils/config';

const pool = createPool({
	host: host,
	user: 'root',
	password: 'root',
	port: '3307',
	database: 'solar_lab_db',
});

export default async function handler(req, res) {
	const query = 'SELECT * FROM students';

	try {
		const [names] = await pool.query(query);
		return res.status(400).json(names);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
}
