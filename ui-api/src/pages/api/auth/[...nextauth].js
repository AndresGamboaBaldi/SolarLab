import NextAuth from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
	providers: [
		CredentialsProvider({
			async authorize(credentials, req) {
				const user = {
					email: credentials.email,
					password: credentials.password,
				};

				const response = await fetch(
					`http://${process.env.HOST}:3000/api/login`,
					{
						headers: {
							'Content-Type': 'application/json',
						},
						method: 'POST',
						body: JSON.stringify(user),
					}
				);
				const session = await response.json();
				if (session) {
					return session;
				} else {
					return null;
				}
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
