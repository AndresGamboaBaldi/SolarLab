import db from '@/lib/db';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const student = await db.Student.findFirst({
				where: {
					email: req.body.email,
				},
			});
			return res.status(200).json(student);
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	} else {
		return res.status(500).json({ error: 'HTTP Method not Valid' });
	}
}
