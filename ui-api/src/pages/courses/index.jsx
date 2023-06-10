import {
	Box,
	Grid,
	Card,
	Typography,
	FormControl,
	Select,
	MenuItem,
	Button,
	IconButton,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import BlockIcon from '@mui/icons-material/Block';
import { toast } from 'react-toastify';
import CreateCourseDialog from '../../components/CreateCourseDialog';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { DataGrid } from '@mui/x-data-grid';

import Head from 'next/head';

export default function Courses() {
	const { data: session, status } = useSession();

	const [teacherCourses, setTeacherCourses] = useState([]);
	const [openCreateCourseDialog, setOpenCreateCourseDialog] = useState(false);
	const [selectedCourseName, setSelectedCourseName] = useState('');
	const [courseStudents, setCourseStudents] = useState({});
	const [courseRequests, setCourseRequests] = useState({});
	const [reRender, setReRender] = useState(false);

	const checkSession = async () => {
		if (status === 'authenticated') {
			await loadCourses();
		} else if (status === 'loading') {
		} else {
		}
	};

	const loadCourses = async () => {
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
			if (!window.localStorage.getItem('COURSE') && answer.courses.length > 0) {
				setSelectedCourseName(answer.courses[0].name);
				loadCourseStudents(answer.courses[0].id);
				loadCourseRequests(answer.courses[0].id);
				window.localStorage.setItem(
					'COURSE',
					JSON.stringify({
						name: answer.courses[0].name,
						id: answer.courses[0].id,
					})
				);
			} else if (answer.courses.length > 0) {
				loadCourseStudents(
					JSON.parse(window.localStorage.getItem('COURSE')).id
				);
				loadCourseRequests(
					JSON.parse(window.localStorage.getItem('COURSE')).id
				);
				setSelectedCourseName(
					JSON.parse(window.localStorage.getItem('COURSE')).name
				);
			}
		}
	};

	const loadCourseStudents = async (id) => {
		const response = await fetch(`/api/teacher/courses/read`, {
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
			setCourseStudents(answer.course.students);
		}
	};

	const loadCourseRequests = async (id) => {
		const response = await fetch(`/api/teacher/requests/read`, {
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
			setCourseRequests(answer.requests);
		}
	};

	const handleChange = (event) => {
		setSelectedCourseName(event.target.value);
		teacherCourses.forEach((course) => {
			if (course.name === event.target.value) {
				loadCourseStudents(course.id);
				loadCourseRequests(course.id);
				window.localStorage.setItem(
					'COURSE',
					JSON.stringify({ name: event.target.value, id: course.id })
				);
			}
		});
	};

	useEffect(() => {
		checkSession();
	}, [status, openCreateCourseDialog, reRender]);

	const router = useRouter();

	const handleRequest = async (params, status) => {
		if (status == 'Denied') {
			const response = await fetch(`/api/request/update`, {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify({ id: params.id, status: status }),
			});
			const answer = await response.json();
			if (answer.status) {
				toast.success('Request Denied');
			} else {
				toast.error("'Something Went Wrong, Please Try Again Later'");
			}
		} else if (status == 'Aproved') {
			const response = await fetch(`/api/request/aprove`, {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify({
					id: params.id,
					studentId: params.row.student.id,
					courseId: params.row.courseId,
				}),
			});
			const answer = await response.json();
			if (answer.status) {
				toast.success('Student Joined!');
			} else {
				toast.error("'Something Went Wrong, Please Try Again Later'");
			}
		}
		setReRender(!reRender);
	};

	const columns = [
		{ field: 'id', headerName: 'ID', width: 70, visible: true },
		{
			field: 'code',
			headerName: 'Code',
			width: 80,
			valueGetter: (params) => params.row?.user?.code,
		},
		{
			field: 'name',
			headerName: 'Name',
			width: 220,
			valueGetter: (params) => params.row?.user?.fullname,
		},

		{
			field: 'experiments',
			headerName: 'Experiments',
			width: 140,
			valueGetter: (params) => {
				return params.row.experiments.length;
			},
		},
	];

	const requestColumns = [
		{ field: 'id', headerName: 'ID', width: 70, visible: true },
		{
			field: 'code',
			headerName: 'Code',
			width: 80,
			valueGetter: (params) => params.row?.student.user?.code,
		},
		{
			field: 'name',
			headerName: 'Name',
			width: 200,
			valueGetter: (params) => params.row?.student.user?.fullname,
		},

		{
			field: 'actions',
			headerName: '',
			width: 250,
			renderCell: (params) => {
				return (
					<Box>
						<Grid container>
							<Grid
								item
								mr={{ xxs: 1, xs: 2, s: 2, sm: 4 }}
								sx={{
									display: 'flex',
									alignItems: 'center',
								}}
							>
								<IconButton
									onClick={() => handleRequest(params, 'Aproved')}
									sx={{
										color: 'success.main',
									}}
								>
									<CheckIcon
										sx={{
											fontSize: { xxs: '20px', xs: '24px', sm: '30px' },
										}}
									/>
								</IconButton>
								<Typography>Aprove</Typography>
							</Grid>
							<Grid
								onClick={() => {
									handleRequest(params, 'Denied');
								}}
								item
								sx={{
									display: 'flex',
									alignItems: 'center',
								}}
							>
								<IconButton
									sx={{
										color: 'error.main',
									}}
								>
									<BlockIcon
										sx={{
											fontSize: { xxs: '20px', xs: '24px', sm: '30px' },
										}}
									/>
								</IconButton>
								<Typography>Deny</Typography>
							</Grid>
						</Grid>
					</Box>
				);
			},
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
			<Box
				mt={{ xxs: 10, xs: 10, s: 10, sm: 12 }}
				px={{ xxs: 2, xs: 2, s: 3, sm: 3 }}
			>
				<Box
					my={{ xxs: 2, xs: 3, s: 3, sm: 3 }}
					mx={{ xxs: 2, xs: 3, s: 3, sm: 4 }}
					sx={{
						height: '100%',
						width: 'auto',
					}}
				>
					<Grid
						container
						rowSpacing={2}
						columnSpacing={{ sm: 0, md: 4, lg: 5, xl: 6 }}
					>
						<Grid
							item
							xs={12}
							s={6}
							sm={6}
							sx={{
								display: 'flex',
								alignItems: 'center',
							}}
							order={1}
						>
							<Typography variant='header2' color='primary.700'>
								Course:
							</Typography>
							<Box ml={2}>
								{teacherCourses.length > 0 ? (
									<FormControl size='small'>
										<Select value={selectedCourseName} onChange={handleChange}>
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
										You have not any Course yet, Create One!
									</Typography>
								)}
							</Box>
						</Grid>
						<Grid
							item
							xxs={12}
							xs={12}
							s={6}
							sm={6}
							sx={{
								display: 'flex',
								alignItems: 'center',
							}}
							justifyContent={{ xs: 'left', s: 'flex-end' }}
							order={2}
						>
							<Button
								variant='contained'
								sx={{
									textTransform: 'none',
									bgcolor: 'primary.700',
									ml: { xxs: 0, xs: 0, s: 0, sm: 3 },
									py: { xxs: 0, xs: 0, s: 0, sm: 1 },
								}}
								onClick={() => setOpenCreateCourseDialog(true)}
							>
								<Typography color='white.main' variant='buttonsExperiments'>
									Create New Course
								</Typography>
							</Button>
						</Grid>
					</Grid>
				</Box>
				<Box
					mx={{ xxs: 2, xs: 3, s: 3, sm: 4 }}
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
						}}
					>
						<Box
							my={{ xxs: 2, xs: 3, s: 3, sm: 4 }}
							mx={{ xxs: 3, xs: 3, s: 4, sm: 5 }}
						>
							<Grid
								container
								rowSpacing={2}
								columnSpacing={{ sm: 0, md: 4, lg: 5, xl: 6 }}
							>
								<Grid
									item
									xs={12}
									s={12}
									sm={12}
									md={6}
									sx={{
										display: 'flex',
										alignItems: 'center',
									}}
									order={3}
								>
									<Typography variant='header2' color='secondary.main'>
										List of Students:
									</Typography>
								</Grid>
								<Grid
									item
									xs={12}
									s={12}
									sm={12}
									md={6}
									sx={{
										display: 'flex',
										alignItems: 'center',
									}}
									order={{ xxs: 5, xs: 5, s: 5, sm: 5, md: 4 }}
								>
									<Typography variant='header2' color='secondary.main'>
										Pending Requests:
									</Typography>
								</Grid>
								<Grid
									item
									xs={12}
									s={12}
									sm={12}
									md={6}
									sx={{
										display: 'flex',
										alignItems: 'center',
									}}
									order={{ xxs: 4, xs: 4, s: 4, sm: 4, md: 5 }}
								>
									{courseStudents.length > 0 ? (
										<Box height='100%' width='100%'>
											<DataGrid
												columnVisibilityModel={{
													id: false,
												}}
												rows={courseStudents}
												columns={columns}
												initialState={{
													pagination: {
														paginationModel: { page: 0, pageSize: 10 },
													},
												}}
												pageSizeOptions={[5, 10]}
												getRowSpacing={(params) => ({
													top: params.isFirstVisible ? 0 : 5,
													bottom: params.isLastVisible ? 0 : 5,
												})}
												getRowId={(row) => row.id}
												rowsPerPageOptions={[10, 20]}
												disableColumnSelector={true}
												sx={{
													display: 'flex',

													boxShadow: 0,
													border: 'none',
													'& .MuiDataGrid-cell': {
														color: 'blacky.main',
														fontFamily: 'Lato',
														fontSize: '1.0rem',
														'@media (min-width:644px)': {
															fontSize: '1.0rem',
														},
														'@media (min-width:900px)': {
															fontSize: '1.1rem',
														},
													},
													'& .MuiDataGrid-columnHeader': {
														color: 'blacky.main',
														borderBottom: 3,
													},
													'& .MuiDataGrid-columnHeaderTitle': {
														fontFamily: 'Lato',
														fontWeight: 700,
														fontSize: '1.1rem',
														'@media (min-width:644px)': {
															fontSize: '1.2rem',
														},
														'@media (min-width:900px)': {
															fontSize: '1.3rem',
														},
													},
													'& .MuiDataGrid-virtualScroller': {
														color: 'primary.700',
													},
													'& .MuiDataGrid-footerContainer': {
														boxShadow: 0,
														borderBottom: 'none',
													},
												}}
											/>
										</Box>
									) : (
										<Typography variant='header3' color='blacky.main'>
											There are no Students in this Course
										</Typography>
									)}
								</Grid>

								<Grid
									item
									xs={12}
									s={12}
									sm={12}
									md={6}
									sx={{
										display: 'flex',
										alignItems: 'center',
									}}
									order={6}
								>
									{courseRequests.length > 0 ? (
										<Box height='100%' width='100%'>
											<DataGrid
												columnVisibilityModel={{
													id: false,
												}}
												rows={courseRequests}
												columns={requestColumns}
												initialState={{
													pagination: {
														paginationModel: { page: 0, pageSize: 10 },
													},
												}}
												pageSizeOptions={[5, 10]}
												getRowSpacing={(params) => ({
													top: params.isFirstVisible ? 0 : 5,
													bottom: params.isLastVisible ? 0 : 5,
												})}
												getRowId={(row) => row.id}
												rowsPerPageOptions={[10, 20]}
												disableColumnSelector={true}
												sx={{
													display: 'flex',

													boxShadow: 0,
													border: 'none',
													'& .MuiDataGrid-cell': {
														color: 'blacky.main',
														fontFamily: 'Lato',
														fontSize: '1.0rem',
														'@media (min-width:644px)': {
															fontSize: '1.0rem',
														},
														'@media (min-width:900px)': {
															fontSize: '1.1rem',
														},
													},
													'& .MuiDataGrid-columnHeader': {
														color: 'blacky.main',
														borderBottom: 3,
													},
													'& .MuiDataGrid-columnHeaderTitle': {
														fontFamily: 'Lato',
														fontWeight: 700,
														fontSize: '1.1rem',
														'@media (min-width:644px)': {
															fontSize: '1.2rem',
														},
														'@media (min-width:900px)': {
															fontSize: '1.3rem',
														},
													},
													'& .MuiDataGrid-virtualScroller': {
														color: 'primary.700',
													},
													'& .MuiDataGrid-footerContainer': {
														boxShadow: 0,
														borderBottom: 'none',
													},
												}}
											/>
										</Box>
									) : (
										<Typography variant='header3' color='blacky.main'>
											There are no Pending Requests in this Course
										</Typography>
									)}
								</Grid>
							</Grid>
						</Box>
					</Card>
				</Box>

				<CreateCourseDialog
					open={openCreateCourseDialog}
					handleClose={() => setOpenCreateCourseDialog(false)}
				/>
			</Box>
		</main>
	);
}
