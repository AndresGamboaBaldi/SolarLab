import SaveExperimentDialog from '../../components/SaveExperimentDialog';
import ExperimentsListDialog from '../../components/ExperimentsList';
import {
	Box,
	Typography,
	Button,
	Stack,
	FormGroup,
	FormControlLabel,
	Checkbox,
	Grid,
	FormControl,
	Select,
	MenuItem,
	ListItemText,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function Experiments() {
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

	const [openSaveExperiment, setOpenSaveExperiment] = useState(false);
	const [openExperimentsList, setOpenExperimentsList] = useState(false);
	return (
		<Box
			mt={{ xxs: 10, xs: 10, s: 10, sm: 12 }}
			px={{ xxs: 2, xs: 2, s: 4, sm: 6 }}
		>
			<Grid container>
				<Grid
					item
					sx={{
						display: 'flex',
						alignItems: 'center',
					}}
					xxs={12}
					xs={12}
					sm={5}
					md={3}
					mb={{ xxs: 2, xs: 2, s: 2, sm: 0, md: 0 }}
					justifyContent='flex-end'
					order={{ xxs: 1, xs: 1, s: 1, sm: 2 }}
				>
					<Typography variant='buttonsExperiments' color='primary.700'>
						Remaining Time:
					</Typography>
					<Typography
						ml={{ xxs: 1, xs: 1, s: 2, sm: 1 }}
						variant='buttonsExperiments'
						color='blacky.main'
					>
						10:32
					</Typography>
				</Grid>
				<Grid
					item
					sx={{
						display: 'flex',
						alignItems: 'center',
					}}
					xxs={12}
					xs={12}
					sm={7}
					md={9}
					order={{ xxs: 2, xs: 2, s: 2, sm: 1 }}
				>
					<Typography
						variant='header2'
						color='primary.700'
						sx={{
							display: 'flex',

							'@media (min-width:960px)': {
								display: 'none',
							},
						}}
					>
						Cities:
					</Typography>
					<Typography
						variant='header2'
						color='primary.700'
						sx={{
							display: 'none',

							'@media (min-width:960px)': {
								display: 'flex',
							},
						}}
					>
						Cities to Display:
					</Typography>
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
								control={<Checkbox sx={checkBoxStyle} />}
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
											checked={
												selectedCities.findIndex((item) => item === city) >= 0
											}
										/>
										<ListItemText primary={city} />
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
				</Grid>
			</Grid>

			<Stack
				direction='row'
				justifyContent='end'
				mt={{ xxs: 2, xs: 3, s: 3, sm: 4 }}
				sx={{
					display: 'none',

					'@media (min-width:418px)': {
						display: 'flex',
					},
				}}
			>
				<Button
					variant='contained'
					sx={{
						textTransform: 'none',
						bgcolor: 'primary.700',
						mr: { xxs: 1, xs: 1, s: 2, sm: 3 },
					}}
					onClick={() => setOpenSaveExperiment(true)}
				>
					<Typography
						color='white.main'
						variant='buttonsHome'
						sx={{
							mx: { xxs: 0, xs: 0, s: 1, sm: 1 },
						}}
					>
						Save Current Experiment
					</Typography>
				</Button>
				<Button
					variant='contained'
					color='white'
					sx={{
						textTransform: 'none',
						border: 1,
						textTransform: 'none',
						borderColor: 'primary.700',
					}}
					onClick={() => setOpenExperimentsList(true)}
				>
					<Typography
						color='primary.700'
						variant='buttonsHome'
						sx={{
							mx: { xxs: 0, xs: 0, s: 1, sm: 1 },
						}}
					>
						Load Previous Experiment
					</Typography>
				</Button>
				<SaveExperimentDialog
					open={openSaveExperiment}
					handleClose={() => setOpenSaveExperiment(false)}
				/>
				<ExperimentsListDialog
					open={openExperimentsList}
					handleClose={() => setOpenExperimentsList(false)}
				/>
			</Stack>
			<Stack
				direction='row'
				justifyContent='end'
				mt={{ xxs: 2, xs: 3, s: 3, sm: 4 }}
				sx={{
					display: 'flex',

					'@media (min-width:418px)': {
						display: 'none',
					},
				}}
			>
				<Button
					variant='contained'
					sx={{
						textTransform: 'none',
						bgcolor: 'primary.700',
						mr: { xxs: 1, xs: 1, s: 2, sm: 3 },
					}}
					onClick={() => setOpenSaveExperiment(true)}
				>
					<Typography
						color='white.main'
						variant='buttonsExperiments'
						sx={{
							mx: { xxs: 0, xs: 0, s: 1, sm: 1 },
						}}
					>
						Save Experiment
					</Typography>
				</Button>
				<Button
					variant='contained'
					color='white'
					sx={{
						textTransform: 'none',
						border: 1,
						textTransform: 'none',
						borderColor: 'primary.700',
					}}
					onClick={() => setOpenExperimentsList(true)}
				>
					<Typography
						color='primary.700'
						variant='buttonsExperiments'
						sx={{
							mx: { xxs: 0, xs: 0, s: 1, sm: 1 },
						}}
					>
						Load Experiment
					</Typography>
				</Button>
				<SaveExperimentDialog
					open={openSaveExperiment}
					handleClose={() => setOpenSaveExperiment(false)}
				/>
				<ExperimentsListDialog
					open={openExperimentsList}
					handleClose={() => setOpenExperimentsList(false)}
				/>
			</Stack>
		</Box>
	);
}
