import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import UserButtonsNavBar from '../components/UserButtonsNavBar';
import UserMenu from '../components/UserMenu';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function NavBar() {
	const router = useRouter();
	const { data: session, status } = useSession();

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

					<Typography
						color='white.main'
						variant='header2'
						sx={{
							flexGrow: 1,
							cursor: 'pointer',
						}}
						ml={{ xxs: 1, xs: 1, sm: 3 }}
						onClick={() => router.push('/')}
					>
						Solar Remote Lab
					</Typography>

					{session ? (
						<Box sx={{ flexGrow: 0 }}>
							<UserMenu></UserMenu>
						</Box>
					) : (
						<Box>
							<UserButtonsNavBar></UserButtonsNavBar>
						</Box>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
