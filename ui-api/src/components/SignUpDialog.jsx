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

export default function SignUpDialog({ open, handleClose, onClickSignIn }) {
	const [regEmail, setEmail] = useState('');
	const [regPassword, setPassword] = useState('');
	const [regConfirmPassword, setConfirmPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = () => setShowPassword(!showPassword);

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
								onChange={(e) => setEmail(e.target.value)}
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
								id='code'
								name='code'
								autoComplete='code'
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
								type={showPassword ? 'text' : 'password'}
								id='password'
								autoComplete='new-password'
								onChange={(e) => setPassword(e.target.value)}
								InputProps={{
									style: {
										padding: '0',
										fontFamily: 'Lato',
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
								type={showPassword ? 'text' : 'password'}
								id='confirmPassword'
								autoComplete='new-password'
								onChange={(e) => setConfirmPassword(e.target.value)}
								error={!!passwordError}
								InputProps={{
									style: {
										padding: '0',
										fontFamily: 'Lato',
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
