import AccountCircle from '@mui/icons-material/AccountCircle';
import ScienceIcon from '@mui/icons-material/Science';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import {
	AppBar,
	Box,
	Menu,
	MenuItem,
	Tooltip,
	Typography,
	Toolbar,
	Avatar,
	Divider,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

import SignInDialog from '../components/SignInDialog';
import SignUpDialog from '../components/SignUpDialog';

export default function NavBar() {
	const [openSignIn, setOpenSignIn] = useState(false);
	const [openSignup, setOpenSignUp] = useState(false);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const { user, setUser } = useContext(UserContext);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleSignOut = () => {
		setAnchorElUser(null);
		setUser(null);
	};

	const handleOpenSignUpFromSignIn = () => {
		setOpenSignIn(false);
		setOpenSignUp(true);
	};

	const handleOpenSignInFromSignUp = () => {
		setOpenSignUp(false);
		setOpenSignIn(true);
	};

	return (
		<Box>
			<AppBar position='fixed' sx={{ bgcolor: 'primary.700' }}>
				<Toolbar>
					<WifiProtectedSetupIcon
						sx={{
							ml: { xxs: 0, xs: 0, sm: 4 },
							fontSize: { xxs: '24px', xs: '32px', sm: '40px' },
						}}
						color='white.main'
					/>
					<Typography
						ml={{ xxs: 1, xs: 1, sm: 3 }}
						variant='header2'
						color='white.main'
						href=''
						sx={{
							flexGrow: 1,
						}}
					>
						Solar Remote Lab
					</Typography>

					{user ? (
						<Box mr={{ xxs: 0, xs: 0, sm: 1 }} sx={{ flexGrow: 0 }}>
							<Tooltip
								title='Tutorial'
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
								arrow
								sx={{
									mr: { xxs: 0, xs: 0, sm: 1 },
								}}
							>
								<IconButton>
									<ScienceIcon
										sx={{
											fontSize: { xxs: '20px', xs: '24px', sm: '32px' },
										}}
										color='white'
									/>
								</IconButton>
							</Tooltip>
							<IconButton>
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

									'@media (min-width:446px)': {
										display: 'inline-flex',
									},
								}}
							>
								<Typography variant='body1'>{user.name}</Typography>
							</Box>

							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<KeyboardArrowDownIcon
									sx={{
										fontSize: { xxs: '16px', xs: '20px', sm: '24px' },
										display: 'none',

										'@media (min-width:446px)': {
											display: 'inline-flex',
										},
									}}
									color='white'
								/>
							</IconButton>

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
										'& .MuiAvatar-root': {
											width: 32,
											height: 32,
											ml: -0.5,
											mr: 1,
										},
										'&:before': {
											content: '""',
											display: 'block',
											position: 'absolute',
											top: 0,
											right: 14,
											width: 10,
											height: 10,
											bgcolor: 'background.paper',
											transform: 'translateY(-50%) rotate(45deg)',
											zIndex: 0,
										},
									},
								}}
							>
								<MenuItem onClick={handleCloseUserMenu}>
									<AccountCircle
										sx={{
											fontSize: { xxs: '20px', xs: '24px', sm: '32px' },
											mr: 1,
											color: 'primary.700',
										}}
									/>{' '}
									<Typography variant='body1'>My Account</Typography>
								</MenuItem>
								<Divider />
								<MenuItem>
									<SettingsIcon
										sx={{
											fontSize: { xxs: '20px', xs: '24px', sm: '24px' },
											mr: 1,
											color: 'primary.700',
										}}
									/>
									<Typography variant='body2'>Settings</Typography>
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
							</Menu>
						</Box>
					) : (
						<Box>
							<Button
								color='white'
								variant='text'
								sx={{
									mr: { xxs: 0, xs: 2, sm: 4 },
									py: 0,
									textTransform: 'none',
								}}
								onClick={() => setOpenSignUp(true)}
							>
								<Typography
									sx={{
										mx: { xxs: 0, xs: 0, md: 3 },
									}}
									variant='header3'
								>
									Sign Up
								</Typography>
							</Button>
							<SignUpDialog
								open={openSignup}
								handleClose={() => setOpenSignUp(false)}
								onClickSignIn={handleOpenSignInFromSignUp}
							/>
							<Button
								color='white'
								variant='contained'
								sx={{
									py: 0,
									mr: { xxs: 0, xs: 0, sm: 4 },
									textTransform: 'none',
								}}
								onClick={() => setOpenSignIn(true)}
							>
								<Typography
									sx={{
										mx: { xxs: 0, xs: 0, sm: 3 },
									}}
									variant='buttons1'
									color='primary.700'
								>
									Sign In
								</Typography>
							</Button>
							<SignInDialog
								open={openSignIn}
								handleClose={() => setOpenSignIn(false)}
								onClickSignup={handleOpenSignUpFromSignIn}
							/>
						</Box>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
