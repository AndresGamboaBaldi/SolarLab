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
import Alert from './Alert';
import DepartmentDataDialog from './DepartmentDataDialog';
import { useSession } from 'next-auth/react';

export default function SaveExperimentDialog({
	open,
	handleClose,
	departmentData,
	selectedCities,
}) {
	const { data: session, status } = useSession();
	const [experimentName, setExperimentName] = useState('');

	const [showAlert, setShowAlert] = useState(false);
	const [statusAlert, setStatusAlert] = useState('success');
	const [messageAlert, setMessageAlert] = useState('');

	const [departmentsToSave, setDepartmentsToSave] = useState([]);
	useEffect(() => {
		setDepartmentsToSave(
			departmentData.filter((department) =>
				selectedCities.includes(department.departmentName)
			)
		);
	}, [selectedCities]);

	const handleCloseAlert = (event, reason) => {
		setShowAlert(false);
	};

	const saveExperiment = async () => {
		if (validateFields()) {
			const experimentToSave = {
				experimentName: experimentName,
				email: session.user.email,
				departments: departmentsToSave,
			};
			const response = await fetch(`/api/experiments/create`, {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify(experimentToSave),
			});
			const newExperiment = await response.json();
			if (newExperiment.name) {
				setExperimentName('');
				setStatusAlert('success');
				setMessageAlert('Saved Successfully!');
				setShowAlert(true);
			} else {
				setStatusAlert('error');
				setMessageAlert('Error Saving, Please Try Again Later');
				setShowAlert(true);
			}
		} else {
			setStatusAlert('error');
			setMessageAlert('Give the Experiment a Name');
			setShowAlert(true);
		}
	};

	const validateFields = () => {
		return experimentName;
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
				<Grid container>
					<Grid item xxs={12} xs={12}>
						<Typography variant='header1' color='secondary'>
							Save{' '}
						</Typography>
						<Typography variant='header1' color='primary.700'>
							Experiment
						</Typography>
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xxs={12} xs={12} mt={{ xxs: 1, xs: 1, sm: 2 }}>
						<Typography variant='titleDialog' color='blacky.main'>
							Review the data and give the experiment a name
						</Typography>
					</Grid>
				</Grid>

				<Box>
					<Grid container>
						<Typography
							variant='titleDialog'
							mb={{ xxs: 1, xs: 1, sm: 2 }}
							sx={{ mt: 2 }}
							color='primary.700'
						>
							Name
						</Typography>
						<Grid item xxs={12} xs={12}>
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
					</Grid>
				</Box>
				<Grid container>
					{selectedCities.map((city) => (
						<DepartmentDataDialog
							departmentData={departmentData}
							key={city}
							name={city}
						></DepartmentDataDialog>
					))}
				</Grid>
				<Stack
					direction='row'
					justifyContent='end'
					mt={{ xxs: 2, xs: 4, sm: 4 }}
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
				<Alert
					open={showAlert}
					handleClose={handleCloseAlert}
					status={statusAlert}
					message={messageAlert}
				/>
			</Box>
		</Dialog>
	);
}
