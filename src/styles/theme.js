import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			50: '#E2ECFF',
			100: '#BDC7E4',
			200: '#90A5D7',
			300: '#637BBC',
			400: '#4F68AF',
			500: '#3E55A2',
			600: '#2E4594',
			700: '#203587',
			800: '#14287A',
			900: '#02115F',
		},
		secondary: {
			main: '#F6BD2B',
		},
		error: {
			main: '#FF6961',
		},
		info: {
			main: '#3080ED',
		},
		warning: {
			main: '#F0922B',
		},
		success: {
			main: '#51E25E',
		},
		whity: {
			main: '#FFFFFF',
		},
		blacky: {
			main: '#000000',
		},
	},
	typography: {
		header1: {
			fontFamily: 'Lato',
			fontWeight: 700,
			fontSize: '1.5rem',

			'@media (min-width:350px)': {
				fontSize: '1.6rem',
			},
			'@media (min-width:600px)': {
				fontSize: '2.3rem',
			},
		},
		header2: {
			fontFamily: 'Lato',
			fontWeight: 700,
			fontSize: '1.1rem',

			'@media (min-width:350px)': {
				fontSize: '1.1rem',
			},
			'@media (min-width:600px)': {
				fontSize: '1.6rem',
			},
		},
		body1: {
			fontFamily: 'Lato',
			fontSize: '0.4rem',

			'@media (min-width:350px)': {
				fontSize: '0.8rem',
			},
			'@media (min-width:600px)': {
				fontSize: '1.0rem',
			},
		},
		header3: {
			fontFamily: 'Lato',
			fontSize: '0.8rem',

			'@media (min-width:350px)': {
				fontSize: '0.9rem',
			},
			'@media (min-width:600px)': {
				fontSize: '1.2rem',
			},
		},
		buttons2: {
			fontSize: '0.6rem',

			'@media (min-width:350px)': {
				fontSize: '0.8rem',
			},
			'@media (min-width:600px)': {
				fontSize: '1rem',
			},
		},
	},
	breakpoints: {
		values: {
			xxs: 0,
			xs: 350,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1536,
		},
	},
	shape: {
		borderRadius: 16,
	},
});

export default theme;
