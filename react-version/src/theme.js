import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	typography: {
		useNextVariants: true,
	},
	palette: {
		primary: {
			main: '#9e0116',
			light: 'rgb(177,51,68,',
			dark: 'rgb(118,0,15)',
			contrastText: '#fff',
		},
		secondary: {
			main: '#000',
			light: 'rgb(51,51,51)',
			dark: 'rgb(0,0,0)',
			contrastText: '#fff',
		},
		text: {
			primary: 'rgba(0, 0, 0, 0.84)',
			secondary: '#fff',
			disabled: 'rgba(0, 0, 0, 0.38)',
			hint: 'rgba(0, 0, 0, 0.38)',
		},
	},
});

export default theme;
