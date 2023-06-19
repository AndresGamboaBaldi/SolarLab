import {
	Box,
	Grid,
	Card,
	Typography,
	Button,
	FormControl,
	Select,
	MenuItem,
	InputLabel,
} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import ExperimentsListDialog from '../../components/ExperimentsList';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LineChart from '../../components/LineChart';
import ShowDepartamentData from '../../components/ShowDepartamentData';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function TeacherExperiments() {
	const [selectedCourseName, setSelectedCourseName] = useState('');
	const [selectedStudentName, setSelectedStudentName] = useState('');
	const [selectedStudentEmail, setSelectedStudentEmail] = useState('');
	const [courseStudents, setCourseStudents] = useState({});
	const [teacherCourses, setTeacherCourses] = useState([]);

	const { data: session, status } = useSession();
	const [experiment, setExperiment] = useState({});

	const [openExperimentsList, setOpenExperimentsList] = useState(false);

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
			if (answer.user.student) {
				router.push('/experiments');
			} else {
				loadData();
			}
		}
	};

	const loadData = async () => {
		const response = await fetch(`/api/teacher/courses/readfiltered`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({ email: session.user.email }),
		});
		const answer = await response.json();

		if (!answer.status) {
			toast.error('Something Went Wrong, Please Try');
		} else {
			setTeacherCourses(answer.courses);
			if (answer.courses.length > 0) {
				setSelectedCourseName(answer.courses[0].name);
				setCourseStudents(answer.courses[0].students);
				if (answer.courses[0].students.length > 0) {
					setSelectedStudentName(answer.courses[0].students[0].user.name);
					setSelectedStudentEmail(answer.courses[0].students[0].user.email);
					setExperiment(answer.courses[0].students[0].experiments[0]);
				}
			}
		}
	};

	const handleChangeCourse = (event) => {
		setSelectedStudentName('');
		setSelectedStudentEmail('');
		setExperiment(undefined);
		setSelectedCourseName(event.target.value);
		teacherCourses.forEach((course) => {
			if (course.name === event.target.value) {
				setCourseStudents(course.students);
			}
		});
	};

	const handleChangeStudent = (event) => {
		setSelectedStudentName(event.target.value);
		courseStudents.forEach((student) => {
			if (student.user.name == event.target.value) {
				setSelectedStudentEmail(student.userEmail);
				setExperiment(student.experiments[0]);
			}
		});
	};

	useEffect(() => {
		checkSession();
	}, [status]);

	const router = useRouter();

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
			<Box
				mt={{ xxs: 10, xs: 10, s: 10, sm: 12 }}
				px={{ xxs: 2, xs: 2, s: 3, sm: 3 }}
			>
				<Box
					my={{ xxs: 2, xs: 3, s: 3, sm: 3 }}
					mx={{ xxs: 1, xs: 1, s: 1, sm: 2 }}
					sx={{
						height: '100%',
						width: 'auto',
					}}
				>
					<Grid container justify='center' columnSpacing={2} rowSpacing={2}>
						<Grid
							item
							xs={12}
							s={6}
							sm={6}
							md={6}
							lg={4}
							sx={{
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<Typography variant='header2' color='primary.700'>
								Course:
							</Typography>
							<Box ml={2}>
								{teacherCourses.length > 0 ? (
									<FormControl
										size='small'
										sx={{
											minWidth: { xxs: 160, xs: 180, s: 140, sm: 150, md: 180 },
											maxWidth: { xxs: 180, xs: 220, s: 140, sm: 180, md: 250 },
										}}
									>
										<InputLabel>
											<Typography variant='header3' color='blacky.main'>
												Select a Course
											</Typography>
										</InputLabel>
										<Select
											value={selectedCourseName}
											onChange={handleChangeCourse}
										>
											{teacherCourses.map((course) => (
												<MenuItem key={course.id} value={course.name}>
													<Typography variant='header3' color='blacky.main'>
														{course.name}
													</Typography>
												</MenuItem>
											))}
										</Select>
									</FormControl>
								) : (
									<Typography variant='header3' color='blacky.main'>
										Create a Course first
									</Typography>
								)}
							</Box>
						</Grid>
						<Grid
							item
							xs={12}
							s={6}
							sm={6}
							md={6}
							lg={4}
							sx={{
								display: 'flex',
								alignItems: 'center',
							}}
							justifyContent={{ xs: 'left', s: 'flex-end' }}
						>
							<Typography variant='header2' color='primary.700'>
								Student:
							</Typography>
							<Box ml={2}>
								{courseStudents.length > 0 ? (
									<FormControl
										size='small'
										sx={{
											minWidth: { xxs: 160, xs: 180, s: 140, sm: 150, md: 180 },
											maxWidth: { xxs: 180, xs: 220, s: 140, sm: 180, md: 250 },
										}}
									>
										<InputLabel>
											<Typography variant='header3' color='blacky.main'>
												Select a Student
											</Typography>
										</InputLabel>
										<Select
											value={selectedStudentName}
											onChange={handleChangeStudent}
										>
											{courseStudents.map((student) => (
												<MenuItem key={student.id} value={student.user.name}>
													<Typography variant='header3' color='blacky.main'>
														{student.user.name}
													</Typography>
												</MenuItem>
											))}
										</Select>
									</FormControl>
								) : (
									<Typography variant='header3' color='blacky.main'>
										No Students found in this Course
									</Typography>
								)}
							</Box>
						</Grid>
						<Grid
							item
							xs={12}
							s={12}
							sm={12}
							md={12}
							lg={4}
							sx={{
								display: 'flex',
								alignItems: 'center',
							}}
							justifyContent={{ s: 'left', sm: 'flex-end' }}
						>
							{experiment && Object.keys(experiment).length > 0 ? (
								<Button
									variant='contained'
									sx={{
										textTransform: 'none',
										bgcolor: 'primary.700',
										ml: { xxs: 0, xs: 0, s: 0, sm: 0, md: 0, lg: 2 },
									}}
									onClick={() => setOpenExperimentsList(true)}
								>
									<Typography color='white.main' variant='buttonsExperiments'>
										View Student Experiments
									</Typography>
								</Button>
							) : (
								<Button
									variant='contained'
									sx={{
										textTransform: 'none',
										bgcolor: 'primary.700',
										ml: { xxs: 0, xs: 0, s: 0, sm: 0, md: 0, lg: 2 },
									}}
									onClick={() => router.push('/courses')}
								>
									<Typography color='white.main' variant='buttonsExperiments'>
										Manage Courses
									</Typography>
								</Button>
							)}
						</Grid>
					</Grid>
				</Box>
				<Box
					mx={{ xxs: 1, xs: 1, s: 1, sm: 2 }}
					mb={{ xxs: 2, xs: 3, s: 4, sm: 6 }}
					sx={{
						height: '100%',
						width: 'auto',
					}}
				>
					<Card
						elevation={5}
						sx={{
							height: '100%',
							width: 'auto',
						}}
					>
						<Box
							py={{ xxs: 2, xs: 4, s: 5, sm: 5 }}
							px={{ xxs: 1, xs: 2, s: 2, sm: 4 }}
						>
							<Grid
								container
								justify='center'
								px={2}
								mb={{ xxs: 1, xs: 1, s: 1, sm: 3 }}
							>
								<Grid
									item
									xs={12}
									s={12}
									sm={12}
									md={12}
									sx={{
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<Typography variant='header2' color='secondary.main'>
										Experiment Info:
									</Typography>
								</Grid>
							</Grid>
							{experiment && Object.keys(experiment).length > 0 ? (
								<Grid
									container
									justify='center'
									rowSpacing={{ xxs: 1, xs: 1, s: 1, sm: 3 }}
									px={2}
								>
									<Grid
										item
										xxs={12}
										xs={12}
										s={12}
										sx={{ verticalAlign: 'middle' }}
									>
										<Typography variant='header12' color='blacky.main'>
											{experiment.name}
										</Typography>
									</Grid>
									<Grid item xxs={12} xs={12} s={12}>
										<Typography variant='titleDialog' color='primary.700'>
											Date:
										</Typography>
										<Typography ml={1} variant='dataDialog' color='blacky.main'>
											{experiment.experimentDate}
										</Typography>
									</Grid>
									<Grid item xxs={12} xs={12} s={12}>
										<Typography variant='titleDialog' color='primary.700'>
											Time:
										</Typography>
										<Typography ml={1} variant='dataDialog' color='blacky.main'>
											{experiment.experimentTime} ({experiment.timezone})
										</Typography>
									</Grid>

									<Grid item xxs={12} align='center'>
										<Box
											sx={{
												width: '65vw',
												height: '18vh',
												'@media (min-width:500px)': {
													width: '65vw',
													height: '23vh',
												},
												'@media (min-width:700px)': {
													width: '65vw',
													height: '32vh',
												},
											}}
										>
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
									<Grid item xxs={12} align='center' ml={2} mb={3}>
										{experiment.departmentLabs.map((city) => (
											<ShowDepartamentData
												departmentData={experiment.departmentLabs}
												key={city.departmentName}
												name={city.departmentName}
											></ShowDepartamentData>
										))}
									</Grid>
								</Grid>
							) : (
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
											textAlign: 'center',
										}}
										justifyContent='center'
									>
										<Typography variant='header3' color='blacky.main'>
											This Student has not done any Experiment yet
										</Typography>
									</Grid>
								</Grid>
							)}
						</Box>
					</Card>
				</Box>
				<ExperimentsListDialog
					open={openExperimentsList}
					handleClose={() => setOpenExperimentsList(false)}
					email={selectedStudentEmail}
					setExperiment={setExperiment}
				/>
			</Box>
		</main>
	);
}
