import CitiesTypography from '../../components/CitiesTypography';
import DepartamentExperiment from '../../components/DepartamentExperiment';
import {
	Box,
	Typography,
	Grid,
	FormGroup,
	FormControlLabel,
	Checkbox,
	FormControl,
	Select,
	MenuItem,
	ListItemText,
	Stack,
	Button,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import SaveExperimentDialog from '../../components/SaveExperimentDialog';
import SessionTimer from '../../components/SessionTimer';
import { useRouter } from 'next/router';
import SignInDialog from '../../components/SignInDialog';
import SignUpDialog from '../../components/SignUpDialog';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

export default function Laboratory() {
	const router = useRouter();
	const checkBoxStyle = {
		color: 'primary.700',
		'& .MuiSvgIcon-root': {
			fontSize: { xxs: '24px', xs: '30px', sm: '32px' },
		},
	};
	const [openSaveExperiment, setOpenSaveExperiment] = useState(false);
	const [canAccess, setCanAccess] = useState(false);

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

	const [isMobile, setIsMobile] = useState(false);

	const handleResize = () => {
		if (window.innerWidth < 960) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	};

	const checkAccess = () => {
		if (!window.localStorage.getItem('SESSION_DATA')) {
			toast.error('You Dont Have a Session');
			router.push('/');
		} else {
			setCanAccess(true);
		}
	};

	const { data: session, status } = useSession();

	const [openSignIn, setOpenSignIn] = useState(false);
	const [openSignup, setOpenSignUp] = useState(false);
	const handleOpenSignUpFromSignIn = () => {
		setOpenSignIn(false);
		setOpenSignUp(true);
	};

	const handleOpenSignInFromSignUp = () => {
		setOpenSignUp(false);
		setOpenSignIn(true);
	};

	const handleOpenSaveExperiment = () => {
		if (session) {
			setOpenSaveExperiment(true);
		} else {
			setOpenSignIn(true);
		}
	};

	useEffect(() => {
		checkAccess();
		handleResize();
		window.addEventListener('resize', handleResize);
	}, []);

	const handleChangeCheckbox = (event) => {
		if (event.target.checked) {
			setSelectedCities((selectedCities) => [
				...selectedCities,
				event.target.name,
			]);
		} else {
			setSelectedCities(
				selectedCities.filter((element) => event.target.name !== element)
			);
		}
	};

	const handleChangeSelect = (event) => {
		const { value } = event.target;
		setSelectedCities(value);
	};

	const departmentData = [
		{
			departmentName: 'Cochabamba',
			voltage: 12,
			current: 5,
			radiation: 2,
			panelangle: 45,
		},
		{
			departmentName: 'La Paz',
			voltage: 10,
			current: 7,
			radiation: 1,
			panelangle: 60,
		},
		{
			departmentName: 'Santa Cruz',
			voltage: 16,
			current: 2,
			radiation: 1,
			panelangle: 75,
		},
	];

	return (
		<main>
			<div>
				<Head>
					<title>UPB Solar Remote Lab</title>
					<meta
						name='description'
						content='Remote Laboratory for Solar Energy'
					/>
					<link rel='icon' href='/logoYellow.png' />
				</Head>
			</div>
			{canAccess ? (
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
							<SessionTimer></SessionTimer>
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
							<CitiesTypography></CitiesTypography>
							{!isMobile ? (
								<Box ml={{ xxs: 2, xs: 2, s: 2, sm: 2 }}>
									<FormGroup row>
										{cities.map((city) => (
											<FormControlLabel
												key={city}
												control={
													<Checkbox
														sx={checkBoxStyle}
														checked={selectedCities.includes(city)}
													/>
												}
												name={city}
												onChange={handleChangeCheckbox}
												label={
													<Typography variant='buttons1'>{city}</Typography>
												}
											/>
										))}
									</FormGroup>
								</Box>
							) : (
								<Box
									mx={{ xxs: 2, xs: 2, s: 2, sm: 2 }}
									mr={{ xxs: 0, xs: 0, s: 0, sm: 2 }}
									sx={{
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
											onChange={handleChangeSelect}
											MenuProps={MenuProps}
											inputProps={{ 'aria-label': 'Without label' }}
											renderValue={(selected) => {
												if (selected.length === 0) {
													return (
														<Typography variant='body3'>
															Select the Cities to Display
														</Typography>
													);
												}

												return selected.join(', ');
											}}
										>
											{cities.map((city) => (
												<MenuItem key={city} value={city}>
													<Checkbox
														sx={checkBoxStyle}
														checked={selectedCities.includes(city)}
													/>
													<ListItemText primary={city} />
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Box>
							)}
						</Grid>
					</Grid>
					{selectedCities.map((city) => (
						<DepartamentExperiment
							key={city}
							name={city}
							departmentData={departmentData}
						></DepartamentExperiment>
					))}
					<Box>
						<Stack
							direction='row'
							justifyContent='end'
							my={{ xxs: 2, xs: 3, s: 3, sm: 4 }}
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
								onClick={handleOpenSaveExperiment}
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
								variant='outlined'
								sx={{
									textTransform: 'none',
									border: 1,
									textTransform: 'none',
									borderColor: 'primary.700',
								}}
								onClick={() => router.push('/experiments')}
							>
								<Typography
									color='primary.700'
									variant='buttonsHome'
									sx={{
										mx: { xxs: 0, xs: 0, s: 1, sm: 1 },
										'&:hover': {
											color: '#fff',
										},
									}}
								>
									Load Previous Experiments
								</Typography>
							</Button>
						</Stack>
						<Stack
							direction='row'
							justifyContent='end'
							my={{ xxs: 2, xs: 3, s: 3, sm: 4 }}
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
									borderColor: 'primary.700',
								}}
								onClick={() => router.push('/experiments')}
							>
								<Typography
									color='primary.700'
									variant='buttonsExperiments'
									sx={{
										mx: { xxs: 0, xs: 0, s: 1, sm: 1 },
										'&:hover': {
											color: '#fff',
										},
									}}
								>
									My Experiments
								</Typography>
							</Button>
							<SaveExperimentDialog
								open={openSaveExperiment}
								handleClose={() => setOpenSaveExperiment(false)}
								departmentData={departmentData}
								selectedCities={selectedCities}
							/>
						</Stack>
					</Box>
					<Box>
						<SignUpDialog
							open={openSignup}
							handleClose={() => setOpenSignUp(false)}
							onClickSignIn={handleOpenSignInFromSignUp}
						/>
						<SignInDialog
							open={openSignIn}
							handleClose={() => setOpenSignIn(false)}
							onClickSignup={handleOpenSignUpFromSignIn}
						/>
					</Box>
				</Box>
			) : null}
		</main>
	);
}
