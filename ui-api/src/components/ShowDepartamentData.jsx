import { Grid, Typography, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const gridDataStyle = {
	display: 'inline-block',
	verticalAlign: 'middle',
	lineHeight: 'normal',
};

export default function ShowDepartamentData({ departmentData, name }) {
	const [angle, setAngle] = useState(0);
	const [voltage, setVoltage] = useState(0);
	const [current, setCurrent] = useState(0);
	const [radiation, setRadiation] = useState(0);
	const [date, setDate] = useState(0);
	const [time, setTime] = useState(0);
	const [percentage, setPercentage] = useState(45);
	useEffect(() => {
		departmentData.forEach((department) => {
			if (department.departmentName === name) {
				setAngle(department.panelangle);
				setCurrent(department.current);
				setVoltage(department.voltage);
				setRadiation(department.radiation);
			}
		});
		const datetime = new Date().toLocaleString();
		setDate(datetime.split(',')[0]);
		setTime(datetime.split(',')[1].split(' ')[1]);
	}, []);
	return (
		<Grid container>
			<Grid
				item
				xxs={12}
				xs={12}
				mt={{ xxs: 1, xs: 2, sm: 1 }}
				mb={{ xxs: 1, xs: 1, sm: 1 }}
			>
				<Typography variant='header12' color='blacky.main'>
					{name}
				</Typography>
			</Grid>
			<Grid
				item
				xxs={6}
				xs={6}
				s={4}
				mt={{ xxs: 1, xs: 1, sm: 2 }}
				sx={{ gridDataStyle }}
			>
				<Typography variant='titleDialog' color='primary.700'>
					Date:
				</Typography>
				<Typography
					ml={{ xxs: 1, xs: 1, sm: 2 }}
					variant='dataDialog'
					color='blacky.main'
				>
					{date}
				</Typography>
			</Grid>
			<Grid
				item
				xxs={6}
				xs={6}
				s={4}
				mt={{ xxs: 1, xs: 1, sm: 2 }}
				sx={{ gridDataStyle }}
			>
				<Typography variant='titleDialog' color='primary.700'>
					Time:
				</Typography>
				<Typography
					ml={{ xxs: 1, xs: 1, sm: 2 }}
					variant='dataDialog'
					color='blacky.main'
				>
					{time}
				</Typography>
			</Grid>
			<Grid
				item
				xxs={12}
				xs={12}
				s={4}
				sx={{ gridDataStyle }}
				mt={{ xxs: 1, xs: 1, sm: 2 }}
			>
				<Typography variant='titleDialog' color='primary.700'>
					Panel Angle:
				</Typography>
				<Typography
					ml={{ xxs: 1, xs: 1, sm: 1 }}
					variant='dataDialog'
					color='blacky.main'
				>
					{angle} °
				</Typography>
			</Grid>

			<Grid item xxs={4} xs={4} s={4} mt={{ xxs: 1, xs: 1, sm: 2 }}>
				<Box
					sx={{
						width: '60%',
						'@media (min-width:1100px)': {
							width: '50%',
						},
						'@media (min-width:1300px)': {
							width: '40%',
						},
					}}
				>
					<CircularProgressbar
						value={voltage}
						text={`${voltage}V`}
						circleRatio={0.7}
						styles={buildStyles({
							rotation: 0.65,
							strokeLinecap: 'butt',
							textSize: '16px',
							pathTransitionDuration: 2,
							// Colors
							pathColor: '#A00000',
							textColor: '#000000',
							trailColor: '#d6d6d6',
							backgroundColor: '#FFF',
						})}
						maxValue={30}
					/>
				</Box>
				<Typography variant='titleDialog' color='primary.700'>
					Voltage
				</Typography>
			</Grid>
			<Grid item xxs={4} xs={4} s={4} mt={{ xxs: 1, xs: 1, sm: 2 }}>
				<Box
					sx={{
						width: '60%',
						'@media (min-width:1100px)': {
							width: '50%',
						},
						'@media (min-width:1300px)': {
							width: '40%',
						},
					}}
				>
					<CircularProgressbar
						value={current}
						text={`${current}A`}
						circleRatio={0.7}
						styles={buildStyles({
							rotation: 0.65,
							strokeLinecap: 'butt',
							textSize: '16px',
							pathTransitionDuration: 2,
							// Colors
							pathColor: '#000000',
							textColor: '#000000',
							trailColor: '#d6d6d6',
							backgroundColor: '#FFF',
						})}
						maxValue={6}
					/>
				</Box>
				<Typography variant='titleDialog' color='primary.700'>
					Current
				</Typography>
			</Grid>
			<Grid
				item
				xxs={4}
				xs={4}
				s={4}
				mt={{ xxs: 1, xs: 1, sm: 2 }}
				mb={{ xxs: 1, xs: 1, sm: 2 }}
			>
				<Box
					sx={{
						width: '60%',
						'@media (min-width:1100px)': {
							width: '50%',
						},
						'@media (min-width:1300px)': {
							width: '40%',
						},
					}}
				>
					<CircularProgressbar
						value={radiation}
						text={`${radiation}W/m2`}
						circleRatio={0.7}
						styles={buildStyles({
							rotation: 0.65,
							strokeLinecap: 'butt',
							textSize: '16px',
							pathTransitionDuration: 2,
							// Colors
							pathColor: '#F6BD2B',
							textColor: '#000000',
							trailColor: '#d6d6d6',
							backgroundColor: '#FFF',
						})}
						maxValue={6}
					/>
				</Box>
				<Typography variant='titleDialog' color='primary.700'>
					Radiation
				</Typography>
			</Grid>
		</Grid>
	);
}
