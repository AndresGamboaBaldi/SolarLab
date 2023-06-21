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
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

const checkBoxStyle = {
	color: 'primary.700',
	'& .MuiSvgIcon-root': {
		fontSize: { xxs: '24px', xs: '30px', sm: '32px' },
	},
};
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

const testLpz = [
	{
		voltage: 1,
		current: 8,
	},
	{
		voltage: 3,
		current: 8,
	},
	{
		voltage: 5,
		current: 8,
	},
	{
		voltage: 7,
		current: 8,
	},
	{
		voltage: 9,
		current: 8,
	},
	{
		voltage: 11,
		current: 7,
	},
	{
		voltage: 13,
		current: 0,
	},
	{
		voltage: 15,
		current: 0,
	},
];

const testCbba = [
	{
		voltage: 1,
		current: 10,
	},
	{
		voltage: 3,
		current: 10,
	},
	{
		voltage: 5,
		current: 10,
	},
	{
		voltage: 7,
		current: 10,
	},
	{
		voltage: 9,
		current: 10,
	},
	{
		voltage: 11,
		current: 10,
	},
	{
		voltage: 13,
		current: 8.5,
	},
	{
		voltage: 15,
		current: 0,
	},
];

const initialData = [
	{
		departmentName: 'Cochabamba',
		voltage: 0,
		current: 0,
		power: 0,
		uvaRadiation: 0,
		radiation: 0,
		panelangle: 0,
		efficiencyTest: testCbba,
	},
	{
		departmentName: 'La Paz',
		voltage: 10,
		current: 3,
		power: 30,
		uvaRadiation: 200,
		radiation: 60,
		panelangle: 60,
		efficiencyTest: testLpz,
	},
	{
		departmentName: 'Santa Cruz',
		voltage: 16,
		current: 2,
		power: 32,
		uvaRadiation: 150,
		radiation: 80,
		panelangle: 75,
		efficiencyTest: [],
	},
];

export default function Laboratory() {
	const router = useRouter();
	const { data: session, status } = useSession();
	const [openSignIn, setOpenSignIn] = useState(false);
	const [openSignup, setOpenSignUp] = useState(false);
	const [openSaveExperiment, setOpenSaveExperiment] = useState(false);
	const [canAccess, setCanAccess] = useState(false);
	const [syncPanels, setSyncPanels] = useState(true);
	const [departmentData, setDepartmentData] = useState(initialData);

	const [selectedCities, setSelectedCities] = React.useState(['Cochabamba']);
	const cities = ['Cochabamba', 'La Paz', 'Santa Cruz'];

	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		//envvariable
		const socket = io(`ws://192.168.124.82:4000`);
		socket.on('esp32', (...msg) => {
			dataHandler(msg);
		});
		return () => {
			socket.disconnect();
		};
	}, [departmentData]);

	useEffect(() => {
		requestDataESP();
		handleResize();
		window.addEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		checkAccess();
		connectMQTT();
		connectCameras();
	}, []);

	const connectMQTT = async () => {
		await fetch(`/api/mqtt/connect`);
	};

	const connectCameras = async () => {
		await fetch(`/api/camera`);
	};

	const requestDataESP = async () => {
		const message = { action: 'DATA', department: 'ALL' };
		const response = await fetch(`/api/mqtt/send`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify(message),
		});
		const data = await response.json();
	};

	const dataHandler = (msg) => {
		const JSONMessage = JSON.parse(msg);
		const {
			departmentName,
			voltage,
			current,
			power,
			uvaRadiation,
			radiation,
			panelangle,
			efficiencyTest,
			isTesting,
		} = JSONMessage;
		const newData = departmentData.map((department) => {
			if (department.departmentName === departmentName) {
				if (isTesting) {
					return {
						...department,
						voltage: voltage,
						current: current,
						power: power,
						uvaRadiation: uvaRadiation,
						radiation: radiation,
						panelangle: panelangle,
						efficiencyTest: efficiencyTest,
					};
				} else {
					return {
						...department,
						voltage: voltage,
						current: current,
						power: power,
						uvaRadiation: uvaRadiation,
						radiation: radiation,
						panelangle: panelangle,
					};
				}
			} else {
				return department;
			}
		});
		setDepartmentData(newData);
	};

	const checkAccess = () => {
		if (!window.localStorage.getItem('SESSION_DATA')) {
			toast.error('You Dont Have a Session');
			router.push('/');
		} else {
			setCanAccess(true);
		}
	};

	const handleResize = () => {
		if (window.innerWidth < 960) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	};

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
			if (selectedCities.length > 0) {
				setOpenSaveExperiment(true);
			} else {
				toast.error('First you Have to Select a City to Save');
			}
		} else {
			setOpenSignIn(true);
		}
	};

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
							syncPanels={syncPanels}
							setSyncPanels={setSyncPanels}
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
								onClick={handleOpenSaveExperiment}
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
