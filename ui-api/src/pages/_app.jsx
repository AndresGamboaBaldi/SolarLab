import '@/styles/globals.scss';
import theme from '../styles/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Lato } from 'next/font/google';
import NavBar from '../components/NavBar';
import React, { useState, useMemo } from 'react';
import { UserContext } from '../contexts/UserContext.js';

const lato = Lato({
	subsets: ['latin'],
	weight: ['300', '400', '700'],
});

export default function App({ Component, pageProps }) {
	const [user, setUser] = useState(null);

	const value = useMemo(() => ({ user, setUser }), [user, setUser]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<UserContext.Provider value={value}>
				<NavBar />
				<Component {...pageProps} />
			</UserContext.Provider>
		</ThemeProvider>
	);
}

