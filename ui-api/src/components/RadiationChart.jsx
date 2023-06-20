import { Line } from 'react-chartjs-2';
import { Typography, Box, Grid } from '@mui/material';
import { Chart as ChartJS } from 'chart.js/auto';
import { useState, useEffect, use } from 'react';

export default function RadiationChart({ title, city }) {
	const [loadedData, setLoadedData] = useState(false);
	const [chartData, setChartData] = useState([]);

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		const date = new Date().toLocaleString(navigator.language).split(',')[0];
		const request = await fetch(`/api/radiation/read`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({ date: '6/05/2023' }),
		});
		const response = await request.json();
		if (response.status) {
			setChartData({
				labels: getLabels([response.data]),
				datasets: getDatasets([response.data]),
			});
			setLoadedData(true);
		} else {
			toast.error('Something Went Wrong, Please Try Again');
		}
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
		},
		scales: {
			x: {
				grid: {
					display: false,
				},
			},
			y: {
				grid: {
					display: false,
				},
			},
		},
	};

	const getDatasets = (data) => {
		var datasets = [];
		for (let i = 0; i < data.length; i++) {
			if (data[i].length > 0) {
				const dataset = {
					label: 'Radiation',
					data: data[i].map((data) => data.radiation),
					backgroundColor: '#000000',
					borderColor: '#000000',
					cubicInterpolationMode: 'monotone',
					pointStyle: 'circle',
					borderWidth: 1,
					pointRadius: 2,
					pointHoverRadius: 5,
				};
				datasets.push(dataset);
			}
		}
		return datasets;
	};

	const getLabels = (data) => {
		if (data[0].length > 0) {
			return data[0].map((data) => data.time);
		} else {
			return [];
		}
	};

	return (
		<Box
			sx={{
				width: '25vh',
				height: '25vh',
				'@media (min-width:300px)': {
					width: '30vh',
					height: '30vh',
				},
				'@media (min-width:400px)': {
					width: '35vh',
					height: '35vh',
				},
				'@media (min-width:570px)': {
					width: '40vh',
					height: '40vh',
				},
			}}
			m={{ xxs: 2, xs: 3, s: 3, sm: 4 }}
		>
			<Grid container justify='center' rowSpacing={1}>
				<Grid
					item
					xxs={12}
					xs={12}
					ml={2}
					sx={{
						display: 'flex',
						alignItems: 'center',
					}}
					justifyContent='center'
				>
					<Typography variant='titleDepartment' color='secondary.main'>
						{title}
					</Typography>
				</Grid>
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
							width: '23vh',
							height: '18vh',
							'@media (min-width:300px)': {
								width: '28vh',
								height: '22vh',
							},
							'@media (min-width:400px)': {
								width: '33vh',
								height: '26vh',
							},
							'@media (min-width:570px)': {
								width: '38vh',
								height: '32vh',
							},
						}}
					>
						{loadedData ? (
							<Line data={chartData} options={options}></Line>
						) : null}
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
					<Typography variant='body3' color='blacky.main'>
						X: Time (HH:MM)
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
					<Typography variant='body3' color='blacky.main'>
						Y: Radiation (W/m2)
					</Typography>
				</Grid>
			</Grid>
		</Box>
	);
}
