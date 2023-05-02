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
		white: {
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
			'@media (min-width:200px)': {
				fontSize: '1.3rem',
			},
			'@media (min-width:372px)': {
				fontSize: '1.6rem',
			},
			'@media (min-width:664px)': {
				fontSize: '2.3rem',
			},
		},
		header2: {
			fontFamily: 'Lato',
			fontWeight: 700,
			fontSize: '0.6rem',
			'@media (min-width:306px)': {
				fontSize: '0.8rem',
			},
			'@media (min-width:388px)': {
				fontSize: '1.1rem',
			},
			'@media (min-width:664px)': {
				fontSize: '1.6rem',
			},
		},
		titleDialog: {
			fontFamily: 'Lato',
			fontWeight: 700,
			fontSize: '0.7rem',
			'@media (min-width:318px)': {
				fontSize: '0.9rem',
			},
			'@media (min-width:360px)': {
				fontSize: '1.0rem',
			},
			'@media (min-width:472px)': {
				fontSize: '1.2rem',
			},
			'@media (min-width:538px)': {
				fontSize: '1.0rem',
			},
			'@media (min-width:573px)': {
				fontSize: '1.2rem',
			},
			'@media (min-width:664px)': {
				fontSize: '1.4rem',
			},
			'@media (min-width:712px)': {
				fontSize: '1.6rem',
			},
		},
		dataDialog: {
			fontFamily: 'Lato',
			fontSize: '0.6rem',
			'@media (min-width:318px)': {
				fontSize: '0.8rem',
			},
			'@media (min-width:360px)': {
				fontSize: '0.9rem',
			},
			'@media (min-width:472px)': {
				fontSize: '1.1rem',
			},
			'@media (min-width:538px)': {
				fontSize: '1.0rem',
			},
			'@media (min-width:664px)': {
				fontSize: '1.2rem',
			},
		},

		body1: {
			fontFamily: 'Lato',
			fontSize: '0.4rem',
			'@media (min-width:200px)': {
				fontSize: '0.6rem',
			},
			'@media (min-width:372px)': {
				fontSize: '0.8rem',
			},
			'@media (min-width:664px)': {
				fontSize: '1.0rem',
			},
		},
		body2: {
			fontFamily: 'Lato',
			fontSize: '0.5rem',
			'@media (min-width:200px)': {
				fontSize: '0.6rem',
			},
			'@media (min-width:372px)': {
				fontSize: '0.7rem',
			},
			'@media (min-width:664px)': {
				fontSize: '0.9rem',
			},
		},
		header3: {
			fontFamily: 'Lato',
			fontSize: '0.7rem',
			'@media (min-width:303px)': {
				fontSize: '0.8rem',
			},
			'@media (min-width:318px)': {
				fontSize: '0.8rem',
			},
			'@media (min-width:664px)': {
				fontSize: '1.2rem',
			},
		},

		buttons1: {
			fontFamily: 'Lato',
			fontSize: '0.6rem',
			fontWeight: '700',
			'@media (min-width:281px)': {
				fontSize: '0.6rem',
			},
			'@media (min-width:298px)': {
				fontSize: '0.7rem',
			},
			'@media (min-width:314px)': {
				fontSize: '0.8rem',
			},
			'@media (min-width:664px)': {
				fontSize: '1.2rem',
			},
		},

		buttons2: {
			fontSize: '0.6rem',
			'@media (min-width:325px)': {
				fontSize: '0.7rem',
			},
			'@media (min-width:373px)': {
				fontSize: '0.8rem',
			},
			'@media (min-width:428px)': {
				fontSize: '0.9rem',
			},
			'@media (min-width:664px)': {
				fontSize: '1rem',
			},
		},

		buttons4: {
			fontFamily: 'Lato',
			fontWeight: 700,
			fontSize: '1.0rem',

			'@media (min-width:372px)': {
				fontSize: '1.1rem',
			},
			'@media (min-width:664px)': {
				fontSize: '1.6rem',
			},
		},
		headerHome: {
			fontFamily: 'Lato',
			fontWeight: 700,
			fontSize: '1.8rem',
			'@media (min-width:200px)': {
				fontSize: '1.0rem',
			},
			'@media (min-width:372px)': {
				fontSize: '1.4rem',
			},
			'@media (min-width:664px)': {
				fontSize: '2.2rem',
			},
			'@media (min-width:900px)': {
				fontSize: '2.5rem',
			},
			'@media (min-width:1100px)': {
				fontSize: '3.0rem',
			},
		},
		buttonsHome: {
			fontFamily: 'Lato',
			fontWeight: 700,
			fontSize: '1.0rem',

			'@media (min-width:200px)': {
				fontSize: '0.6rem',
			},
			'@media (min-width:372px)': {
				fontSize: '0.8rem',
			},
			'@media (min-width:664px)': {
				fontSize: '1.1rem',
			},
			'@media (min-width:900px)': {
				fontSize: '1.3rem',
			},
			'@media (min-width:1100px)': {
				fontSize: '1.6rem',
			},
		},
	},
	breakpoints: {
		values: {
			xxs: 0,
			xs: 372,
			s: 538,
			sm: 664,
			md: 900,
			lg: 1100,
			xl: 1536,
		},
	},
	shape: {
		borderRadius: 8,
	},
	components: {
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					backgroundColor: 'white',
					color: 'black',
					border: '1px solid #dadde9',
					'& .MuiTooltip-arrow': {
						color: 'white',
					},
					fontFamily: 'Lato',
					fontSize: '1.0rem',
				},
			},
		},
	},
});

export default theme;
