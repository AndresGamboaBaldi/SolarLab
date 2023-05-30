import GoogleButton from './GoogleButton';
import Alert from './Alert';
import {
	Box,
	Checkbox,
	Dialog,
	Divider,
	FormControlLabel,
	Grid,
	Link,
	TextField,
	Typography,
	Button,
} from '@mui/material';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignInDialog({ open, handleClose, onClickSignup }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [showAlert, setShowAlert] = useState(false);
	const [statusAlert, setStatusAlert] = useState('success');
	const [messageAlert, setMessageAlert] = useState('');

	const handleCloseAlert = (event, reason) => {
		setShowAlert(false);
	};

	const handleAuth = async () => {
		signIn('credentials', { email: email, password: password, redirect: false })
			.then((response) => {
				if (response.ok) {
					setStatusAlert('success');
					setMessageAlert('Welcome Back!');
					setShowAlert(true);
					handleClose();
				} else {
					setStatusAlert('error');
					setMessageAlert('Incorrect Email or Password, Verify and Retry');
					setPassword('');
					setShowAlert(true);
				}
			})
			.catch((error) => {
				//console.log(error);
				setStatusAlert('error');
				setMessageAlert('Something Went Wrong, Please Retry');
				setPassword('');
				setShowAlert(true);
			});
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

				<Box>
					<Grid container>
						<Typography
							variant='header3'
							mb={{ xxs: 1, xs: 1, sm: 2 }}
							sx={{ mt: 2 }}
						>
							Email
						</Typography>
						<Grid item xxs={12} xs={12}>
							<TextField
								required
								hiddenLabel
								fullWidth
								autoComplete='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								variant='outlined'
								size='small'
								inputProps={{
									style: {
										padding: '8px',
										fontFamily: 'Lato',
									},
								}}
							/>
						</Grid>
						<Typography
							variant='header3'
							mb={{ xxs: 1, xs: 1, sm: 2 }}
							sx={{ mt: 2 }}
						>
							Password
						</Typography>

						<Grid item xxs={12} xs={12}>
							<TextField
								hiddenLabel
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
					</Grid>
					<Grid item xxs={12} xs={12}>
						<FormControlLabel
							sx={{ mt: 1 }}
							control={<Checkbox value='allowExtraEmails' color='primary' />}
							label={<Typography variant='body1'>Remember me</Typography>}
						/>
					</Grid>

					<Grid container justifyContent='center' mb={{ xxs: 2, xs: 2, sm: 3 }}>
						<Link href='#' variant='header3'>
							Forgot Password?
						</Link>
					</Grid>
					<Grid item xxs={12} xs={12} mb={{ xxs: 2, xs: 2, sm: 4 }}>
						<Button
							fullWidth
							variant='contained'
							sx={{
								color: 'white',
								textTransform: 'none',
								padding: '1px',
								bgcolor: 'primary.700',
							}}
							onClick={handleAuth}
						>
							<Typography variant='buttons4'>Sign In</Typography>
						</Button>
					</Grid>
					<Divider
						sx={{
							'&::before, &::after': {
								borderColor: 'blacky.main',
							},
						}}
					>
						<Typography variant='body1'>or</Typography>
					</Divider>
					<Grid container>
						<Grid
							item
							xxs={12}
							xs={12}
							mt={{ xxs: 2, xs: 2, sm: 4 }}
							mb={{ xxs: 1, xs: 1, sm: 3 }}
						>
							<GoogleButton></GoogleButton>
						</Grid>
					</Grid>
					<Grid container spacing={1} justifyContent='center'>
						<Grid item mt={{ xxs: 1, xs: 1, sm: 1 }}>
							<Typography variant='header3'>Don't have an account? </Typography>
							<Link
								mb={{ xxs: 1, xs: 1, sm: 1 }}
								component='button'
								onClick={onClickSignup}
								variant='header3'
							>
								Register
							</Link>
						</Grid>
					</Grid>
					<Alert
						open={showAlert}
						handleClose={handleCloseAlert}
						status={statusAlert}
						message={messageAlert}
					/>
				</Box>
			</Box>
		</Dialog>
	);
}
