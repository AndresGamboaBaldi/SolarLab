import {
	Box,
	Dialog,
	Divider,
	Grid,
	TextField,
	Typography,
	Button,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

export default function UpdatePasswordDialog({ open, handleClose }) {
	const [oldPassword, setOldPassword] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const { data: session, status } = useSession();

	const handleUpdate = async () => {
		try {
			if (password === confirmPassword) {
				setPasswordError(false);
				const response = await fetch(`/api/students/updatepassword`, {
					headers: {
						'Content-Type': 'application/json',
					},
					method: 'POST',
					body: JSON.stringify({
						email: session.user.email,
						password: password,
						oldPassword: oldPassword,
					}),
				});
				const answer = await response.json();
				setConfirmPassword('');
				setOldPassword('');
				setPassword('');
				if (answer.status) {
					toast.success('Updated Successfully');
					handleClose();
				} else {
					toast.error(answer.error);
				}
			} else {
				setPasswordError(true);
			}
		} catch (error) {
			toast.error('Update Failed, Please Try Again Later');
		}
	};

	const passwordErrorMessage = (
		<Typography variant='body2' color='error' gutterBottom>
			Las contraseñas no coinciden
		</Typography>
	);

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
				<Grid container justifyContent='center'>
					<Grid item>
						<Typography variant='header1' color='secondary'>
							Solar{' '}
						</Typography>
						<Typography variant='header1' color='primary.700'>
							Remote Lab
						</Typography>
					</Grid>
				</Grid>
				<Box component='form'>
					<Grid
						container
						rowSpacing={{ xxs: 1, xs: 1, sm: 2 }}
						columnSpacing={2}
					>
						<Grid item xxs={12} xs={12}>
							<Typography variant='header3'>Old Password</Typography>
						</Grid>
						<Grid item xxs={12} xs={12}>
							<TextField
								required
								fullWidth
								size='small'
								variant='outlined'
								type='password'
								autoComplete='new-password'
								value={oldPassword}
								onChange={(e) => setOldPassword(e.target.value)}
								InputProps={{
									style: {
										padding: '0',
										fontFamily: 'Lato',
									},
								}}
							/>
						</Grid>
						<Grid item xxs={12} xs={12}>
							<Typography variant='header3'>New Password</Typography>
						</Grid>
						<Grid item xxs={12} xs={12}>
							<TextField
								required
								fullWidth
								size='small'
								variant='outlined'
								type='password'
								autoComplete='new-password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								InputProps={{
									style: {
										padding: '0',
										fontFamily: 'Lato',
									},
								}}
							/>
						</Grid>
						<Grid item xxs={12} xs={12}>
							<Typography variant='header3'>Confirm New Password</Typography>
						</Grid>
						<Grid item xxs={12} xs={12}>
							<TextField
								required
								fullWidth
								size='small'
								variant='outlined'
								type='password'
								autoComplete='new-password'
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								error={passwordError}
								InputProps={{
									style: {
										padding: '0',
										fontFamily: 'Lato',
									},
								}}
							/>
							{passwordError && passwordErrorMessage}
						</Grid>{' '}
						<Grid
							item
							xxs={12}
							xs={12}
							mb={{ xxs: 2, xs: 2, sm: 3 }}
							mt={{ xxs: 2, xs: 2, s: 3, sm: 3 }}
						>
							<Button
								fullWidth
								variant='contained'
								sx={{
									color: 'white',
									textTransform: 'none',
									padding: '1px',
									bgcolor: 'primary.700',
								}}
								onClick={handleUpdate}
							>
								<Typography variant='buttons4'>Update</Typography>
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Dialog>
	);
}
