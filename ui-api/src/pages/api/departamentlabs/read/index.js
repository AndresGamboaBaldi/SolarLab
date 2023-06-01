import db from '@/lib/db';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const departamentLabs = await db.DepartmentLab.findMany({
				where: {
					experimentId: req.body.id,
				},
			});
			return res
				.status(200)
				.json({ departamentLabs: departamentLabs, status: true });
		} catch (error) {
			return res.status(400).json({ error: error.message, status: false });
		}
	} else {
		return res.status(500).json({ error: 'HTTP Method not Valid' });
	}
}
