import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
	Box,
	Dialog,
	Divider,
	Grid,
	IconButton,
	InputAdornment,
	Link,
	SvgIcon,
	TextField,
	Typography,
} from '@mui/material';
import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import Button from '@mui/material/Button';
import { login } from '../utils/login.js';

export default function SignUpDialog({ open, handleClose, onClickSignIn }) {
	const [regEmail, setEmail] = useState('');
	const [regPassword, setPassword] = useState('');
	const [regConfirmPassword, setConfirmPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = () => setShowPassword(!showPassword);

	const { user, setUser } = useContext(UserContext);

	const handleSignIn = async (event) => {
		const newUser = await login();
		setUser(newUser);
	};

	const passwordErrorMessage = (
		<Typography variant='caption' color='error' gutterBottom>
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
								fullWidth
								size='small'
								variant='outlined'
								id='email'
								name='email'
								autoComplete='email'
								onChange={(e) => setEmail(e.target.value)}
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
						<Typography
							variant='header3'
							mb={{ xxs: 1, xs: 1, sm: 2 }}
							sx={{ mt: 2 }}
						>
							Password
						</Typography>
						<Grid item xxs={12} xs={12}>
							<TextField
								required
								fullWidth
								size='small'
								variant='outlined'
								name='password'
								type={showPassword ? 'text' : 'password'}
								id='password'
								autoComplete='new-password'
								onChange={(e) => setPassword(e.target.value)}
								InputProps={{
									style: {
										height: '2.6rem',
										padding: '0',
										fontFamily: 'Lato',
										fontSize: '1.2rem',
									},
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												color='secondary'
												aria-label='toggle password visibility'
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
											>
												{showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</Grid>
						<Typography
							variant='header3'
							mb={{ xxs: 1, xs: 1, sm: 2 }}
							sx={{ mt: 2 }}
						>
							Confirm Password
						</Typography>
						<Grid item xxs={12} xs={12}>
							<TextField
								required
								fullWidth
								size='small'
								variant='outlined'
								name='confirmPassword'
								type={showPassword ? 'text' : 'password'}
								id='confirmPassword'
								autoComplete='new-password'
								onChange={(e) => setConfirmPassword(e.target.value)}
								error={!!passwordError}
								InputProps={{
									style: {
										height: '2.6rem',
										padding: '0',
										fontFamily: 'Lato',
										fontSize: '1.2rem',
									},
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												color='secondary'
												aria-label='toggle password visibility'
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
											>
												{showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									),
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
							onClick={handleSignIn}
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
							<Button
								fullWidth
								variant='outlined'
								size='large'
								sx={{
									borderColor: 'gray',
									color: 'black',
									textTransform: 'none',
								}}
							>
								<SvgIcon sx={{ fontSize: { xxs: 16, xs: 20, sm: 32 }, mr: 2 }}>
									<path
										d='M23.001 12.2332C23.001 11.3699 22.9295 10.7399 22.7748 10.0865H12.7153V13.9832H18.62C18.501 14.9515 17.8582 16.4099 16.4296 17.3898L16.4096 17.5203L19.5902 19.935L19.8106 19.9565C21.8343 18.1249 23.001 15.4298 23.001 12.2332'
										fill='#4285F4'
									/>
									<path
										d='M12.714 22.5C15.6068 22.5 18.0353 21.5666 19.8092 19.9567L16.4282 17.3899C15.5235 18.0083 14.3092 18.4399 12.714 18.4399C9.88069 18.4399 7.47596 16.6083 6.61874 14.0766L6.49309 14.0871L3.18583 16.5954L3.14258 16.7132C4.90446 20.1433 8.5235 22.5 12.714 22.5Z'
										fill='#34A853'
									/>
									<path
										d='M6.62046 14.0767C6.39428 13.4234 6.26337 12.7233 6.26337 12C6.26337 11.2767 6.39428 10.5767 6.60856 9.92337L6.60257 9.78423L3.25386 7.2356L3.14429 7.28667C2.41814 8.71002 2.00146 10.3084 2.00146 12C2.00146 13.6917 2.41814 15.29 3.14429 16.7133L6.62046 14.0767'
										fill='#FBBC05'
									/>
									<path
										d='M12.7141 5.55997C14.7259 5.55997 16.083 6.41163 16.8569 7.12335L19.8807 4.23C18.0236 2.53834 15.6069 1.5 12.7141 1.5C8.52353 1.5 4.90447 3.85665 3.14258 7.28662L6.60686 9.92332C7.47598 7.39166 9.88073 5.55997 12.7141 5.55997'
										fill='#EB4335'
									/>
								</SvgIcon>
								<Typography variant='header3' color='blacky'>
									Continue with Google
								</Typography>
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Dialog>
	);
}
