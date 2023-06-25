import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useState, useEffect } from 'react';
import { Typography, Box, Grid } from '@mui/material';

export default function LineChart({ chartData, minimize, names }) {
	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'bottom',
			},
		},
		scales: {
			y: {
				min: 0,
				max: 12,
			},
		},
	};

	const getColor = (name) => {
		var color;
		if (name === 'Cochabamba') {
			color = '#F6BD2B';
		} else if (name === 'La Paz') {
			color = '#3E55A2';
		} else {
			color = '#1E4B09';
		}
		return color;
	};

	const getDatasets = () => {
		var datasets = [];
		for (let i = 0; i < chartData.length; i++) {
			if (chartData[i].length > 0) {
				const dataset = {
					label: names[i],
					data: chartData[i].map((data) => data.current),
					backgroundColor: [getColor(names[i])],
					borderColor: getColor(names[i]),
					cubicInterpolationMode: 'monotone',
					borderWidth: 2,
				};
				datasets.push(dataset);
			}
		}
		return datasets;
	};

	const getLabels = () => {
		if (chartData[0].length > 0) {
			return chartData[0].map((data) => data.voltage);
		} else {
			return [];
		}
	};

	const data = {
		labels: getLabels(),
		datasets: getDatasets(),
	};

	return (
		<Grid container justify='center'>
			<Grid
				item
				xxs={12}
				xs={12}
				sx={{
					display: 'flex',
					alignItems: 'center',
				}}
				justifyContent='center'
			>
				<Box
					sx={{
						width: '100%',
						'@media (min-width:900px)': {
							height: '32vh',
						},
						'@media (min-width:1100px)': {
							height: '32vh',
						},
						height: '23vh',
					}}
				>
					<Line data={data} options={options}></Line>
				</Box>
			</Grid>
			<Grid
				item
				xxs={6}
				xs={6}
				sx={{
					display: 'flex',
				}}
				justifyContent='center'
			>
				<Typography variant='header3' color='blacky.main'>
					X: Voltage (V)
				</Typography>
			</Grid>
			<Grid
				item
				xxs={6}
				xs={6}
				sx={{
					display: 'flex',
				}}
				justifyContent='center'
			>
				<Typography variant='header3' color='blacky.main'>
					Y: Current (A)
				</Typography>
			</Grid>
		</Grid>
	);
}
