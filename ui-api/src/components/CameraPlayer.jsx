import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Box } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export default function StreamPlayer({ name }) {
	let player;

	const handlerPlayer = () => {
		if (name === 'Cochabamba') {
			const { JSMpeg } = require('../scripts/jsmpeg.min.js');
			player = new JSMpeg.Player(
				//envvariable
				`ws://192.168.124.82:8888`,
				{
					canvas: streamRef.current,
				}
			);
		} else if (name === 'Santa Cruz') {
			const { JSMpeg } = require('../scripts/jsmpeg.min.js');
			player = new JSMpeg.Player(
				//envvariable
				`ws://192.168.124.82:8888`,
				{
					canvas: streamRef.current,
				}
			);
		} else {
			const { JSMpeg } = require('../scripts/jsmpeg.min.js');
			player = new JSMpeg.Player(
				//envvariable
				`ws://192.168.124.82:8888`,
				{
					canvas: streamRef.current,
				}
			);
		}
	};

	const streamRef = useRef(null);

	useEffect(() => {
		handlerPlayer();
		return () => {
			player.destroy();
		};
	}, []);

	return (
		<Box maxWidth='100%'>
			<canvas
				ref={streamRef}
				id='stream-canvas'
				width='240px'
				height='264px'
			></canvas>
		</Box>
	);
}
