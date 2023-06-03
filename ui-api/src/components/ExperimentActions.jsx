import { Box, IconButton, Typography, Grid } from '@mui/material';
import { Close, Launch } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
export default function ExperimentActions({ params, handleClose }) {
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
			toast.error("'Something Went Wrong, Please Try Again Later'");
		} else {
			toast.success('Deleted Successfully!');
			if (
				window.localStorage.getItem('EXPERIMENT') &&
				JSON.parse(window.localStorage.getItem('EXPERIMENT')).id == params.id
			) {
				window.localStorage.removeItem('EXPERIMENT');
			}

			handleClose();
		}
	};
	const openExperiment = () => {
		window.localStorage.setItem(
			'EXPERIMENT',
			JSON.stringify({ id: params.id })
		);
		handleClose();
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
						onClick={openExperiment}
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
		</Box>
	);
}
