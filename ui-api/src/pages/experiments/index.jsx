import {
	Box,
	Grid,
	Card,
	Typography,
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
import { toast } from 'react-toastify';
import ExperimentsListDialog from '../../components/ExperimentsList';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LineChart from '../../components/LineChart';
import { ChartData } from '@/data/mockData';
import { ChartData2 } from '@/data/mockData2';
import DepartmentDataDialog from '../../components/DepartmentDataDialog';
import { useSession } from 'next-auth/react';
import SignInDialog from '../../components/SignInDialog';
import SignUpDialog from '../../components/SignUpDialog';

import Head from 'next/head';

export default function Laboratory() {
	const [angle, setAngle] = useState(0);
	const [voltage, setVoltage] = useState('');
	const [current, setCurrent] = useState('');
	const [radiation, setRadiation] = useState('');
	const [noExperiments, setNoExperiments] = useState(true);

	const { data: session, status } = useSession();
	const [experiment, setExperiment] = useState({});
	const [departamentLabs, setDepartamentLabs] = useState([]);

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

	const [openExperimentsList, setOpenExperimentsList] = useState(false);

	const checkSession = () => {
		if (status === 'authenticated') {
			loadData();
		} else if (status === 'loading') {
		} else {
			setOpenSignIn(true);
		}
	};

	const loadData = async () => {
		const response = await fetch(`/api/experiments/readFirst`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({ email: session.user.email }),
		});

		const answer = await response.json();
		if (!answer.status) {
			toast.error('Something Went Wrong, Please Try Again');
		} else {
			if (answer.experiment) {
				setNoExperiments(false);
				setExperiment(answer.experiment);
				await loadDepartaments(answer.experiment.id);
			} else {
				setNoExperiments(true);
			}
		}
	};
	const loadDepartaments = async (id) => {
		const response = await fetch(`/api/departamentlabs/read`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({ id: id }),
		});

		const answer = await response.json();
		if (!answer.status) {
			toast.error('Something Went Wrong, Please Try Again');
		} else {
			setDepartamentLabs(answer.departamentLabs);
		}
	};

	useEffect(() => {
		checkSession();
	}, [status, openExperimentsList]);

	const [data, setData] = useState({
		labels: ChartData.map((data) => data.voltage),
		datasets: [
			{
				label: 'Cochabamba',
				data: ChartData.map((data) => data.current),
				backgroundColor: ['#F6BD2B'],
				borderColor: '#F6BD2B',
				cubicInterpolationMode: 'monotone',
				borderWidth: 2,
			},
			{
				label: 'La Paz',
				data: ChartData2.map((data) => data.current),
				backgroundColor: ['#3E55A2'],
				borderColor: '#3E55A2',
				cubicInterpolationMode: 'monotone',
				borderWidth: 2,
			},
		],
	});

	const router = useRouter();
	const handleEnterRemoteLab = () => {
		if (!window.localStorage.getItem('SESSION_DATA')) {
			toast.error('You Dont have a Session. Book One!');
		} else {
			router.push('/laboratory');
		}
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
			</div>
			{!noExperiments ? (
				<Box
					mt={{ xxs: 10, xs: 10, s: 10, sm: 12 }}
					px={{ xxs: 2, xs: 2, s: 3, sm: 4 }}
				>
					<Card
						elevation={5}
						my={{ xxs: 2, xs: 3, s: 3, sm: 4 }}
						mx={{ xxs: 2, xs: 2, s: 2, sm: 2 }}
						sx={{
							height: '100%',
							width: 'auto',
						}}
					>
						<Box
							my={{ xxs: 2, xs: 3, s: 3, sm: 4 }}
							mx={{ xxs: 3, xs: 3, s: 4, sm: 5 }}
						>
							<Grid container justify='center'>
								<Grid item xxs={12} xs={12} mb={{ xxs: 1, xs: 2, s: 3, sm: 3 }}>
									<Typography variant='header1' color='blacky.main'>
										{experiment.name}
									</Typography>
								</Grid>

								<Grid
									item
									xxs={12}
									mb={{ xxs: 1, xs: 2, s: 3, sm: 2 }}
									align='center'
								>
									<Box
										sx={{
											width: '65vw',
											height: '23vh',
											'@media (min-width:700px)': {
												width: '65vw',
												height: '32vh',
											},
										}}
									>
										<LineChart chartData={data}></LineChart>
									</Box>
								</Grid>
								<Grid item xxs={12} align='center' mb={3}>
									{departamentLabs.map((city) => (
										<DepartmentDataDialog
											departmentData={departamentLabs}
											key={city.departmentName}
											name={city.departmentName}
										></DepartmentDataDialog>
									))}
								</Grid>
							</Grid>
						</Box>
					</Card>
					<Box>
						<Stack
							direction='row'
							justifyContent='end'
							my={{ xxs: 2, xs: 3, s: 3, sm: 4 }}
							sx={{
								display: 'flex',
							}}
						>
							<Button
								variant='contained'
								sx={{
									textTransform: 'none',
									bgcolor: 'primary.700',
									mr: { xxs: 1, xs: 1, s: 2, sm: 3 },
								}}
								onClick={() => {
									setOpenExperimentsList(true);
								}}
							>
								<Typography
									color='white.main'
									variant='buttonsHome'
									sx={{
										mx: { xxs: 0, xs: 0, s: 1, sm: 1 },
									}}
								>
									Saved Experiments
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
								onClick={handleEnterRemoteLab}
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
									Go to Remote Lab
								</Typography>
							</Button>
							<ExperimentsListDialog
								open={openExperimentsList}
								handleClose={() => setOpenExperimentsList(false)}
							/>
						</Stack>
					</Box>
				</Box>
			) : (
				<Box
					mt={{ xxs: 10, xs: 10, s: 10, sm: 12 }}
					px={{ xxs: 2, xs: 2, s: 3, sm: 4 }}
				>
					<Card
						elevation={5}
						my={{ xxs: 2, xs: 3, s: 3, sm: 2 }}
						mx={{ xxs: 2, xs: 2, s: 2, sm: 2 }}
						sx={{
							height: '100%',
							width: 'auto',
						}}
					>
						<Box
							my={{ xxs: 2, xs: 3, s: 3, sm: 3 }}
							mx={{ xxs: 3, xs: 3, s: 4, sm: 5 }}
						>
							<Grid container justify='center'>
								<Grid item xxs={12} xs={12} mb={{ xxs: 1, xs: 2, s: 3, sm: 3 }}>
									<Typography variant='header1' color='blacky.main'>
										No Experiments Found, Create One!
									</Typography>
								</Grid>
							</Grid>
						</Box>
					</Card>
					<Box>
						<Stack
							direction='row'
							justifyContent='end'
							my={{ xxs: 2, xs: 3, s: 3, sm: 4 }}
							sx={{
								display: 'flex',
							}}
						>
							<Button
								variant='outlined'
								sx={{
									textTransform: 'none',
									bgcolor: 'primary.700',
									mr: { xxs: 1, xs: 1, s: 2, sm: 3 },
								}}
								onClick={handleEnterRemoteLab}
							>
								<Typography
									color='white.main'
									variant='buttonsHome'
									sx={{
										mx: { xxs: 0, xs: 0, s: 1, sm: 1 },
									}}
								>
									Go to Remote Lab
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
								onClick={() => {
									router.push('/');
								}}
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
									Go Back
								</Typography>
							</Button>
						</Stack>
					</Box>
				</Box>
			)}
		</main>
	);
}
