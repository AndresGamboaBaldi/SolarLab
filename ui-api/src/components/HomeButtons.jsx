import { Box, Typography, Button } from '@mui/material';
import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { login } from '../utils/login.js';
import Link from '@mui/material/Link';

export default function HomeButtons() {
	const { user, setUser } = useContext(UserContext);

	const handleSignIn = async (event) => {
		const newUser = await login();
		setUser(newUser);
	};

	return (
		<Box
			sx={{
				mt: { xxs: 2, xs: 3, s: 3, sm: 4, md: 6, lg: 7 },
			}}
		>
			<Button
				variant='contained'
				sx={{
					textTransform: 'none',
					bgcolor: 'primary.700',
					mr: { xxs: 1, xs: 2, s: 3, sm: 5, md: 7, lg: 7 },
				}}
			>
				<Link
					color='white.main'
					variant='buttonsHome'
					underline='none'
					sx={{
						mx: { xxs: 0, xs: 1, s: 3, sm: 4, md: 4, lg: 5 },
					}}
					href='/experiments'
				>
					I Have a Session Now
				</Link>
			</Button>
			<Button
				variant='contained'
				sx={{
					bgcolor: 'white.main',
					border: 1,
					textTransform: 'none',
					borderColor: 'primary.700',
				}}
			>
				<Typography
					sx={{
						mx: { xxs: 0, xs: 1, s: 3, sm: 4, md: 4, lg: 5 },
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
