import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
const gridDataStyle = {
	display: 'inline-block',
	verticalAlign: 'middle',
	lineHeight: 'normal',
};

export default function DepartmentDataDialog({ departmentData, name }) {
	const [angle, setAngle] = useState(0);
	const [voltage, setVoltage] = useState(0);
	const [current, setCurrent] = useState(0);
	const [radiation, setRadiation] = useState(0);
	const [date, setDate] = useState(0);
	const [time, setTime] = useState(0);
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
			<Grid item xxs={12} xs={12} mt={{ xxs: 1, xs: 1, sm: 2 }}>
				<Typography variant='titleDialog' color='secondary.main'>
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
				xxs={6}
				xs={6}
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
			<Grid
				item
				xxs={6}
				xs={6}
				s={4}
				sx={{ gridDataStyle }}
				mt={{ xxs: 1, xs: 1, sm: 2 }}
			>
				<Typography variant='titleDialog' color='primary.700'>
					Voltage:
				</Typography>
				<Typography
					ml={{ xxs: 1, xs: 1, sm: 2 }}
					variant='dataDialog'
					color='blacky.main'
				>
					{voltage} V
				</Typography>
			</Grid>
			<Grid
				item
				xxs={6}
				xs={6}
				s={4}
				sx={{ gridDataStyle }}
				mt={{ xxs: 1, xs: 1, sm: 2 }}
			>
				<Typography variant='titleDialog' color='primary.700'>
					Current:
				</Typography>
				<Typography
					ml={{ xxs: 1, xs: 1, sm: 1 }}
					variant='dataDialog'
					color='blacky.main'
				>
					{current} A
				</Typography>
			</Grid>
			<Grid
				item
				sx={{ gridDataStyle }}
				xxs={6}
				xs={6}
				s={4}
				mt={{ xxs: 1, xs: 1, sm: 2 }}
			>
				<Typography variant='titleDialog' color='primary.700'>
					Radiation:
				</Typography>
				<Typography
					ml={{ xxs: 1, xs: 1, sm: 1 }}
					variant='body3'
					color='blacky.main'
				>
					{radiation} W/m2
				</Typography>
			</Grid>
		</Grid>
	);
}
