import db from '@/lib/db';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const student = await db.Student.findFirst({
				where: {
					email: req.body.email,
				},
			});
			const { password, ...studentWithoutPass } = student;
			return res
				.status(200)
				.json({ student: studentWithoutPass, status: true });
		} catch (error) {
			return res.status(400).json({ error: error.message, status: false });
		}
	} else {
		return res.status(500).json({ error: 'HTTP Method not Valid' });
	}
}
