import db from '@/lib/db';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			req.body.efficiencyTest.forEach(async (testRecord) => {
				const saved = await db.TestRecord.create({
					data: {
						departmentlab: {
							connect: {
								id: req.body.id,
							},
						},
						voltage: testRecord.voltage,
						current: testRecord.current,
					},
				});
			});

			return res.status(200).json({ status: true });
		} catch (error) {
			return res.status(400).json({ error: error.message, status: false });
		}
	} else {
		return res.status(500).json({ error: 'HTTP Method not Valid' });
	}
}
