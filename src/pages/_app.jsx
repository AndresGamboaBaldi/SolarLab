import '@/styles/globals.scss';
import theme from '../styles/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Lato } from 'next/font/google';

const lato = Lato({
	subsets: ['latin'],
	weight: ['300', '400', '700'],
});

export default function App({ Component, pageProps }) {
	return (
		<ThemeProvider theme={theme} clasename={lato.className}>
			<CssBaseline />
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

