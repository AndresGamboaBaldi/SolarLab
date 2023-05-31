import { Box, IconButton, Typography, Grid } from '@mui/material';
import { Close, Launch } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import Alert from './Alert';
export default function ExperimentActions({ params, handleClose }) {
	const [showAlert, setShowAlert] = useState(false);
	const [statusAlert, setStatusAlert] = useState('success');
	const [messageAlert, setMessageAlert] = useState('');

	const handleCloseAlert = (event, reason) => {
		setShowAlert(false);
	};

	const deleteExperiment = async () => {
		const response = await fetch(`/api/experiments/delete`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify(params.id),
		});
		const deleted = await response.json();
		if (deleted.error) {
			setStatusAlert('error');
			setMessageAlert('Something Wen Wrong, Please Try Again Later');
			setShowAlert(true);
		} else {
			setStatusAlert('success');
			setMessageAlert('Deleted Successfully!');
			setShowAlert(true);
			handleClose();
		}
	};
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
						onClick={() => {
							console.log('pushed');
						}}
						sx={{
							color: 'secondary.main',
						}}
					>
						<Launch
							sx={{
								fontSize: { xxs: '20px', xs: '24px', sm: '30px' },
							}}
						/>
					</IconButton>
					<Typography>Open</Typography>
				</Grid>
				<Grid
					onClick={deleteExperiment}
					item
					sx={{
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<IconButton
						sx={{
							color: 'secondary.main',
						}}
					>
						<Close
							sx={{
								fontSize: { xxs: '20px', xs: '24px', sm: '30px' },
							}}
						/>
					</IconButton>
					<Typography>Delete</Typography>
				</Grid>
			</Grid>
			<Alert
				open={showAlert}
				handleClose={handleCloseAlert}
				status={statusAlert}
				message={messageAlert}
			/>
		</Box>
	);
}
