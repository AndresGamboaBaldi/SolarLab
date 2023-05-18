import prisma from '@/lib/prisma';

export default async function handler(req, res) {
	try {
		const students = await prisma.DepartmentLab.findMany();
		return res.status(200).json(students);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
}
