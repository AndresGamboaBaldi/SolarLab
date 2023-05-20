import Head from 'next/head';
import styles from '@/styles/Home.module.scss';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import HomeButtons from '../components/HomeButtons.jsx';
import Alert from '../components/Alert.jsx';
export default function Home() {
	const [canAccess, setCanAccess] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [statusAlert, setStatusAlert] = useState('success');
	const [messageAlert, setMessageAlert] = useState('');
	const [initialState, setInitialState] = useState('first');

	useEffect(() => {
		reviewAccess();
	}, [initialState]);

	const reviewAccess = async () => {
		const urlParams = new URLSearchParams(window.location.search);
		const accessKey = urlParams.get('access_key');
		if (accessKey != null) {
			if (accessKey === 'admin') {
				setCanAccess(true);
			} else {
				const pwd = urlParams.get('pwd');
				const message = { access_key: accessKey, pwd: pwd };
				const response = await fetch(`/api/booking`, {
					headers: {
						'Content-Type': 'application/json',
					},
					method: 'POST',
					body: JSON.stringify(message),
				});
				const data = await response.json();
				if (data.status) {
					setStatusAlert('info');
					setMessageAlert(
						'Your Session Has Started, Click the Button to Enter the UPB Remote Solar Lab'
					);
					setShowAlert(true);
					setCanAccess(true);
				} else {
					setCanAccess(false);
					setMessageAlert(
						'Oops... Your Session has not Started, come back to the right time'
					);
					setShowAlert(true);
					setStatusAlert('warning');
				}
			}
		} else {
			setMessageAlert(
				'Oops... You dont have a Session, Book one and Click the Link to the Enter UPB Solar Remote Lab'
			);
			setShowAlert(true);
			setStatusAlert('warning');
		}
	};

	const handleCloseAlert = (event, reason) => {
		setShowAlert(false);
	};

	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<Head>
					<title>UPB Solar Remote Lab</title>
					<meta
						name='description'
						content='Remote Laboratory for Solar Energy'
					/>
					<link rel='icon' href='/logoYellow.png' />
				</Head>
			</div>

			<Card
				sx={{
					height: '100vh',
					width: '100%',
					borderRadius: 0,
				}}
			>
				<CardContent sx={{ p: 0, m: 0, borderRadius: 0 }}>
					<div
						style={{
							position: 'relative',
						}}
					>
						<CardMedia
							sx={{
								height: '100vh',
								width: '100%',
							}}
							component='img'
							image='/solarpanelwp.jpeg'
							alt='solar panel wps'
						/>
						<div
							style={{
								position: 'absolute',
								color: 'white',
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, -50%)',
								width: 'max-content',
							}}
						>
							<Typography variant='headerHome' color='primary.800'>
								Welcome to{' '}
							</Typography>
							<Typography variant='headerHome' color='secondary.main'>
								UPB{' '}
							</Typography>
							<Typography variant='headerHome'>Solar Remote Lab</Typography>

							<HomeButtons></HomeButtons>
						</div>
					</div>
				</CardContent>
			</Card>
			<Alert
				open={showAlert}
				handleClose={handleCloseAlert}
				status={statusAlert}
				message={messageAlert}
			/>
		</main>
	);
}
