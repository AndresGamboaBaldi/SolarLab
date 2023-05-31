import { Box, Typography, Button } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/router';
import Link from '@mui/material/Link';

export default function HomeButtons() {
	const router = useRouter();
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
					mr: { xxs: 2, xs: 3, s: 4, sm: 6, md: 8, lg: 9 },
				}}
			>
				<Link
					color='white.main'
					variant='buttonsHome'
					underline='none'
					sx={{
						mx: { xxs: 0, xs: 1, s: 3, sm: 4, md: 4, lg: 5 },
					}}
					onClick={(e) => router.push('/experiments')}
				>
					Enter to Remote Lab
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
						mx: { xxs: 1, xs: 2, s: 4, sm: 5, md: 6, lg: 7 },
						'&:hover': {
							color: '#fff',
						},
					}}
					variant='buttonsHome'
					color='primary.700'
					onClick={(e) =>
						(window.location.href =
							'https://eubbc-digital.upb.edu/booking/booking/24')
					}
				>
					Book a Session
				</Typography>
			</Button>
		</Box>
	);
}
