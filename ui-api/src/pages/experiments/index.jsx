import CitiesTypography from '../../components/CitiesTypography';
import CitiesCheckboxes from '../../components/CitiesCheckboxes';
import CitiesSelect from '../../components/CitiesSelect';
import ExperimentButtons from '../../components/ExperimentButtons';
import DepartamentExperiment from '../../components/DepartamentExperiment';
import { Box, Typography, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import RingLoader from 'react-spinners/RingLoader';

export default function Experiments() {
	const [canAccess, setCanAccess] = useState(false);
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState('Loading Session Info...');
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
					setLoading(false);
					setCanAccess(true);
				} else {
					setLoading(false);
					setCanAccess(false);
					setMessage('Oops... Your Session not started, come back later');
				}
			}
		} else {
			setLoading(false);
			setMessage(
				'Oops... Invalid Sesion, Click the link provided by Booking UPB'
			);
		}
	};

	return (
		<main>
			<div>
				<Head>
					<title>UPB Solar Remote Lab</title>
					<meta
						name='description'
						content='Remote Laboratory for Solar Energy'
					/>
					<link rel='icon' href='/logoYellow.png' />
				</Head>
			</div>
			{canAccess ? (
				<Box
					mt={{ xxs: 10, xs: 10, s: 10, sm: 12 }}
					px={{ xxs: 2, xs: 2, s: 4, sm: 6 }}
				>
					<Grid container>
						<Grid
							item
							sx={{
								display: 'flex',
								alignItems: 'center',
							}}
							xxs={12}
							xs={12}
							sm={5}
							md={3}
							mb={{ xxs: 2, xs: 2, s: 2, sm: 0, md: 0 }}
							justifyContent='flex-end'
							order={{ xxs: 1, xs: 1, s: 1, sm: 2 }}
						>
							<Typography variant='buttonsExperiments' color='primary.700'>
								Remaining Time:
							</Typography>
							<Typography
								ml={{ xxs: 1, xs: 1, s: 2, sm: 1 }}
								variant='buttonsExperiments'
								color='blacky.main'
							>
								10:32
							</Typography>
						</Grid>
						<Grid
							item
							sx={{
								display: 'flex',
								alignItems: 'center',
							}}
							xxs={12}
							xs={12}
							sm={7}
							md={9}
							order={{ xxs: 2, xs: 2, s: 2, sm: 1 }}
						>
							<CitiesTypography></CitiesTypography>
							<CitiesCheckboxes></CitiesCheckboxes>
							<CitiesSelect></CitiesSelect>
						</Grid>
					</Grid>
					<DepartamentExperiment></DepartamentExperiment>
					<ExperimentButtons></ExperimentButtons>
				</Box>
			) : (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						width: '100%',
						height: '100vh',
					}}
				>
					<Grid container rowSpacing={3}>
						<Grid item xxs={12} align='center'>
							<RingLoader size={96} color={'#F6BD2B'} loading={loading} />
						</Grid>
						<Grid item xxs={12} align='center'>
							<Typography variant='buttonsExperiments' color='black'>
								{message}
							</Typography>
						</Grid>
					</Grid>
				</Box>
			)}
		</main>
	);
}
