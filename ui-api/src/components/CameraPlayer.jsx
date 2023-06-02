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
		const answer = await response.json();
		if (answer.status) {
			toast.info(`${name} Camera Loading...`);
		} else {
			toast.error('An Error Ocurred Connecting with the Camera');
		}
	};

	const handlerPlayer = () => {
		if (name === 'Cochabamba') {
			const { JSMpeg } = require('../scripts/jsmpeg.min.js');
			new JSMpeg.Player(`ws://localhost:8888`, {
				canvas: streamRef.current,
				audio: false,
			});
		} else if (name === 'Santa Cruz') {
			const { JSMpeg } = require('../scripts/jsmpeg.min.js');
			new JSMpeg.Player(`ws://localhost:9999`, {
				canvas: streamRef.current,
				audio: false,
			});
		} else {
			const { JSMpeg } = require('../scripts/jsmpeg.min.js');
			new JSMpeg.Player(`ws://localhost:7777`, {
				canvas: streamRef.current,
				audio: false,
			});
		}
	};

	const streamRef = useRef(null);

	useEffect(() => {
		wakeUpStream();
		handlerPlayer();
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
