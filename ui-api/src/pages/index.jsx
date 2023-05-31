import Head from 'next/head';
import styles from '@/styles/Home.module.scss';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import HomeButtons from '../components/HomeButtons.jsx';
import { toast } from 'react-toastify';
export default function Home() {
	const [canAccess, setCanAccess] = useState(false);

	useEffect(() => {
		reviewAccess();
	}, []);

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
					toast.info(
						'Your Session Has Started!, You Can Enter to the UPB Remote Solar Lab',
						{ autoClose: 10000 }
					);
					setCanAccess(true);
				} else {
					setCanAccess(false);
					toast.warn('Oops.! Your Session has not Started Yet', {
						autoClose: 10000,
					});
				}
			}
		} else {
			toast.warn('Oops.! You Dont have a Session, Book One!', {
				autoClose: 10000,
			});
		}
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
		</main>
	);
}
