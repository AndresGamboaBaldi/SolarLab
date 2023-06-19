import {
	Box,
	Dialog,
	Grid,
	TextField,
	Typography,
	Button,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export default function CreateCourseDialog({ open, handleClose }) {
	const { data: session, status } = useSession();
	const [name, setName] = useState('');
	const saveCourse = async () => {
		if (validateFields()) {
			const response = await fetch(`/api/teacher/courses/create`, {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify({ email: session.user.email, name: name }),
			});
			const answer = await response.json();

			if (!answer.status) {
				toast.error('Something Went Wrong, Please Try Again');
			} else {
				toast.success('Created Successfully!');
				setName('');
				handleClose();
			}
		} else {
			toast.error('Please Enter a Name for The Course');
		}
	};
	const validateFields = () => {
		return name;
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
			<Box
				m={{ xxs: 3, xs: 4, sm: 5 }}
				sx={{
					alignItems: 'center',
				}}
			>
				<Grid container justifyContent='center' rowSpacing={2}>
					<Grid item>
						<Typography variant='header1' color='secondary'>
							Solar{' '}
						</Typography>
						<Typography variant='header1' color='primary.700'>
							Remote Lab
						</Typography>
					</Grid>

					<Grid item xxs={12} xs={12}>
						<Typography variant='header3'>Course Name:</Typography>
					</Grid>

					<Grid item xxs={12} xs={12}>
						<TextField
							required
							fullWidth
							size='small'
							variant='outlined'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Grid>
					<Grid item xxs={12} mt={{ xxs: 1, xs: 1, sm: 1 }}>
						<Button
							fullWidth
							variant='contained'
							sx={{
								textTransform: 'none',
								bgcolor: 'primary.700',
							}}
							onClick={saveCourse}
						>
							<Typography color='white.main' variant='buttonsExperiments'>
								Save
							</Typography>
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Dialog>
	);
}
