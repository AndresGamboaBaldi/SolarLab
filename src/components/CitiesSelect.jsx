import {
	Typography,
	Box,
	FormControl,
	Checkbox,
	Select,
	MenuItem,
	ListItemText,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
export default function CitiesSelect() {
	const checkBoxStyle = {
		color: 'primary.700',
		'& .MuiSvgIcon-root': {
			fontSize: { xxs: '24px', xs: '30px', sm: '32px' },
		},
	};

	const [selectedCities, setSelectedCities] = React.useState(['Cochabamba']);

	const cities = ['Cochabamba', 'La Paz', 'Santa Cruz'];

	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;

	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
	};

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;

		setSelectedCities(value);
	};
	return (
		<Box
			mx={{ xxs: 2, xs: 2, s: 2, sm: 2 }}
			mr={{ xxs: 0, xs: 0, s: 0, sm: 2 }}
			sx={{
				display: 'flex',

				'@media (min-width:960px)': {
					display: 'none',
				},
				width: '100%',
			}}
		>
			<FormControl
				size='small'
				sx={{
					width: '100%',
				}}
			>
				<Select
					multiple
					displayEmpty
					value={selectedCities}
					onChange={handleChange}
					renderValue={(selected) => {
						if (selected.length === 0) {
							return (
								<Typography variant='buttons2'>
									Select the Cities to Display
								</Typography>
							);
						}

						return selected.join(', ');
					}}
					MenuProps={MenuProps}
					inputProps={{ 'aria-label': 'Without label' }}
				>
					{cities.map((city) => (
						<MenuItem key={city} value={city}>
							<Checkbox
								sx={checkBoxStyle}
								checked={selectedCities.findIndex((item) => item === city) >= 0}
							/>
							<ListItemText primary={city} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
}
