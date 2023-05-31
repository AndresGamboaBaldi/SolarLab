import Head from 'next/head';
import styles from '@/styles/Home.module.scss';
import React, { useEffect, useState } from 'react';
import {
	Card,
	CardContent,
	CardMedia,
	Box,
	Typography,
	Button,
} from '@mui/material';
import { toast } from 'react-toastify';
import Link from 'next/link';
export default function Home() {
	useEffect(() => {
		reviewAccess();
	}, []);

	const reviewAccess = async () => {
		const urlParams = new URLSearchParams(window.location.search);
		const accessKey = urlParams.get('access_key');
		if (accessKey != null) {
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
				window.localStorage.setItem('SESSION_DATA', JSON.stringify(data.data));
			} else {
				toast.warn('Oops.! Your Session has not Started Yet', {
					autoClose: 10000,
				});
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

							<Box
								sx={{
									mt: { xxs: 2, xs: 3, s: 3, sm: 4, md: 6, lg: 7 },
								}}
							>
								<Button
									variant='contained'
									sx={{
										textTransform: 'none',
										bgcolor: 'primary.700',
										mr: { xxs: 2, xs: 3, s: 4, sm: 6, md: 8, lg: 9 },
									}}
								>
									<Link
										href={{ pathname: '/laboratory' }}
										style={{ textDecoration: 'none' }}
									>
										<Typography
											sx={{
												mx: { xxs: 0, xs: 1, s: 3, sm: 4, md: 4, lg: 5 },
											}}
											variant='buttonsHome'
											color='white.main'
										>
											Enter To Remote Lab
										</Typography>
									</Link>
								</Button>
								<Button
									variant='contained'
									sx={{
										bgcolor: 'white.main',
										border: 1,
										textTransform: 'none',
										borderColor: 'primary.700',
									}}
								>
									<Typography
										sx={{
											mx: { xxs: 1, xs: 2, s: 4, sm: 5, md: 6, lg: 7 },
											'&:hover': {
												color: '#fff',
											},
										}}
										variant='buttonsHome'
										color='primary.700'
										onClick={(e) =>
											(window.location.href =
												'https://eubbc-digital.upb.edu/booking/booking/24')
										}
									>
										Book a Session
									</Typography>
								</Button>
							</Box>
						</div>
					</div>
				</CardContent>
			</Card>
		</main>
	);
}
