import db from '@/lib/db';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const deletedUser = await db.Experiment.delete({
				where: {
					id: req.body,
				},
			});
			return res.status(200).json(deletedUser);
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	} else {
		return res.status(500).json({ error: 'HTTP Method not Valid' });
	}
}
