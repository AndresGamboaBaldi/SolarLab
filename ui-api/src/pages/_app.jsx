import '@/styles/globals.scss';
import { SessionProvider } from 'next-auth/react';
import theme from '../styles/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Lato } from 'next/font/google';
import NavBar from '../components/NavBar';
import React from 'react';

const lato = Lato({
	subsets: ['latin'],
	weight: ['300', '400', '700'],
});

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<SessionProvider session={session}>
				<NavBar />
				<Component {...pageProps} />
			</SessionProvider>
		</ThemeProvider>
	);
}

