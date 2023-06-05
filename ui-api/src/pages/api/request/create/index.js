import db from '@/lib/db';

export default async function Post(req, res) {
	if (req.method === 'POST') {
		const { email, courseId } = req.body;
		try {
			await db.Request.create({
				data: {
					student: {
						connect: {
							userEmail: email,
						},
					},
					course: {
						connect: {
							id: courseId,
						},
					},
					status: 'Pending',
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
