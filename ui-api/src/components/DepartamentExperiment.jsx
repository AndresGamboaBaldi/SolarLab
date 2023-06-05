import { Typography, Box, Grid, Button, Card, Slider } from '@mui/material';
import LineChart from './LineChart';

import React, { useState, useEffect } from 'react';
import CameraPlayer from '../components/CameraPlayer';

export default function DepartamentExperiment({ name, departmentData }) {
	const [angle, setAngle] = useState(0);
	const [voltage, setVoltage] = useState('');
	const [current, setCurrent] = useState('');
	const [radiation, setRadiation] = useState('');
	const [efficiencyTest, setEfficiencyTest] = useState([]);

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

	useEffect(() => {
		departmentData.forEach((department) => {
			if (department.departmentName === name) {
				setAngle(department.panelangle);
				setCurrent(department.current);
				setVoltage(department.voltage);
				setRadiation(department.radiation);
				setEfficiencyTest(department.efficiencyTest);
			}
		});
	}, []);
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
								{name}
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
										width: '240px',
										height: '240px',
										backgroundColor: 'black',
									}}
								>
									<CameraPlayer name={name}></CameraPlayer>
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
										value={angle}
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
									<LineChart
										names={[name]}
										chartData={[efficiencyTest]}
									></LineChart>
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
											{voltage} V
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
											{current} A
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
											{radiation} W/m2
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
