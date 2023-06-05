import GoogleButton from './GoogleButton';
import {
	Box,
	Dialog,
	Divider,
	Grid,
	Link,
	TextField,
	Typography,
	Button,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

export default function SignUpDialog({ open, handleClose, onClickSignIn }) {
	const { data: session, status } = useSession();

	const [emailDisable, setEmailDisable] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [fullname, setFullname] = useState('');
	const [code, setcode] = useState('');

	const [passwordError, setPasswordError] = useState(false);
	useEffect(() => {
		if (session) {
			loadData();
		}
	}, []);

	const handleAuth = async () => {
		if (validateFields()) {
			if (password === confirmPassword) {
				setPasswordError(false);
				const response = await fetch(`/api/signUp`, {
					headers: {
						'Content-Type': 'application/json',
					},
					method: 'POST',
					body: JSON.stringify({
						email: email,
						password: password,
						code: code,
						fullname: fullname,
						isTeacher: true,
					}),
				});
				const data = await response.json();
				if (data.status) {
					await createSessionAuth();
				} else {
					toast.error(data.error);
				}
			} else {
				setPasswordError(true);
			}
		} else {
			toast.error('Missing Fields, Verify and Retry');
		}
	};
	const loadData = async () => {
		const request = await fetch(`/api/users/read`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({ email: session.user.email }),
		});
		const response = await request.json();
		if (!response.status) {
			toast.error('Something Went Wrong, Please Try Again');
		} else {
			setEmailDisable(true);
			setEmail(response.user.email);
			setFullname(response.user.fullname);
			setcode(response.user.code);
		}
	};

	const handleUpdate = async () => {
		const updateUser = {
			email: email,
			code: code,
			fullname: fullname,
		};
		try {
			const response = await fetch(`/api/users/update`, {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify(updateUser),
			});
			const user = await response.json();
			if (user.email) {
				setFullname(user.fullname);
				setcode(user.code);
				toast.success('Updated Successfully');
			} else {
				toast.error('Update Failed, Please Try Again Later');
			}
		} catch (error) {
			toast.error('Update Failed, Please Try Again Later');
		}
	};
	const createSessionAuth = async () => {
		signIn('credentials', { email: email, password: password, redirect: false })
			.then((response) => {
				if (response.ok) {
					toast.success('Welcome!');
					setEmail('');
					setPassword('');
					setConfirmPassword('');
					setFullname('');
					setcode('');
				}
			})
			.catch((error) => {
				toast.info('Account Created, You Can Now LogIn');
			});
	};
	const validateFields = () => {
		return password && email && fullname && code;
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
								autoComplete='email'
								value={email}
								disabled={emailDisable}
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
								autoComplete='fullname'
								value={fullname}
								onChange={(e) => setFullname(e.target.value)}
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
								value={code}
								onChange={(e) => setcode(e.target.value)}
								inputProps={{
									style: {
										padding: '8px',
										fontFamily: 'Lato',
									},
								}}
							/>
						</Grid>
					</Grid>
					{!session ? (
						<Box>
							<Grid item xxs={12} xs={12} my={{ xxs: 1, xs: 1, sm: 2 }}>
								<Typography variant='header3'>Password</Typography>
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
							<Grid item xxs={12} xs={12} my={{ xxs: 1, xs: 1, sm: 2 }}>
								<Typography variant='header3'>Confirm Password</Typography>
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
							</Grid>{' '}
						</Box>
					) : (
						<Grid
							item
							xxs={12}
							xs={12}
							mb={{ xxs: 2, xs: 2, sm: 3 }}
							mt={{ xxs: 2, xs: 3, s: 4, sm: 5 }}
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
					)}
				</Box>
			</Box>
		</Dialog>
	);
}
