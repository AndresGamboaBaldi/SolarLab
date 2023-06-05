import db from '@/lib/db';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const user = await db.User.findFirst({
				where: {
					email: req.body.email,
				},

				include: {
					teacher: {
						include: {
							courses: true,
						},
					},
					student: {
						include: {
							courses: {
								include: {
									teacher: {
										include: {
											user: true,
										},
									},
								},
							},
						},
					},
				},
			});
			const { password, ...userWithoutPass } = user;
			return res.status(200).json({ user: userWithoutPass, status: true });
		} catch (error) {
			return res.status(400).json({ error: error.message, status: false });
		}
	} else {
		return res.status(500).json({ error: 'HTTP Method not Valid' });
	}
}
