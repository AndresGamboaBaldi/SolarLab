import db from '@/lib/db';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const data = await db.Radiation.findMany({
				select: {
					time: true,
					radiation: true,
				},
				where: {
					date: {
						equals: req.body.date,
					},
				},
				orderBy: {
					id: 'asc',
				},
			});
			return res.status(200).json({ data: data, status: true });
		} catch (error) {
			console.log(error);
			return res.status(400).json({ error: error.message, status: false });
		}
	} else {
		return res.status(500).json({ error: 'HTTP Method not Valid' });
	}
}
