import {
	Typography,
	Box,
	Paper,
	Grid,
	Button,
	Card,
	TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LineChart from './LineChart';
import { ChartData } from '@/data/mockData';
import { ChartData2 } from '@/data/mockData2';
import React, { useState } from 'react';

export default function DepartamentExperiment() {
	const Img = styled('img')({
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%',
	});

	const [data, setData] = useState({
		labels: ChartData.map((data) => data.voltage),
		datasets: [
			{
				label: 'Cochabamba',
				data: ChartData.map((data) => data.current),
				backgroundColor: ['#F6BD2B'],
				borderColor: '#F6BD2B',
				cubicInterpolationMode: 'monotone',
				borderWidth: 2,
			},
			{
				label: 'La Paz',
				data: ChartData2.map((data) => data.current),
				backgroundColor: ['#3E55A2'],
				borderColor: '#3E55A2',
				cubicInterpolationMode: 'monotone',
				borderWidth: 2,
			},
		],
	});

	return (
		<Box my={{ xxs: 2, xs: 2, s: 2, sm: 3 }}>
			<Card
				elevation={5}
				my={{ xxs: 2, xs: 3, s: 3, sm: 4 }}
				mx={{ xxs: 3, xs: 3, s: 4, sm: 5 }}
				sx={{
					height: '100%',
					width: 'auto',
				}}
			>
				<Box
					my={{ xxs: 2, xs: 3, s: 3, sm: 4 }}
					mx={{ xxs: 3, xs: 3, s: 4, sm: 5 }}
				>
					<Grid container>
						<Grid item xxs={12} xs={12} mb={{ xxs: 1, xs: 2, s: 3, sm: 3 }}>
							<Typography variant='header1' color='blacky.main'>
								Cochabamba
							</Typography>
						</Grid>
						<Grid
							item
							container
							direction='column'
							xs={12}
							s={12}
							sm={12}
							md='auto'
							lg='auto'
							mb={{ xxs: 1, xs: 2, s: 2, sm: 1, md: 0 }}
							mr={{ xxs: 0, xs: 0, s: 0, sm: 0, md: 3 }}
						>
							<Grid item mb={{ xxs: 1, xs: 1, s: 2, sm: 2 }}>
								<Img
									alt='complex'
									src='/solarpanelarm.jpeg'
									sx={{
										width: '50vw',
										'@media (min-width:900px)': {
											width: '35vh',
											height: '35vh',
										},
										height: '50vw',
										borderRadius: '16px',
										overflow: 'hidden',
									}}
								/>
							</Grid>
							<Grid item mb={2} textAlign='center'>
								<Typography
									mr={1}
									variant='titleDepartment'
									color='primary.700'
									sx={{
										display: 'inline-block',
										verticalAlign: 'middle',
									}}
								>
									Panel Angle:
								</Typography>
								<TextField
									sx={{
										display: 'inline-block',
										verticalAlign: 'middle',
										width: '10vw',
										'@media (min-width:900px)': {
											width: '10vh',
										},
									}}
									inputProps={{
										inputMode: 'numeric',
										pattern: '[0-9]*',
										style: {
											padding: '6px',
											fontFamily: 'Lato',
											textAlign: 'center',
										},
									}}
									variant='outlined'
									size='small'
									color='secondary'
									focused
									value='45'
								/>
							</Grid>
							<Grid
								item
								textAlign='center'
								mb={{ xxs: 1, xs: 1, s: 1, sm: 1, md: 0 }}
							>
								<Button
									variant='contained'
									sx={{
										bgcolor: 'primary.700',
										py: 0,
										textTransform: 'none',
									}}
								>
									<Typography
										sx={{
											mx: { xxs: 0, xs: 0, s: 1, sm: 2, md: 3 },
										}}
										variant='buttons2'
										color='white'
									>
										UP
									</Typography>
								</Button>
								<Button
									variant='contained'
									sx={{
										bgcolor: 'primary.700',
										py: 0,
										textTransform: 'none',
										mx: { xxs: 0, xs: 1, s: 1, sm: 2, md: 2 },
									}}
								>
									<Typography
										sx={{
											mx: { xxs: 0, xs: 0, s: 1, sm: 1, md: 2 },
										}}
										variant='buttons2'
										color='white'
									>
										DOWN
									</Typography>
								</Button>
								<Button
									variant='contained'
									sx={{
										bgcolor: 'primary.700',
										py: 0,
										textTransform: 'none',
									}}
								>
									<Typography
										sx={{
											mx: { xxs: 0, xs: 0, s: 1, sm: 1, md: 2 },
										}}
										variant='buttons2'
										color='white'
									>
										OFF
									</Typography>
								</Button>
							</Grid>
						</Grid>
						<Grid
							item
							container
							direction='column'
							xs={12}
							s={12}
							sm={12}
							md
							lg
						>
							<Grid item xs mb={{ xxs: 1, xs: 2, s: 3, sm: 2 }}>
								<Box
									sx={{
										height: '35vh',
										width: '95%',
									}}
								>
									<LineChart chartData={data}></LineChart>
								</Box>
							</Grid>
							<Grid item>
								<Grid container columnSpacing={1} rowSpacing={1}>
									<Grid item xxs={6} sm={4}>
										<Typography variant='titleDepartment' color='primary.700'>
											Voltage:
										</Typography>
										<Typography
											ml={1}
											variant='dataDepartment'
											color='blacky.main'
										>
											15 V
										</Typography>
									</Grid>
									<Grid item xxs={6} sm={4}>
										<Typography variant='titleDepartment' color='primary.700'>
											Current:
										</Typography>
										<Typography
											ml={1}
											variant='dataDepartment'
											color='blacky.main'
										>
											10 A
										</Typography>
									</Grid>
									<Grid item xxs={12} sm={4}>
										<Typography variant='titleDepartment' color='primary.700'>
											Radiation:
										</Typography>
										<Typography
											ml={1}
											variant='dataDepartment'
											color='blacky.main'
										>
											2 W/m2
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</Card>
		</Box>
	);
}
