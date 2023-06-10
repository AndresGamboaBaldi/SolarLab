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
import { toast } from 'react-toastify';
import ExperimentsListDialog from '../../components/ExperimentsList';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LineChart from '../../components/LineChart';
import ShowDepartamentData from '../../components/ShowDepartamentData';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

export default function teacherExperiments() {
	const [selectedCourseName, setSelectedCourseName] = useState('');
	const [selectedStudentName, setSelectedStudentName] = useState('');
	const [selectedStudentEmail, setSelectedStudentEmail] = useState('');
	const [courseStudents, setCourseStudents] = useState({});
	const [teacherCourses, setTeacherCourses] = useState([]);

	const { data: session, status } = useSession();
	const [experiment, setExperiment] = useState({});
	const [efficiencyTest, setEfficiencyTest] = useState([]);

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
			toast.error('Something Went Wrong, Please Try Again');
		} else {
			setTeacherCourses(answer.courses);
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
			if (student.user.fullname == event.target.value) {
				setSelectedStudentEmail(student.userEmail);
				setExperiment(student.experiments[0]);
			}
		});
	};

	useEffect(() => {
		checkSession();
	}, [status, efficiencyTest]);

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
				px={{ xxs: 2, xs: 2, s: 3, sm: 4 }}
			>
				<Card
					elevation={5}
					sx={{
						height: '100%',
						width: 'auto',
					}}
				>
					<Box
						my={{ xxs: 2, xs: 3, s: 3, sm: 4 }}
						mx={{ xxs: 3, xs: 3, s: 4, sm: 5 }}
					>
						<Grid container justify='center' columnSpacing={2} rowSpacing={2}>
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
							>
								<Typography variant='header2' color='primary.700'>
									Course:
								</Typography>
								<Box ml={2}>
									{teacherCourses.length > 0 ? (
										<FormControl size='small' sx={{ minWidth: 180 }}>
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
											You have not Any Course, Create One!
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
							>
								<Typography variant='header2' color='primary.700'>
									Student:
								</Typography>
								<Box ml={2}>
									{courseStudents.length > 0 ? (
										<FormControl size='small' sx={{ minWidth: 180 }}>
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
													<MenuItem
														key={student.id}
														value={student.user.fullname}
													>
														<Typography variant='header3' color='blacky.main'>
															{student.user.fullname}
														</Typography>
													</MenuItem>
												))}
											</Select>
										</FormControl>
									) : (
										<Typography variant='header3' color='blacky.main'>
											There are no Students in this Course
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
								justifyContent={{ xs: 'left', s: 'flex-end' }}
							>
								{experiment && Object.keys(experiment).length > 0 ? (
									<Button
										variant='contained'
										sx={{
											textTransform: 'none',
											bgcolor: 'primary.700',
											ml: { xxs: 0, xs: 0, s: 0, sm: 3 },
											py: { xxs: 0, xs: 0, s: 0, sm: 1 },
										}}
										onClick={() => setOpenExperimentsList(true)}
									>
										<Typography color='white.main' variant='buttonsExperiments'>
											View Student Experiments
										</Typography>
									</Button>
								) : null}
							</Grid>
							{experiment && Object.keys(experiment).length > 0 ? (
								<Box>
									<Grid
										item
										xxs={12}
										xs={12}
										my={2}
										ml={2}
										sx={{ verticalAlign: 'middle' }}
									>
										<Typography variant='header1' color='blacky.main'>
											{experiment.name}
										</Typography>
									</Grid>

									<Grid
										item
										xxs={12}
										ml={2}
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
												experimentDatetime={experiment.experimentDatetime}
											></ShowDepartamentData>
										))}
									</Grid>
								</Box>
							) : (
								<Typography variant='header2' color='blacky.main' mt={2} ml={2}>
									This Student has not done Any Experiments
								</Typography>
							)}
						</Grid>
					</Box>
				</Card>
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
