import { Box, Typography, Button } from '@mui/material';
import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { login } from '../utils/login.js';

export default function HomeButtons() {
	const { user, setUser } = useContext(UserContext);

	const handleSignIn = async (event) => {
		const newUser = await login();
		setUser(newUser);
	};

	return (
		<Box
			sx={{
				mt: { xxs: 2, xs: 3, sm: 4, md: 6, lg: 7 },
			}}
		>
			<Button
				variant='contained'
				sx={{
					textTransform: 'none',
					bgcolor: 'primary.700',
					mr: { xxs: 1, xs: 2, sm: 9, md: 7, lg: 7 },
				}}
			>
				<Typography
					variant='buttonsHome'
					sx={{
						mx: { xxs: 0, xs: 1, sm: 3, md: 4, lg: 5 },
					}}
				>
					I Have a Session Now
				</Typography>
			</Button>
			<Button
				variant='contained'
				sx={{
					bgcolor: 'white.main',
					textTransform: 'none',
				}}
			>
				<Typography
					sx={{
						mx: { xxs: 0, xs: 1, sm: 3, md: 4, lg: 5 },
					}}
					variant='buttonsHome'
					color='primary.700'
				>
					Schedule a Session
				</Typography>
			</Button>
		</Box>
	);
}
