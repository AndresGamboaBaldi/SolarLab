import GoogleButton from './GoogleButton';
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
import { toast } from 'react-toastify';

export default function SignInDialog({ open, handleClose, onClickSignup }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleAuth = async () => {
		if (validateFields()) {
			signIn('credentials', {
				email: email,
				password: password,
				redirect: false,
			})
				.then((response) => {
					if (response.ok) {
						toast.success('Welcome Back!');
						handleClose();
					} else {
						toast.error('Incorrect Email or Password, Verify and Retry');
					}
				})
				.catch((error) => {
					toast.error('Something Went Wrong, Please Retry');
				});
		} else {
			toast.error('Incorrect Email or Password, Verify and Retry');
		}
	};
	const validateFields = () => {
		return password && email;
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

					<Grid container justifyContent='center' my={{ xxs: 2, xs: 2, sm: 3 }}>
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
				</Box>
			</Box>
		</Dialog>
	);
}
