import { Typography, Box, Grid, Button, Card, Slider } from '@mui/material';
import { styled } from '@mui/material/styles';
import LineChart from './LineChart';
import { ChartData } from '@/data/mockData';
import { ChartData2 } from '@/data/mockData2';
import React, { useState, useEffect } from 'react';
import CameraPlayer from '../components/CameraPlayer';

export default function DepartamentExperiment() {
	const [angle, setAngle] = useState(45);

	const handleCloseAlert = (event, reason) => {
		setShowAlert(false);
	};
	const sendMqttMessage = async (action) => {
		const message = { action: action, angle: angle };
		const response = await fetch(`/api/mqtt`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify(message),
		});
		const data = await response.json();
	};

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
							md={4}
							lg={3}
							mb={{ xxs: 1, xs: 2, s: 2, sm: 2, md: 0 }}
						>
							<Grid
								item
								mb={{ xxs: 2, xs: 2, s: 2, sm: 2, md: 2 }}
								sx={{ display: 'flex' }}
								justifyContent='center'
							>
								<Box
									sx={{
										width: '216px',
										height: '216px',
										backgroundColor: 'black',
									}}
								>
									<CameraPlayer></CameraPlayer>
								</Box>
							</Grid>
							<Grid
								item
								textAlign='center'
								mb={{ xxs: 0, xs: 0, s: 0, sm: 1, md: 1 }}
							>
								<Typography
									variant='titleDepartment'
									color='primary.700'
									sx={{
										verticalAlign: 'middle',
									}}
								>
									Panel Angle:
								</Typography>
							</Grid>
							<Grid
								item
								sx={{ display: 'flex' }}
								justifyContent='center'
								mb={{ xxs: 0, xs: 0, s: 0, sm: 1, md: 1 }}
							>
								<Box width='70%'>
									<Slider
										size='medium'
										defaultValue={45}
										valueLabelDisplay='auto'
										onChange={(_, value) => setAngle(value)}
									/>
								</Box>
							</Grid>

							<Grid item textAlign='center'>
								<Button
									variant='contained'
									color='white'
									sx={{
										textTransform: 'none',
										border: 1,
										borderColor: 'primary.700',
										mr: 1,
									}}
									onClick={() => {
										sendMqttMessage('ANGLE');
									}}
								>
									<Typography
										variant='titleDepartment'
										color='primary.700'
										sx={{
											'&:hover': {
												color: '#fff',
											},
										}}
									>
										Move
									</Typography>
								</Button>
								<Button
									variant='contained'
									sx={{
										bgcolor: 'primary.700',
										textTransform: 'none',
									}}
									onClick={() => {
										sendMqttMessage('START');
									}}
								>
									<Typography
										sx={{
											mx: { xxs: 0, xs: 0, s: 1, sm: 1, md: 1, lg: 1 },
										}}
										variant='titleDepartment'
										color='white'
									>
										Start
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
							md={8}
							lg={9}
						>
							<Grid item xs mb={{ xxs: 1, xs: 2, s: 3, sm: 2 }}>
								<Box
									sx={{
										width: '79vw',
										'@media (min-width:900px)': {
											width: '55vw',
											height: '35vh',
										},
										'@media (min-width:1100px)': {
											width: '65vw',
											height: '35vh',
										},
										height: '23vh',
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
