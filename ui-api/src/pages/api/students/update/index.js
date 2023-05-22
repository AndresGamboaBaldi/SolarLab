import db from '@/lib/db';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const updateStudent = await db.Student.update({
				where: {
					email: req.body.email,
				},
				data: {
					fullname: req.body.fullname,
					studentCode: req.body.studentCode,
				},
			});
			return res.status(200).json(updateStudent);
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	} else {
		return res.status(500).json({ error: 'HTTP Method not Valid' });
	}
}
