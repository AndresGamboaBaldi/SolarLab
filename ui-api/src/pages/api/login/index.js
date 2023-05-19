import db from '@/lib/db';
import { compare } from 'bcrypt';

export default async function Post(req, res) {
	if (req.method === 'POST') {
		const credentials = await req.body;
		const student = await db.Student.findFirst({
			where: {
				email: credentials.email,
			},
		});
		if (student && (await compare(credentials.password, student.password))) {
			const { password, ...studentWithoutPass } = student;
			return res.status(200).json(studentWithoutPass);
		} else {
			return res.status(400).json(null);
		}
	} else {
		return res.status(500).json({ error: 'HTTP Method not Valid' });
	}
}
