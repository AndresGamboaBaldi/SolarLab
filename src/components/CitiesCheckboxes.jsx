import {
	Typography,
	Box,
	FormGroup,
	FormControlLabel,
	Checkbox,
} from '@mui/material';
export default function CitiesCheckboxes() {
	const checkBoxStyle = {
		color: 'primary.700',
		'& .MuiSvgIcon-root': {
			fontSize: { xxs: '24px', xs: '30px', sm: '32px' },
		},
	};
	return (
		<Box
			ml={{ xxs: 2, xs: 2, s: 2, sm: 2 }}
			sx={{
				display: 'none',

				'@media (min-width:960px)': {
					display: 'flex',
				},
			}}
		>
			<FormGroup row>
				<FormControlLabel
					control={<Checkbox defaultChecked sx={checkBoxStyle} />}
					label={<Typography variant='buttons1'>Cochabamba</Typography>}
				/>
				<FormControlLabel
					control={<Checkbox sx={checkBoxStyle} />}
					label={<Typography variant='buttons1'>La Paz</Typography>}
				/>
				<FormControlLabel
					control={<Checkbox sx={checkBoxStyle} />}
					label={<Typography variant='buttons1'>Santa Cruz</Typography>}
				/>
			</FormGroup>
		</Box>
	);
}
