import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Box } from '@mui/material';
import Alert from './Alert';

export default function StreamPlayer() {
	const [first, setFirst] = useState(true);
	const wakeUpStream = async (action) => {
		const response = await fetch(`/api/camera`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'GET',
		});
		if (response.status) {
		} else {
			setStatusAlert('error');
			setMessageAlert('An Error Ocurred Connecting with the Camera');
			setShowAlert(true);
		}
	};

	const streamRef = useRef(null);

	useEffect(() => {
		if (first) {
			wakeUpStream();
		}
		const { JSMpeg } = require('../scripts/jsmpeg.min.js');
		new JSMpeg.Player('ws://localhost:9999', {
			canvas: streamRef.current,
		});
		setFirst(false);
	}, []);

	return (
		<Box>
			<canvas
				ref={streamRef}
				id='stream-canvas'
				width='216px'
				height='216px'
			></canvas>
		</Box>
	);
}
