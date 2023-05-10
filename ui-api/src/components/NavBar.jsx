import { AppBar, Box, Toolbar, Link } from '@mui/material';
import Image from 'next/image';
import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

import UserButtons from '../components/UserButtonsNavBar';
import UserMenu from '../components/UserMenu';

export default function NavBar() {
	const { user, setUser } = useContext(UserContext);

	return (
		<Box>
			<AppBar position='fixed' sx={{ bgcolor: 'primary.700' }}>
				<Toolbar sx={{ px: { xxs: 2, xs: 2, s: 4, sm: 6 } }}>
					<Image
						src='/logoYellow.png'
						alt='Upb Logo White'
						width={32}
						height={32}
					/>

					<Link
						color='white.main'
						variant='header2'
						underline='none'
						sx={{
							flexGrow: 1,
						}}
						ml={{ xxs: 1, xs: 1, sm: 3 }}
						href='/'
					>
						Solar Remote Lab
					</Link>

					{user ? (
						<Box sx={{ flexGrow: 0 }}>
							<UserMenu></UserMenu>
						</Box>
					) : (
						<Box>
							<UserButtons></UserButtons>
						</Box>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
