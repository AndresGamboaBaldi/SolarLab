import db from '@/lib/db';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const experiments = await db.Experiment.findMany({
				where: {
					email: req.body.email,
				},
			});
			return res.status(200).json(experiments);
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	} else {
		return res.status(500).json({ error: 'HTTP Method not Valid' });
	}
}
