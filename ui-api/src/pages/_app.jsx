import '@/styles/globals.scss';
import { SessionProvider } from 'next-auth/react';
import theme from '../styles/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Lato } from 'next/font/google';
import NavBar from '../components/NavBar';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const lato = Lato({
	subsets: ['latin'],
	weight: ['300', '400', '700'],
});

export default function App({ Component, pageProps }) {
	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<SessionProvider session={pageProps.session}>
					<NavBar />
					<Component {...pageProps} />
				</SessionProvider>
			</ThemeProvider>
			<ToastContainer
				theme='dark'
				position='bottom-center'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable={false}
				pauseOnHover
				style={{ minWidth: 'fit-content' }}
			/>
		</>
	);
}

