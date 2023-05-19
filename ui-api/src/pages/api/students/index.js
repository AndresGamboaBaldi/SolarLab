import db from '@/lib/db';

export default async function handler(req, res) {
	try {
		const students = await db.DepartmentLab.findMany();

		return res.status(200).json(students);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
}
