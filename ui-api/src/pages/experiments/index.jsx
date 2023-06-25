import {
	Box,
	Grid,
	Card,
	Typography,
	Stack,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import ExperimentsListDialog from '../../components/ExperimentsList';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LineChart from '../../components/LineChart';
import ShowDepartamentData from '../../components/ShowDepartamentData';
import { useSession } from 'next-auth/react';
import SignInDialog from '../../components/SignInDialog';
import SignUpDialog from '../../components/SignUpDialog';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Head from 'next/head';
import { CSVLink } from 'react-csv';
import DownloadIcon from '@mui/icons-material/Download';

export default function Experiments() {
	const [noExperiments, setNoExperiments] = useState(true);
	const { data: session, status } = useSession();
	const [experiment, setExperiment] = useState({});
	const [openSignIn, setOpenSignIn] = useState(false);
	const [openSignup, setOpenSignUp] = useState(false);
	const [studentCourses, setStudentCourses] = useState([]);
	const [openExperimentsList, setOpenExperimentsList] = useState(false);
	const [selectedCourse, setSelectedCourse] = useState('');

	const camelCase = (str) => {
		return str.substring(0, 1).toUpperCase() + str.substring(1);
	};

	const getColumns = () => {
		// Get column names
		const columns = ['city', 'voltage', 'current', 'power'];
		let headers = [];
		columns.forEach((col, idx) => {
			headers.push({ label: camelCase(col), key: col });
		});

		return headers;
	};

	const getData = (data) => {
		// Get column names
		let totalArray = [];
		data.forEach((array) => {
			totalArray.push(...array);
		});
		return totalArray;
	};

	useEffect(() => {
		checkSession();
	}, [status]);

	const router = useRouter();
	const handleEnterRemoteLab = () => {
		if (!window.localStorage.getItem('SESSION_DATA')) {
			toast.error('You Dont have a Session. Book One!');
		} else {
			router.push('/laboratory');
		}
	};

	const checkSession = async () => {
		if (status === 'authenticated') {
			await verifyRole();
		} else if (status === 'loading') {
		} else {
			setOpenSignIn(true);
		}
	};

	const verifyRole = async () => {
		const response = await fetch(`/api/users/read`, {
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
			if (answer.user.teacher) {
				router.push('/teacherexperiments');
			} else {
				loadStudentCourses();
			}
		}
	};
	const loadStudentCourses = async () => {
		const response = await fetch(`/api/courses/readfiltered`, {
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
			setStudentCourses(answer.courses);
			if (answer.courses.length > 0) {
				setSelectedCourse(answer.courses[0].id);
				loadData(answer.courses[0].id);
			} else {
				setNoExperiments(true);
			}
		}
	};

	const loadData = async (courseId) => {
		var response;
		response = await fetch(`/api/experiments/readFirst`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({
				email: session.user.email,
				courseId: courseId,
			}),
		});

		const answer = await response.json();
		if (!answer.status) {
			toast.error('Something Went Wrong, Please Try Again');
		} else {
			if (answer.experiment) {
				setNoExperiments(false);
				setExperiment(answer.experiment);
			} else {
				setNoExperiments(true);
			}
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

	const handleChange = (event) => {
		setSelectedCourse(event.target.value);
		loadData(event.target.value);
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
			<Box
				mt={{ xxs: 8, xs: 8, s: 8, sm: 10 }}
				px={{ xxs: 2, xs: 2, s: 3, sm: 4 }}
			>
				<Grid container>
					<Grid
						item
						xxs={12}
						xs={12}
						s={12}
						sm={12}
						md={6}
						lg={6}
						sx={{
							display: 'flex',
							alignItems: 'center',
						}}
						mb={2}
					>
						<Typography variant='header2' color='primary.700'>
							Course:
						</Typography>
						<Box ml={2}>
							{studentCourses.length > 0 ? (
								<FormControl size='small'>
									<InputLabel>
										<Typography variant='header3' color='blacky.main'>
											Select a Course
										</Typography>
									</InputLabel>
									<Select
										fullWidth
										value={selectedCourse}
										onChange={handleChange}
										displayEmpty
										renderValue={() => {
											let value = '';
											studentCourses.forEach((course) => {
												if (selectedCourse == course.id) {
													value = course.name + ' - ' + course.startDate;
												}
											});
											return value;
										}}
									>
										{studentCourses.map((course) => (
											<MenuItem key={course.id} value={course.id}>
												<Typography variant='header3' color='blacky.main'>
													{course.name} {'- '} {course.startDate}
												</Typography>
											</MenuItem>
										))}
									</Select>
								</FormControl>
							) : (
								<Typography variant='header3' color='blacky.main'>
									Join a Course first
								</Typography>
							)}
						</Box>
					</Grid>
					{!noExperiments ? (
						<Grid
							item
							xxs={12}
							xs={12}
							s={12}
							sm={12}
							md={6}
							lg={6}
							sx={{
								display: 'flex',
								alignItems: 'center',
							}}
							justifyContent={'flex-end'}
							mt={2}
							mb={{ xxs: 2, xs: 3, s: 3, sm: 3 }}
						>
							<Button
								variant='contained'
								sx={{
									textTransform: 'none',
									bgcolor: 'primary.700',
									mr: { xxs: 1, xs: 1, s: 2, sm: 2 },
								}}
								onClick={() => {
									setOpenExperimentsList(true);
								}}
							>
								<Typography
									color='white.main'
									variant='buttonsExperiments'
									sx={{
										mx: { xxs: 0, xs: 0, s: 1, sm: 2 },
									}}
								>
									Experiments
								</Typography>
							</Button>
							<Button
								variant='outlined'
								sx={{
									border: 1,
									textTransform: 'none',
									borderColor: 'primary.700',
								}}
								onClick={handleEnterRemoteLab}
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
									Go to Remote Lab
								</Typography>
							</Button>

							<ExperimentsListDialog
								open={openExperimentsList}
								handleClose={() => setOpenExperimentsList(false)}
								email={session.user.email}
								setExperiment={setExperiment}
								courseId={selectedCourse}
							/>
						</Grid>
					) : null}
				</Grid>

				{!noExperiments ? (
					<Box mb={4}>
						<Card
							elevation={5}
							mx={{ xxs: 2, xs: 2, s: 2, sm: 2 }}
							sx={{
								height: '100%',
								width: 'auto',
							}}
						>
							<Box
								my={{ xxs: 2, xs: 3, s: 3, sm: 5 }}
								mx={{ xxs: 3, xs: 3, s: 4, sm: 5 }}
							>
								<Grid
									container
									justify='center'
									rowSpacing={{ xxs: 1, xs: 1, s: 2 }}
								>
									<Grid
										item
										xxs={12}
										xs={12}
										sx={{ verticalAlign: 'middle' }}
										mt={{ xxs: 1, xs: 1, s: 2 }}
									>
										<Typography variant='header1' color='blacky.main'>
											{experiment.name}
										</Typography>
									</Grid>
									<Grid item xxs={12} xs={12}>
										<Typography variant='titleDialog' color='primary.700'>
											Date:
										</Typography>
										<Typography ml={1} variant='dataDialog' color='blacky.main'>
											{experiment.experimentDate}
										</Typography>
									</Grid>
									<Grid item xxs={12} xs={12}>
										<Typography variant='titleDialog' color='primary.700'>
											Time:
										</Typography>
										<Typography ml={1} variant='dataDialog' color='blacky.main'>
											{experiment.experimentTime} ({experiment.timezone})
										</Typography>
									</Grid>

									<Grid item xxs={12} align='center'>
										<Box>
											<LineChart
												chartData={experiment.departmentLabs.map(
													(department) => department.efficiencyTest
												)}
												names={experiment.departmentLabs.map(
													(department) => department.departmentName
												)}
											></LineChart>
										</Box>
									</Grid>
									<Grid item xxs={12} align='center'>
										<CSVLink
											data={getData(
												experiment.departmentLabs.map(
													(department) => department.efficiencyTest
												)
											)}
											headers={getColumns()}
											filename={experiment.name + '-Efficiency_Test.csv'}
										>
											<Button
												variant='contained'
												sx={{
													textTransform: 'none',
													bgcolor: 'primary.700',
												}}
												endIcon={<DownloadIcon />}
											>
												<Typography
													color='white.main'
													variant='buttonsExperiments'
												>
													Download Data
												</Typography>
											</Button>
										</CSVLink>
									</Grid>
									<Grid item xxs={12} align='center' mb={3}>
										{experiment.departmentLabs.map((city) => (
											<ShowDepartamentData
												departmentData={experiment.departmentLabs}
												key={city.departmentName}
												name={city.departmentName}
											></ShowDepartamentData>
										))}
									</Grid>
								</Grid>
							</Box>
						</Card>
					</Box>
				) : (
					<Box>
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
								<Grid container justify='center' rowSpacing={2}>
									<Grid
										item
										xxs={12}
										xs={12}
										sx={{
											display: 'flex',
											alignItems: 'center',
										}}
										justifyContent='center'
									>
										<ErrorOutlineIcon
											sx={{
												fontSize: { xxs: '32px', xs: '48px', sm: '64px' },
												color: 'warning.main',
											}}
										/>
									</Grid>
									<Grid
										item
										xxs={12}
										xs={12}
										sx={{
											display: 'flex',
											alignItems: 'center',
										}}
										justifyContent='center'
									>
										<Typography variant='header3' color='blacky.main'>
											You have not Saved any Experiment in this Course
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
			</Box>
		</main>
	);
}
