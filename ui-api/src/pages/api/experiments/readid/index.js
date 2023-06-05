import db from '@/lib/db';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const experiment = await db.Experiment.findFirst({
				where: {
					id: req.body.id,
				},
				include: {
					departmentLabs: {
						include: {
							efficiencyTest: {
								orderBy: {
									current: 'desc',
								},
							},
						},
					},
				},
			});
			return res.status(200).json({ experiment: experiment, status: true });
		} catch (error) {
			return res.status(400).json({ error: error.message, status: false });
		}
	} else {
		return res.status(500).json({ error: 'HTTP Method not Valid' });
	}
}
