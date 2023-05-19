import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleButton from './GoogleButton';
import {
	Box,
	Checkbox,
	Dialog,
	Divider,
	FormControlLabel,
	Grid,
	IconButton,
	InputAdornment,
	Link,
	TextField,
	Typography,
	Button,
} from '@mui/material';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignInDialog({ open, handleClose, onClickSignup }) {
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = () => setShowPassword(!showPassword);

	const [authState, setAuthState] = useState({
		email: '',
		password: '',
	});

	const handleOnChange = (e) => {
		setAuthState((old) => ({ ...old, [e.target.id]: e.target.value }));
	};

	const handleAuth = async () => {
		signIn('credentials', {
			...authState,
			redirect: false,
		})
			.then((response) => {
				console.log(response);
				if (response.ok) {
					console.log('Signed in');
					handleClose();
				} else {
					console.log('Wrong');
				}
			})
			.catch((error) => {
				console.log(error);
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
								id='email'
								name='email'
								autoComplete='email'
								onChange={handleOnChange}
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
								name='password'
								type={showPassword ? 'text' : 'password'}
								id='password'
								autoComplete='new-password'
								onChange={handleOnChange}
								InputProps={{
									style: {
										padding: '0',
										fontFamily: 'Lato',
									},
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												aria-label='toggle password visibility'
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												color='secondary'
											>
												{showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									),
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
				</Box>
			</Box>
		</Dialog>
	);
}
