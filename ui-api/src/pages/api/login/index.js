import db from '@/lib/db';
import * as bcrypt from 'bcrypt';

export default async function Post(req, res) {
	const credentials = await req.body;

	const student = await db.Student.findFirst({
		where: {
			email: credentials.email,
		},
	});
	//if (student && (await bcrypt.compare(body.password, student.passwword))) {
	if (student && credentials.password === student.password) {
		const { password, ...studentWithoutPass } = student;
		return res.status(200).json(studentWithoutPass);
	} else {
		return res.status(400).json(null);
	}
}
