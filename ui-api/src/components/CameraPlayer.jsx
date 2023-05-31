import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';
export default function StreamPlayer({ name }) {
	const wakeUpStream = async () => {
		const message = { name: name };
		const response = await fetch(`/api/camera`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify(message),
		});
		if (response.status) {
		} else {
			toast.error('An Error Ocurred Connecting with the Camera');
		}
	};

	const streamRef = useRef(null);

	useEffect(() => {
		wakeUpStream();

		const { JSMpeg } = require('../scripts/jsmpeg.min.js');
		new JSMpeg.Player('ws://localhost:8888', {
			canvas: streamRef.current,
		});
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
