import db from '@/lib/db';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const experimentToSave = await db.Experiment.create({
				data: {
					name: req.body.experimentName,
					student: {
						connect: {
							email: req.body.email,
						},
					},
					departmentLabs: {
						create: req.body.departments,
					},
				},
			});
			return res.status(200).json(experimentToSave);
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	} else {
		return res.status(500).json({ error: 'HTTP Method not Valid' });
	}
}
