import db from '@/lib/db';
import { hash } from 'bcrypt';

export default async function Post(req, res) {
	if (req.method === 'POST') {
		const { email, fullname, studentCode, password } = req.body;
		const studentExists = await db.Student.findUnique({
			where: {
				email: email,
			},
		});
		if (studentExists) {
			return res.status(422).json({ error: 'User Already Exists..!' });
		} else {
			try {
				await db.Student.create({
					data: {
						email: email,
						fullname: fullname,
						studentCode: studentCode,
						password: await hash(password, 12),
					},
				});
				return res.status(201).json({ status: true });
			} catch {
				return res.status(400).json({ error: 'Error Creating User' });
			}
		}
	} else {
		return res.status(500).json({ error: 'HTTP Method not Valid' });
	}
}
