import {
	Box,
	Button,
	Dialog,
	Grid,
	TextField,
	Typography,
	Stack,
} from '@mui/material';
import React, { useState, useContext } from 'react';

const gridDataStyle = {
	display: 'inline-block',
	verticalAlign: 'middle',
	lineHeight: 'normal',
};

export default function SaveExperimentDialog({ open, handleClose }) {
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
			<Box m={{ xxs: 3, xs: 4, s: 4 }}>
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
								id='experimentName'
								name='experimentName'
								variant='outlined'
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
					<Grid item xxs={12} xs={12} mt={{ xxs: 1, xs: 1, sm: 2 }}>
						<Typography variant='titleDialog' color='secondary.main'>
							Cochabamba
						</Typography>
					</Grid>
					<Grid
						item
						xxs={6}
						xs={6}
						s={4}
						mt={{ xxs: 1, xs: 1, sm: 2 }}
						sx={{ gridDataStyle }}
					>
						<Typography variant='titleDialog' color='primary.700'>
							Date:
						</Typography>
						<Typography
							ml={{ xxs: 1, xs: 1, sm: 2 }}
							variant='dataDialog'
							color='blacky.main'
						>
							4/7/2023
						</Typography>
					</Grid>
					<Grid
						item
						xxs={6}
						xs={6}
						s={4}
						mt={{ xxs: 1, xs: 1, sm: 2 }}
						sx={{ gridDataStyle }}
					>
						<Typography variant='titleDialog' color='primary.700'>
							Time:
						</Typography>
						<Typography
							ml={{ xxs: 1, xs: 1, sm: 2 }}
							variant='dataDialog'
							color='blacky.main'
						>
							15:00:32
						</Typography>
					</Grid>
					<Grid
						item
						xxs={6}
						xs={6}
						s={4}
						sx={{ gridDataStyle }}
						mt={{ xxs: 1, xs: 1, sm: 2 }}
					>
						<Typography variant='titleDialog' color='primary.700'>
							Panel Angle:
						</Typography>
						<Typography
							ml={{ xxs: 1, xs: 1, sm: 1 }}
							variant='dataDialog'
							color='blacky.main'
						>
							45°
						</Typography>
					</Grid>
					<Grid
						item
						xxs={6}
						xs={6}
						s={4}
						sx={{ gridDataStyle }}
						mt={{ xxs: 1, xs: 1, sm: 2 }}
					>
						<Typography variant='titleDialog' color='primary.700'>
							Voltage:
						</Typography>
						<Typography
							ml={{ xxs: 1, xs: 1, sm: 2 }}
							variant='dataDialog'
							color='blacky.main'
						>
							15V
						</Typography>
					</Grid>
					<Grid
						item
						xxs={6}
						xs={6}
						s={4}
						sx={{ gridDataStyle }}
						mt={{ xxs: 1, xs: 1, sm: 2 }}
					>
						<Typography variant='titleDialog' color='primary.700'>
							Current:
						</Typography>
						<Typography
							ml={{ xxs: 1, xs: 1, sm: 1 }}
							variant='dataDialog'
							color='blacky.main'
						>
							0.2 A
						</Typography>
					</Grid>
					<Grid
						item
						sx={{ gridDataStyle }}
						xxs={6}
						xs={6}
						s={4}
						mt={{ xxs: 1, xs: 1, sm: 2 }}
					>
						<Typography variant='titleDialog' color='primary.700'>
							Radiation:
						</Typography>
						<Typography
							ml={{ xxs: 1, xs: 1, sm: 1 }}
							variant='buttons2'
							color='blacky.main'
						>
							2 W/m2
						</Typography>
					</Grid>
					<Grid item xxs={12} xs={12} mt={{ xxs: 1, xs: 1, sm: 2 }}>
						<Typography variant='titleDialog' color='secondary.main'>
							La Paz
						</Typography>
					</Grid>
					<Grid
						item
						xxs={6}
						xs={6}
						s={4}
						mt={{ xxs: 1, xs: 1, sm: 2 }}
						sx={{ gridDataStyle }}
					>
						<Typography variant='titleDialog' color='primary.700'>
							Date:
						</Typography>
						<Typography
							ml={{ xxs: 1, xs: 1, sm: 2 }}
							variant='dataDialog'
							color='blacky.main'
						>
							4/7/2023
						</Typography>
					</Grid>
					<Grid
						item
						xxs={6}
						xs={6}
						s={4}
						mt={{ xxs: 1, xs: 1, sm: 2 }}
						sx={{ gridDataStyle }}
					>
						<Typography variant='titleDialog' color='primary.700'>
							Time:
						</Typography>
						<Typography
							ml={{ xxs: 1, xs: 1, sm: 2 }}
							variant='dataDialog'
							color='blacky.main'
						>
							15:00:32
						</Typography>
					</Grid>
					<Grid
						item
						xxs={6}
						xs={6}
						s={4}
						sx={{ gridDataStyle }}
						mt={{ xxs: 1, xs: 1, sm: 2 }}
					>
						<Typography variant='titleDialog' color='primary.700'>
							Panel Angle:
						</Typography>
						<Typography
							ml={{ xxs: 1, xs: 1, sm: 1 }}
							variant='dataDialog'
							color='blacky.main'
						>
							45°
						</Typography>
					</Grid>
					<Grid
						item
						xxs={6}
						xs={6}
						s={4}
						sx={{ gridDataStyle }}
						mt={{ xxs: 1, xs: 1, sm: 2 }}
					>
						<Typography variant='titleDialog' color='primary.700'>
							Voltage:
						</Typography>
						<Typography
							ml={{ xxs: 1, xs: 1, sm: 2 }}
							variant='dataDialog'
							color='blacky.main'
						>
							15V
						</Typography>
					</Grid>
					<Grid
						item
						xxs={6}
						xs={6}
						s={4}
						sx={{ gridDataStyle }}
						mt={{ xxs: 1, xs: 1, sm: 2 }}
					>
						<Typography variant='titleDialog' color='primary.700'>
							Current:
						</Typography>
						<Typography
							ml={{ xxs: 1, xs: 1, sm: 1 }}
							variant='dataDialog'
							color='blacky.main'
						>
							0.2 A
						</Typography>
					</Grid>
					<Grid
						item
						sx={{ gridDataStyle }}
						xxs={6}
						xs={6}
						s={4}
						mt={{ xxs: 1, xs: 1, sm: 2 }}
					>
						<Typography variant='titleDialog' color='primary.700'>
							Radiation:
						</Typography>
						<Typography
							ml={{ xxs: 1, xs: 1, sm: 1 }}
							variant='buttons2'
							color='blacky.main'
						>
							2 W/m2
						</Typography>
					</Grid>
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
						>
							Cancel
						</Typography>
					</Button>
				</Stack>
			</Box>
		</Dialog>
	);
}
