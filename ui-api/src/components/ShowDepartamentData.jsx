import { Grid, Typography, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const gridDataStyle = {
	display: 'inline-block',
	verticalAlign: 'middle',
	lineHeight: 'normal',
};

const progressBarStyle = {
	width: '95%',
	'@media (min-width:500px)': {
		width: '65%',
	},
	'@media (min-width:700px)': {
		width: '55%',
	},
	'@media (min-width:1100px)': {
		width: '45%',
	},
	'@media (min-width:1300px)': {
		width: '35%',
	},
};

export default function ShowDepartamentData({ departmentData, name }) {
	const [angle, setAngle] = useState(0);
	const [voltage, setVoltage] = useState(0);
	const [current, setCurrent] = useState(0);
	const [radiation, setRadiation] = useState(0);

	const [power, setPower] = useState(100);
	const [uvaRadiation, setUvaRadiation] = useState(200);
	const [time, setTime] = useState('');
	const [date, setDate] = useState('');
	const [timezone, setTimezone] = useState(
		Intl.DateTimeFormat().resolvedOptions().timeZone
	);
	useEffect(() => {
		departmentData.forEach((department) => {
			if (department.departmentName === name) {
				setAngle(department.panelangle);
				setCurrent(department.current);
				setVoltage(department.voltage);
				setRadiation(department.radiation);
				setDate(department.experimentDate);
				setTime(department.experimentTime);
				setTimezone(department.timeZone);
			}
		});
	}, []);
	return (
		<Grid
			container
			rowSpacing={{ xxs: 1, xs: 2, s: 3, sm: 3 }}
			columnSpacing={2}
		>
			<Grid item xxs={12} xs={12} mb={{ xxs: 1, xs: 1, sm: 1 }}>
				<Typography variant='header2' color='blacky.main'>
					{name}
				</Typography>
			</Grid>

			<Grid item xxs={4} xs={4} s={4}>
				<Box sx={progressBarStyle}>
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
			<Grid item xxs={4} xs={4} s={4}>
				<Box sx={progressBarStyle}>
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
			<Grid item xxs={4} xs={4} s={4} mb={{ xxs: 1, xs: 1, sm: 2 }}>
				<Box sx={progressBarStyle}>
					<CircularProgressbar
						value={power}
						text={`${power}W`}
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
						maxValue={200}
					/>
				</Box>
				<Typography variant='titleDialog' color='primary.700'>
					Power
				</Typography>
			</Grid>
			<Grid item xxs={12} xs={12} s={12} sm={6} md={4} sx={{ gridDataStyle }}>
				<Typography variant='titleDialog' color='primary.700'>
					UVA Radiation:
				</Typography>
				<Typography
					ml={{ xxs: 1, xs: 1, sm: 2 }}
					variant='dataDialog'
					color='blacky.main'
				>
					{uvaRadiation} W/m2
				</Typography>
			</Grid>
			<Grid item xxs={12} xs={12} s={12} sm={6} md={4} sx={{ gridDataStyle }}>
				<Typography variant='titleDialog' color='primary.700'>
					Radiation:
				</Typography>
				<Typography
					ml={{ xxs: 1, xs: 1, sm: 2 }}
					variant='dataDialog'
					color='blacky.main'
				>
					{radiation} W/m2
				</Typography>
			</Grid>
			<Grid item xxs={12} xs={12} s={12} sm={12} md={4} sx={{ gridDataStyle }}>
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
		</Grid>
	);
}
