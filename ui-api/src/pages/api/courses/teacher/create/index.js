import db from '@/lib/db';

export default async function Post(req, res) {
	if (req.method === 'POST') {
		const { email, name } = req.body;
		try {
			await db.Course.create({
				data: {
					teacher: {
						connect: {
							userEmail: email,
						},
					},
					name: name,
				},
			});

			return res.status(201).json({ status: true });
		} catch (error) {
			return res
				.status(400)
				.json({ error: 'Error Requesting, Please Try Again', status: false });
		}
	} else {
		return res.status(500).json({ error: 'HTTP Method not Valid' });
	}
}
