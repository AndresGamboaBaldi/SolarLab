import {
	Box,
	Button,
	Dialog,
	Grid,
	TextField,
	Typography,
	Stack,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import DepartmentDataDialog from './DepartmentDataDialog';
import { useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import LineChart from './LineChart';
import { v4 as uuidv4 } from 'uuid';
import { CSVLink } from 'react-csv';
import DownloadIcon from '@mui/icons-material/Download';

export default function SaveExperimentDialog({
	open,
	handleClose,
	departmentData,
	selectedCities,
}) {
	const { data: session, status } = useSession();
	const [experimentName, setExperimentName] = useState('');
	const [date, setDate] = useState(0);
	const [time, setTime] = useState(0);
	const [timezone, setTimezone] = useState(
		Intl.DateTimeFormat().resolvedOptions().timeZone
	);

	const [departmentsToSave, setDepartmentsToSave] = useState([]);
	const [studentCourses, setStudentCourses] = useState([]);
	const [selectedCourse, setSelectedCourse] = useState('');
	useEffect(() => {
		const date = new Date().toLocaleString(navigator.language);
		const time = new Date().toLocaleString(navigator.language, {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		});
		setDate(date.split(',')[0]);
		setTime(time);
		setDepartmentsToSave(
			departmentData.filter((department) =>
				selectedCities.includes(department.departmentName)
			)
		);
	}, [open]);
	useEffect(() => {
		checkSession();
	}, [status]);

	const checkSession = async () => {
		if (status === 'authenticated') {
			await loadStudentCourses();
		} else if (status === 'loading') {
		} else {
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
		}
	};

	const saveExperiment = async () => {
		if (selectedCities.length > 0) {
			if (validateFields()) {
				if (validateEfficiencyTests()) {
					const departmentWithId = departmentsToSave.map((departmentlab) => ({
						...departmentlab,
						id: uuidv4(),
					}));

					const efficiencyTestRecords = departmentWithId.map(
						({ id, efficiencyTest }) => ({ id, efficiencyTest })
					);

					const departmentsLabs = departmentWithId.map(
						({ efficiencyTest, ...department }) => department
					);

					const response = await fetch(`/api/experiments/create`, {
						headers: {
							'Content-Type': 'application/json',
						},
						method: 'POST',
						body: JSON.stringify({
							experimentName: experimentName,
							email: session.user.email,
							departments: departmentsLabs,
							efficiencyTestRecords: efficiencyTestRecords,
							experimentDate: date,
							experimentTime: time,
							timezone: timezone,
							courseId: selectedCourse,
						}),
					});
					const answer = await response.json();
					if (answer.status) {
						setExperimentName('');
						setSelectedCourse('');
						handleClose();
						toast.success('Saved Successfully!');
					} else {
						toast.error('Error Saving, Please Try Again Later');
					}
				} else {
					toast.error('A City is Missing a Test, Please Start it First');
				}
			} else {
				toast.error('Please Review Name and Course');
			}
		} else {
			toast.error('Select Cities for the Experiment');
		}
	};

	const validateFields = () => {
		return experimentName && selectedCourse;
	};
	const validateEfficiencyTests = () => {
		for (let i = 0; i < departmentsToSave.length; i++) {
			if (departmentsToSave[i].efficiencyTest.length == 0) return false;
		}
		return true;
	};

	const handleChange = (event) => {
		setSelectedCourse(event.target.value);
	};

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

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			PaperProps={{
				sx: {
					borderRadius: '24px',
					maxWidth: '720px',
				},
			}}
		>
			<Box m={{ xxs: 3, xs: 4, s: 4, sm: 5 }}>
				<Grid container rowSpacing={1}>
					<Grid item xxs={12} xs={12} mb={1}>
						<Typography variant='header1' color='secondary'>
							Save{' '}
						</Typography>
						<Typography variant='header1' color='primary.700'>
							Experiment
						</Typography>
					</Grid>
					<Grid item xxs={12} xs={12}>
						<Typography variant='titleDialog' color='blacky.main'>
							Review the data and give the experiment a name
						</Typography>
					</Grid>
					<Grid item xxs={12} xs={12} mb={1}>
						<Typography variant='titleDialog' color='primary.700'>
							Name
						</Typography>
					</Grid>
					<Grid item xxs={12} xs={12} mb={1}>
						<TextField
							required
							hiddenLabel
							fullWidth
							variant='outlined'
							value={experimentName}
							onChange={(e) => setExperimentName(e.target.value)}
							size='small'
							inputProps={{
								style: {
									height: '1.6rem',
									padding: '8px',
									fontFamily: 'Lato',
									fontSize: '1.2rem',
								},
							}}
						/>
					</Grid>
					<Grid item xxs={12} xs={12} mb={1}>
						<Typography variant='titleDialog' color='primary.700'>
							Course
						</Typography>
					</Grid>
					<Grid item xxs={12} xs={12} mb={1}>
						{studentCourses.length > 0 ? (
							<FormControl sx={{ minWidth: '100%' }} size='small'>
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
												value =
													course.name +
													' - ' +
													course.teacher.user.name +
													' - ' +
													course.startDate;
											}
										});
										return value;
									}}
								>
									{studentCourses.map((course) => (
										<MenuItem key={course.id} value={course.id}>
											<Typography variant='header3' color='blacky.main'>
												{course.name} {'- '}
												{course.teacher.user.name} {'- '} {course.startDate}
											</Typography>
										</MenuItem>
									))}
								</Select>
							</FormControl>
						) : (
							<Typography variant='header3' color='info.main'>
								Not Member of any Course
							</Typography>
						)}
					</Grid>

					<Grid item xxs={4} xs={4}>
						<Typography variant='titleDialog' color='primary.700'>
							Date
						</Typography>
					</Grid>
					<Grid item xxs={8} xs={8}>
						<Typography variant='titleDialog' color='primary.700'>
							Time
						</Typography>
					</Grid>
					<Grid item xxs={4} xs={4}>
						{' '}
						<Typography variant='dataDialog' color='blacky.main'>
							{date}
						</Typography>
					</Grid>
					<Grid item xxs={8} xs={8}>
						{' '}
						<Typography variant='dataDialog' color='blacky.main'>
							{time} {timezone}
						</Typography>
					</Grid>

					<Grid item xxs={12} xs={12}>
						<Box mt={1}>
							<LineChart
								chartData={departmentsToSave.map(
									(department) => department.efficiencyTest
								)}
								names={departmentsToSave.map(
									(department) => department.departmentName
								)}
								minimize={true}
							></LineChart>
						</Box>
					</Grid>
					<Grid item xxs={12} align='center' mt={1}>
						<CSVLink
							data={getData(
								departmentsToSave.map((department) => department.efficiencyTest)
							)}
							headers={getColumns()}
							filename={'Efficiency_Test.csv'}
						>
							<Button
								variant='contained'
								sx={{
									textTransform: 'none',
									bgcolor: 'primary.700',
								}}
								endIcon={<DownloadIcon />}
							>
								<Typography color='white.main' variant='buttonsExperiments'>
									Download Data
								</Typography>
							</Button>
						</CSVLink>
					</Grid>

					<Grid item xxs={12} xs={12}>
						{selectedCities.map((city) => (
							<DepartmentDataDialog
								departmentData={departmentData}
								key={city}
								name={city}
							></DepartmentDataDialog>
						))}
					</Grid>
				</Grid>
				<Stack
					direction='row'
					justifyContent='end'
					mt={{ xxs: 1, xs: 1, sm: 2 }}
				>
					<Button
						variant='contained'
						my={{ xxs: 1, xs: 1, sm: 2 }}
						sx={{
							textTransform: 'none',
							bgcolor: 'primary.700',
							mr: { xxs: 1, xs: 1, sm: 3 },
						}}
						onClick={saveExperiment}
					>
						<Typography
							mx={{ xxs: 1, xs: 1, sm: 3 }}
							variant='buttons1'
							color='white'
						>
							Save
						</Typography>
					</Button>
					<Button
						color='white'
						variant='contained'
						sx={{
							border: 1,
							textTransform: 'none',
							borderColor: 'primary.700',
						}}
						onClick={handleClose}
					>
						<Typography
							mx={{ xxs: 0, xs: 0, sm: 1 }}
							variant='buttons1'
							color='primary.700'
							sx={{
								'&:hover': {
									color: '#fff',
								},
							}}
						>
							Cancel
						</Typography>
					</Button>
				</Stack>
			</Box>
		</Dialog>
	);
}
