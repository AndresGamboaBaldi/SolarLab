import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleButton from './GoogleButton';
import {
	Box,
	Dialog,
	Divider,
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

export default function SignUpDialog({ open, handleClose, onClickSignIn }) {
	const [passwordError, setPasswordError] = useState(false);

	const [authState, setAuthState] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		fullname: '',
		studentCode: '',
	});

	const handleOnChange = (e) => {
		setAuthState((old) => ({ ...old, [e.target.id]: e.target.value }));
	};

	const handleAuth = async () => {
		if (validateFields()) {
			if (authState.password === authState.confirmPassword) {
				setPasswordError(false);
				const response = await fetch(`/api/signUp`, {
					headers: {
						'Content-Type': 'application/json',
					},
					method: 'POST',
					body: JSON.stringify(authState),
				});
				const data = await response.json();
				if (data.status) {
					await createSessionAuth();
				} else {
					console.log(data.error);
				}
			} else {
				setPasswordError(true);
			}
		} else {
			console.log('Missing Fields');
		}
	};
	const createSessionAuth = async () => {
		signIn('credentials', {
			...authState,
			redirect: false,
		})
			.then((response) => {
				if (response.ok) {
					console.log('Signed in');
					handleClose();
				}
			})
			.catch((error) => {
				console.log('Account Created, You can now login on the Page');
			});
	};
	const validateFields = () => {
		return (
			authState.password &&
			authState.email &&
			authState.fullname &&
			authState.studentCode
		);
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
							<Typography variant='header3'>Email</Typography>{' '}
						</Grid>

						<Grid item xxs={12} xs={12}>
							<TextField
								required
								fullWidth
								size='small'
								variant='outlined'
								id='email'
								name='email'
								autoComplete='email'
								onChange={handleOnChange}
								inputProps={{
									style: {
										padding: '8px',
										fontFamily: 'Lato',
									},
								}}
							/>
						</Grid>
						<Grid item xxs={8} xs={8}>
							<Typography variant='header3' mb={2}>
								Full Name
							</Typography>
						</Grid>
						<Grid item xxs={4} xs={4}>
							<Typography variant='header3' sx={{ marginBottom: '2' }}>
								Code
							</Typography>
						</Grid>
						<Grid item xxs={8} xs={8}>
							<TextField
								required
								fullWidth
								size='small'
								variant='outlined'
								id='fullname'
								name='fullname'
								autoComplete='fullname'
								onChange={handleOnChange}
								inputProps={{
									style: {
										padding: '8px',
										fontFamily: 'Lato',
									},
								}}
							/>
						</Grid>

						<Grid item xxs={4} xs={4}>
							<TextField
								required
								fullWidth
								size='small'
								variant='outlined'
								id='studentCode'
								name='studentCode'
								onChange={handleOnChange}
								inputProps={{
									style: {
										padding: '8px',
										fontFamily: 'Lato',
									},
								}}
							/>
						</Grid>
						<Grid item xxs={12} xs={12}>
							<Typography variant='header3'>Password</Typography>
						</Grid>
						<Grid item xxs={12} xs={12}>
							<TextField
								required
								fullWidth
								size='small'
								variant='outlined'
								name='password'
								id='password'
								type='password'
								autoComplete='new-password'
								onChange={handleOnChange}
								InputProps={{
									style: {
										padding: '0',
										fontFamily: 'Lato',
									},
								}}
							/>
						</Grid>
						<Grid item xxs={12} xs={12}>
							<Typography variant='header3'>Confirm Password</Typography>
						</Grid>
						<Grid item xxs={12} xs={12}>
							<TextField
								required
								fullWidth
								size='small'
								variant='outlined'
								name='confirmPassword'
								type='password'
								id='confirmPassword'
								autoComplete='new-password'
								onChange={handleOnChange}
								error={passwordError}
								InputProps={{
									style: {
										padding: '0',
										fontFamily: 'Lato',
									},
								}}
							/>
							{passwordError && passwordErrorMessage}
						</Grid>
					</Grid>
					<Grid
						item
						xxs={12}
						xs={12}
						mb={{ xxs: 2, xs: 2, sm: 3 }}
						mt={{ xxs: 2, xs: 3, sm: 4 }}
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
							onClick={handleAuth}
						>
							<Typography variant='buttons4'>Sign Up</Typography>
						</Button>
					</Grid>
					<Grid
						item
						xxs={12}
						xs={12}
						container
						justifyContent='center'
						sx={{
							mb: { xxs: 1, xs: 1, sm: 2 },
						}}
					>
						<Grid item>
							<Typography variant='header3'>
								Already Have an Account?{' '}
							</Typography>
							<Link
								component='button'
								onClick={onClickSignIn}
								variant='header3'
								mb={{ xxs: 1, xs: 1, sm: 1 }}
							>
								Sign In
							</Link>
						</Grid>
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
							mt={{ xxs: 2, xs: 2, sm: 3 }}
							mb={{ xxs: 1, xs: 1, sm: 3 }}
						>
							<GoogleButton></GoogleButton>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Dialog>
	);
}
