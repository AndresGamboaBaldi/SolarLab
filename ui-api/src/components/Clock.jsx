import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
export default function Clock() {
	const [time, setTime] = useState(
		new Date()
			.toLocaleString(navigator.language, {
				hour: '2-digit',
				minute: '2-digit',
			})
			.replace(/(:\d{2}| [AP]M)$/, '')
	);
	const [timezone, setTimezone] = useState(
		Intl.DateTimeFormat().resolvedOptions().timeZone
	);
	useEffect(() => {
		const timer = setTimeout(() => {
			const datetime = new Date()
				.toLocaleString(navigator.language, {
					hour: '2-digit',
					minute: '2-digit',
				})
				.replace(/(:\d{2}| [AP]M)$/, '');
			setTime(datetime);
		}, 60000);

		return () => clearTimeout(timer);
	}, [time]);

	return (
		<Box>
			<Typography variant='titleDepartment' color='primary.700'>
				Local Time:
			</Typography>
			<Typography ml={1} variant='dataDepartment' color='blacky.main'>
				{time} {'   ('}
				{timezone}
				{')'}
			</Typography>
		</Box>
	);
}
