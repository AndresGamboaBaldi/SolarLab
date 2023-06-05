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
			console.log(req.body.efficiencyTestRecords);
			req.body.efficiencyTestRecords.forEach((recordsObject) => {
				recordsObject.efficiencyTest.forEach(async (record) => {
					const saved = await db.TestRecord.create({
						data: {
							departmentlab: {
								connect: {
									id: recordsObject.id,
								},
							},
							voltage: record.voltage,
							current: record.current,
						},
					});
				});
			});
			return res
				.status(200)
				.json({ experimentToSave: experimentToSave, status: true });
		} catch (error) {
			console.log(error);
			return res.status(400).json({ error: error.message, status: false });
		}
	} else {
		return res.status(500).json({ error: 'HTTP Method not Valid' });
	}
}
