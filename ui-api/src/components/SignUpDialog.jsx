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
	const [studentCode, setStudentCode] = useState('');
	const [newStudent, setNewStudent] = useState({});

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
						studentCode: studentCode,
						fullname: fullname,
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
		const request = await fetch(`/api/students/read`, {
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
			setEmail(response.student.email);
			setFullname(response.student.fullname);
			setStudentCode(response.student.studentCode);
		}
	};

	const handleUpdate = async () => {
		const updateStudent = {
			email: email,
			studentCode: studentCode,
			fullname: fullname,
		};
		try {
			const response = await fetch(`/api/students/update`, {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify(updateStudent),
			});
			const student = await response.json();
			if (student.email) {
				setFullname(student.fullname);
				setStudentCode(student.studentCode);
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
					setStudentCode('');
				}
			})
			.catch((error) => {
				toast.info('Account Created, you can now Log In');
			});
	};
	const validateFields = () => {
		return password && email && fullname && studentCode;
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
								value={studentCode}
								onChange={(e) => setStudentCode(e.target.value)}
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
						</Grid>
					</Grid>
					{!session ? (
						<Box>
							{' '}
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
