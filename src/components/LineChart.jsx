import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { Typography, Box } from '@mui/material';

export default function LineChart({ chartData }) {
	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'bottom',
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: 'Voltage (V)',
					font: {
						family: 'Lato',
						size: 10,
						style: 'normal',
						lineHeight: 1.2,
						weight: 'bold',
					},
					padding: { top: 5, left: 0, right: 0, bottom: 0 },
				},
			},
			y: {
				title: {
					display: true,
					text: 'Current (A)',
					font: {
						family: 'Lato',
						size: 10,
						style: 'normal',
						lineHeight: 1.2,
						weight: 'bold',
					},
					padding: { top: 15, left: 0, right: 0, bottom: 0 },
				},
				min: 0,
				max: 12,
			},
		},
	};

	return <Line data={chartData} options={options}></Line>;
}
