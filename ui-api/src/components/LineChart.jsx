import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useState, useEffect } from 'react';

export default function LineChart({ chartData, minimize }) {
	const [isMobile, setIsMobile] = useState(false);
	//choose the screen size
	const handleResize = () => {
		if (window.innerWidth < 900) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	};
	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'right',
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: 'Voltage (V)',
					font: {
						family: 'Lato',
						size: 20,
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
						size: 20,
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
	const mobileOptions = {
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

	// create an event listener
	useEffect(() => {
		handleResize();
		window.addEventListener('resize', handleResize);
	}, []);
	if (isMobile || minimize) {
		return <Line data={chartData} options={mobileOptions}></Line>;
	} else {
		return <Line data={chartData} options={options}></Line>;
	}
}
