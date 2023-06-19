import {
	Box,
	Button,
	Dialog,
	Grid,
	TextField,
	Typography,
	Stack,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import DepartmentDataDialog from './DepartmentDataDialog';
import { useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import LineChart from './LineChart';
import { v4 as uuidv4 } from 'uuid';

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
						}),
					});
					const answer = await response.json();
					if (answer.status) {
						setExperimentName('');
						handleClose();
						toast.success('Saved Successfully!');
					} else {
						toast.error('Error Saving, Please Try Again Later');
					}
				} else {
					toast.error('A City is Missing a Test, Please Start it First');
				}
			} else {
				toast.error('Please Give the Experiment a Name before Saving');
			}
		} else {
			toast.error('Select Cities for the Experiment');
		}
	};

	const validateFields = () => {
		return experimentName;
	};
	const validateEfficiencyTests = () => {
		for (let i = 0; i < departmentsToSave.length; i++) {
			if (departmentsToSave[i].efficiencyTest.length == 0) return false;
		}
		return true;
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			PaperProps={{
				sx: {
					borderRadius: '24px',
					maxWidth: '660px',
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
						{' '}
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

					<Grid item xxs={4} xs={4}>
						<Typography variant='buttonsExperiments' color='primary.700'>
							Date
						</Typography>
					</Grid>
					<Grid item xxs={8} xs={8}>
						<Typography variant='buttonsExperiments' color='primary.700'>
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
						{' '}
						<Box
							sx={{
								width: '100%',
								height: '19vh',
							}}
							mt={1}
						>
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
