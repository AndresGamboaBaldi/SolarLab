import db from '@/lib/db';
import { hash } from 'bcrypt';

export default async function Post(req, res) {
	if (req.method === 'POST') {
		const { email, fullname, code, password, isTeacher } = req.body;
		const userExists = await db.User.findFirst({
			where: {
				email: email,
			},
		});
		if (userExists) {
			return res.status(422).json({ error: 'User Already Exists..!' });
		} else {
			try {
				await db.User.create({
					data: {
						email: email,
						fullname: fullname,
						code: code,
						password: await hash(password, 12),
					},
				});
				if (isTeacher) {
					await db.Teacher.create({
						data: {
							user: {
								connect: {
									email: email,
								},
							},
						},
					});
				} else {
					await db.Student.create({
						data: {
							user: {
								connect: {
									email: email,
								},
							},
						},
					});
				}
				return res.status(201).json({ status: true });
			} catch (error) {
				return res.status(400).json({ error: 'Error Creating User' });
			}
		}
	} else {
		return res.status(500).json({ error: 'HTTP Method not Valid' });
	}
}
