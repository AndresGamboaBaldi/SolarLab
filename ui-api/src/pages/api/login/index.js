import prisma from '@/lib/prisma';
import * as bcrypt from 'bcrypt';

export default async function Post(req) {
	const body = await req.json();

	const student = await prisma.use.findFirst({
		where: {
			email: body.username,
		},
	});

	if (student && (await bcrypt.compare(body.password, student.passwword))) {
		const { password, ...studentWithoutPass } = student;

		return res.status(200).json(studentWithoutPass);
	} else {
		return res.status(200).json(null);
	}
}
