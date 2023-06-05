import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useState, useEffect } from 'react';

export default function LineChart({ chartData, minimize, names }) {
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

	// create an event listener
	useEffect(() => {
		handleResize();
		window.addEventListener('resize', handleResize);
	}, []);
	if (isMobile || minimize) {
		return <Line data={data} options={mobileOptions}></Line>;
	} else {
		return <Line data={data} options={options}></Line>;
	}
}
