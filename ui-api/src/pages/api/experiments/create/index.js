import db from '@/lib/db';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const experimentToSave = await db.Experiment.create({
				data: {
					name: req.body.experimentName,
					experimentDate: req.body.experimentDate,
					experimentTime: req.body.experimentTime,
					timezone: req.body.timezone,
					student: {
						connect: {
							userEmail: req.body.email,
						},
					},
					departmentLabs: {
						create: req.body.departments,
					},
				},
			});
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
							power: record.power,
							city: record.city,
						},
					});
				});
			});
			return res
				.status(200)
				.json({ experimentToSave: experimentToSave, status: true });
		} catch (error) {
			return res.status(400).json({ error: error.message, status: false });
		}
	} else {
		return res.status(500).json({ error: 'HTTP Method not Valid' });
	}
}
