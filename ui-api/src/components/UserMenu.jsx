import {
	Box,
	Menu,
	MenuItem,
	Typography,
	Divider,
	IconButton,
	Tooltip,
} from '@mui/material';
import React, { useState, useEffect } from 'react';

import ScienceIcon from '@mui/icons-material/Science';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ExperimentsListDialog from '../components/ExperimentsList';
import { signOut, useSession } from 'next-auth/react';
import SignUpDialog from '../components/SignUpDialog';
import UpdatePasswordDialog from './UpdatePasswordDialog';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function UserMenu() {
	const router = useRouter();
	const [openSignup, setOpenSignUp] = useState(false);
	const [openUpdatePassword, setOpenUpdatePassword] = useState(false);
	const { data: session, status } = useSession();

	const [fullname, setFullname] = useState('');

	const [openExperimentsList, setOpenExperimentsList] = useState(false);
	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleOpenUpdate = () => {
		handleCloseUserMenu();
		setOpenSignUp(true);
	};

	const handleSignOut = async () => {
		setAnchorElUser(null);
		window.localStorage.removeItem('EXPERIMENT');
		await signOut({ callbackUrl: '/' });
	};

	const loadData = async () => {
		const response = await fetch(`/api/users/read`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({ email: session.user.email }),
		});
		const answer = await response.json();

		if (!answer.status) {
			toast.error('Something Went Wrong, Please Try Again');
		} else {
			setFullname(answer.user.fullname);
		}
	};

	useEffect(() => {
		if (session) {
			loadData();
		}
	}, []);

	return (
		<Box>
			<Tooltip
				title='Tutorial'
				enterTouchDelay={0}
				arrow
				sx={{
					mr: { xxs: 0, xs: 0, sm: 1 },
				}}
			>
				<IconButton>
					<LightbulbOutlinedIcon
						sx={{
							fontSize: { xxs: '20px', xs: '24px', sm: '32px' },
						}}
						color='white'
					/>
				</IconButton>
			</Tooltip>
			<Tooltip
				title='My Experiments'
				enterTouchDelay={0}
				arrow
				sx={{
					mr: { xxs: 0, xs: 0, sm: 1 },
				}}
			>
				<IconButton onClick={() => router.push('/experiments')}>
					<ScienceIcon
						sx={{
							fontSize: { xxs: '20px', xs: '24px', sm: '32px' },
						}}
						color='white'
					/>
				</IconButton>
			</Tooltip>

			<ExperimentsListDialog
				open={openExperimentsList}
				handleClose={() => setOpenExperimentsList(false)}
			/>
			<IconButton onClick={() => setOpenSignUp(true)}>
				<AccountCircle
					sx={{
						fontSize: { xxs: '20px', xs: '24px', sm: '32px' },
					}}
					color='white'
				/>
			</IconButton>
			<Box
				sx={{
					verticalAlign: 'middle',
					display: 'none',

					'@media (min-width:700px)': {
						display: 'inline-flex',
					},
				}}
			>
				<Typography variant='body1'>{fullname}</Typography>
				<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
					<KeyboardArrowDownIcon
						sx={{
							fontSize: { xxs: '16px', xs: '20px', sm: '24px' },
							display: 'none',

							'@media (min-width:700px)': {
								display: 'inline-flex',
							},
						}}
						color='white'
					/>
				</IconButton>
			</Box>

			<Menu
				sx={{ mt: '45px' }}
				id='menu-appbar'
				anchorEl={anchorElUser}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				open={Boolean(anchorElUser)}
				onClose={handleCloseUserMenu}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
					},
				}}
			>
				<MenuItem onClick={handleOpenUpdate}>
					<AccountCircle
						sx={{
							fontSize: { xxs: '20px', xs: '24px', sm: '32px' },
							mr: 1,
							color: 'primary.700',
						}}
					/>
					<Typography variant='body1'>My Account</Typography>
				</MenuItem>
				<Divider />
				<MenuItem onClick={() => setOpenUpdatePassword(true)}>
					<SettingsIcon
						sx={{
							fontSize: { xxs: '20px', xs: '24px', sm: '24px' },
							mr: 1,
							color: 'primary.700',
						}}
					/>
					<Typography variant='body2'>Update Password</Typography>
				</MenuItem>
				<MenuItem onClick={handleSignOut}>
					<LogoutIcon
						sx={{
							fontSize: { xxs: '20px', xs: '24px', sm: '24px' },
							mr: 1,
							color: 'primary.700',
						}}
					/>
					<Typography variant='body2'>Logout</Typography>
				</MenuItem>

				<SignUpDialog
					open={openSignup}
					handleClose={() => setOpenSignUp(false)}
				/>
				<UpdatePasswordDialog
					open={openUpdatePassword}
					handleClose={() => setOpenUpdatePassword(false)}
				/>
			</Menu>
		</Box>
	);
}
