import {
	Typography,
	Box,
	Grid,
	Button,
	Card,
	Slider,
	FormControlLabel,
	Checkbox,
	IconButton,
	Popover,
} from '@mui/material';
import LineChart from './LineChart';
import Clock from './Clock';
import RadiationChart from './RadiationChart';
import React, { useState, useEffect } from 'react';
import CameraPlayer from '../components/CameraPlayer';
import HelpIcon from '@mui/icons-material/Help';
import InfoIcon from '@mui/icons-material/Info';
import ShowSpecs from './ShowSpecs';

export default function DepartamentExperiment({
	name,
	departmentData,
	syncPanels,
	setSyncPanels,
}) {
	const [angle, setAngle] = useState(0);
	const [selectedAngle, setSelectedAngle] = useState(0);
	const [voltage, setVoltage] = useState(0);
	const [current, setCurrent] = useState(0);
	const [power, setPower] = useState(100);
	const [uvaRadiation, setUvaRadiation] = useState(200);
	const [radiation, setRadiation] = useState(0);
	const [efficiencyTest, setEfficiencyTest] = useState([]);
	const [isPrivate, setIsPrivate] = useState(false);
	const [anchorElRadiation, setAnchorElRadiation] = React.useState(null);
	const [anchorElUVA, setAnchorElUVA] = React.useState(null);
	const [anchorElSpecs, setAnchorElSpecs] = React.useState(null);

	const sendMqttMessage = async (action) => {
		var department = name;
		if (syncPanels) {
			department = 'ALL';
		}
		const message = {
			action: action,
			angle: selectedAngle,
			department: department,
		};
		const response = await fetch(`/api/mqtt/send`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify(message),
		});
		const data = await response.json();
	};

	useEffect(() => {
		departmentData.forEach((department) => {
			if (department.departmentName === name) {
				setAngle(department.panelangle);
				setCurrent(department.current);
				setPower(department.power);
				setUvaRadiation(department.uvaRadiation);
				setVoltage(department.voltage);
				setRadiation(department.radiation);
				setEfficiencyTest(department.efficiencyTest);
				setSelectedAngle(department.panelangle);
			}
		});
		setIsPrivate(
			JSON.parse(window.localStorage.getItem('SESSION_DATA')).isPrivate
		);
	}, [departmentData]);

	const handleChange = (event) => {
		setSyncPanels(event.target.checked);
	};

	const handleClickUVARadiation = (event) => {
		setAnchorElUVA(event.currentTarget);
	};

	const handleCloseUVARadiation = () => {
		setAnchorElUVA(null);
	};

	const openUVA = Boolean(anchorElUVA);

	const handleClickRadiation = (event) => {
		setAnchorElRadiation(event.currentTarget);
	};

	const handleCloseRadiation = () => {
		setAnchorElRadiation(null);
	};

	const open = Boolean(anchorElRadiation);

	const handleOpenSpecs = (event) => {
		setAnchorElSpecs(event.currentTarget);
	};

	const handleCloseSpecs = () => {
		setAnchorElSpecs(null);
	};

	const openSpecs = Boolean(anchorElSpecs);

	return (
		<Box my={{ xxs: 2, xs: 2, s: 2, sm: 3 }}>
			<Card
				elevation={5}
				my={{ xxs: 2, xs: 3, s: 3, sm: 4 }}
				mx={{ xxs: 3, xs: 3, s: 4, sm: 5 }}
				sx={{
					height: '100%',
					width: 'auto',
				}}
			>
				<Box
					my={{ xxs: 3, xs: 4, s: 4, sm: 5 }}
					mx={{ xxs: 3, xs: 3, s: 4, sm: 5 }}
				>
					<Grid container>
						<Grid
							item
							xxs={12}
							xs={12}
							s={12}
							sm={12}
							md={6}
							mb={{ xxs: 1, xs: 1, s: 1, sm: 2, md: 3 }}
							sx={{
								alignItems: 'center',
								display: 'flex',
								verticalAlign: 'middle',
							}}
						>
							<Typography variant='header1' color='blacky.main' mr={1}>
								{name}
							</Typography>
							<IconButton
								onClick={handleOpenSpecs}
								sx={{
									py: 0,
									color: 'info.main',
								}}
							>
								<InfoIcon
									sx={{
										fontSize: { xxs: '16px', xs: '20px', sm: '30px' },
									}}
								/>
							</IconButton>
							<Popover
								open={openSpecs}
								anchorEl={anchorElSpecs}
								anchorOrigin={{
									vertical: 'center',
									horizontal: 'right',
								}}
								transformOrigin={{
									vertical: 'center',
									horizontal: 'left',
								}}
								onClose={handleCloseSpecs}
								disableRestoreFocus
							>
								<ShowSpecs city={name}></ShowSpecs>
							</Popover>
						</Grid>
						<Grid
							item
							xxs={12}
							xs={12}
							s={12}
							sm={12}
							md={6}
							mb={{ xxs: 1, xs: 2, s: 3, sm: 3 }}
							sx={{
								alignItems: 'center',
								display: 'flex',
								verticalAlign: 'middle',
								lineHeight: 'normal',
							}}
							justifyContent={{ sm: 'left', md: 'flex-end' }}
						>
							<Clock></Clock>
						</Grid>
						<Grid
							item
							container
							direction='column'
							xs={12}
							s={12}
							sm={12}
							md={4}
							lg={3}
							mb={{ xxs: 1, xs: 2, s: 2, sm: 2, md: 0 }}
						>
							<Grid
								item
								mb={{ xxs: 2, xs: 2, s: 2, sm: 2, md: 2 }}
								sx={{ display: 'flex' }}
								justifyContent='center'
							>
								<Box
									sx={{
										width: '240px',
										height: '240px',
										backgroundColor: 'black',
									}}
								>
									<CameraPlayer name={name}></CameraPlayer>
								</Box>
							</Grid>
							<Grid
								item
								textAlign='center'
								mb={{ xxs: 0, xs: 0, s: 0, sm: 1, md: 1 }}
							>
								<Typography
									variant='titleDepartment'
									color='primary.700'
									sx={{
										verticalAlign: 'middle',
									}}
								>
									Current Angle:
								</Typography>
								<Typography
									variant='titleDepartment'
									color='secondary.main'
									sx={{
										verticalAlign: 'middle',
									}}
								>
									{'  '}
									{angle}°
								</Typography>
							</Grid>
							{isPrivate ? (
								<Box>
									<Grid item sx={{ display: 'flex' }} justifyContent='center'>
										<Box width='70%'>
											<Slider
												size='medium'
												value={selectedAngle}
												valueLabelDisplay='auto'
												onChange={(_, value) => setSelectedAngle(value)}
												max={180}
											/>
										</Box>
									</Grid>
									<Grid
										item
										sx={{ display: 'flex' }}
										mb={1}
										justifyContent='center'
									>
										<FormControlLabel
											control={
												<Checkbox
													checked={syncPanels}
													onChange={handleChange}
													color='secondary'
													sx={{
														'& .MuiSvgIcon-root': {
															fontSize: { xxs: '24px', xs: '30px', sm: '32px' },
														},
													}}
												/>
											}
											label={
												<Typography variant='titleDepartment'>
													Sync all Panels
												</Typography>
											}
										/>
									</Grid>
									<Grid item textAlign='center'>
										<Button
											variant='contained'
											color='white'
											sx={{
												textTransform: 'none',
												border: 1,
												borderColor: 'primary.700',
												mr: 1,
											}}
											onClick={() => {
												sendMqttMessage('ANGLE');
											}}
										>
											<Typography
												variant='titleDepartment'
												color='primary.700'
												sx={{
													'&:hover': {
														color: '#fff',
													},
												}}
											>
												Move
											</Typography>
										</Button>
										<Button
											variant='contained'
											sx={{
												bgcolor: 'primary.700',
												textTransform: 'none',
											}}
											onClick={() => {
												sendMqttMessage('DATA');
											}}
										>
											<Typography
												sx={{
													mx: { xxs: 0, xs: 0, s: 1, sm: 1, md: 1, lg: 1 },
												}}
												variant='titleDepartment'
												color='white'
											>
												Start
											</Typography>
										</Button>
									</Grid>
								</Box>
							) : null}
						</Grid>
						<Grid
							item
							container
							direction='column'
							xs={12}
							s={12}
							sm={12}
							md={8}
							lg={9}
						>
							<Grid item xs mb={{ xxs: 1, xs: 2, s: 2, sm: 2 }}>
								<Box
									sx={{
										width: '79vw',
										'@media (min-width:900px)': {
											width: '55vw',
											height: '35vh',
										},
										'@media (min-width:1100px)': {
											width: '65vw',
											height: '35vh',
										},
										height: '23vh',
									}}
								>
									<LineChart
										names={[name]}
										chartData={[efficiencyTest]}
									></LineChart>
								</Box>
							</Grid>
							<Grid item>
								<Grid container columnSpacing={1} rowSpacing={2}>
									<Grid item xxs={6} sm={4}>
										<Typography variant='titleDepartment' color='primary.700'>
											Voltage:
										</Typography>
										<Typography
											ml={1}
											variant='dataDepartment'
											color='blacky.main'
										>
											{voltage} V
										</Typography>
									</Grid>
									<Grid item xxs={6} sm={4}>
										<Typography variant='titleDepartment' color='primary.700'>
											Current:
										</Typography>
										<Typography
											ml={1}
											variant='dataDepartment'
											color='blacky.main'
										>
											{current} A
										</Typography>
									</Grid>
									<Grid item xxs={6} sm={4}>
										<Typography variant='titleDepartment' color='primary.700'>
											Power:
										</Typography>
										<Typography
											ml={1}
											variant='dataDepartment'
											color='blacky.main'
										>
											{power} W
										</Typography>
									</Grid>
									<Grid
										item
										xxs={12}
										sm={6}
										sx={{
											alignItems: 'center',
											display: 'flex',
											verticalAlign: 'middle',
											lineHeight: 'normal',
										}}
									>
										<Typography variant='titleDepartment' color='primary.700'>
											Radiation:
										</Typography>
										<Typography
											ml={1}
											variant='dataDepartment'
											color='blacky.main'
										>
											{radiation} W/m2
										</Typography>
										<IconButton
											onClick={handleClickRadiation}
											sx={{
												py: 0,
												color: 'secondary.main',
											}}
										>
											<HelpIcon
												sx={{
													fontSize: { xxs: '16px', xs: '20px', sm: '30px' },
												}}
											/>
										</IconButton>
										<Popover
											open={open}
											anchorEl={anchorElRadiation}
											anchorOrigin={{
												vertical: 'top',
												horizontal: 'center',
											}}
											transformOrigin={{
												vertical: 'bottom',
												horizontal: 'center',
											}}
											onClose={handleCloseRadiation}
											disableRestoreFocus
										>
											<RadiationChart
												title='24 Hrs Solar Radiation'
												city={name}
											></RadiationChart>
										</Popover>
									</Grid>
									<Grid
										item
										xxs={12}
										sm={6}
										sx={{
											alignItems: 'center',
											display: 'flex',
											verticalAlign: 'middle',
											lineHeight: 'normal',
										}}
									>
										<Typography variant='titleDepartment' color='primary.700'>
											UVA Radiation:
										</Typography>
										<Typography
											ml={1}
											variant='dataDepartment'
											color='blacky.main'
										>
											{uvaRadiation} W/m2
										</Typography>
										<IconButton
											onClick={handleClickUVARadiation}
											sx={{
												py: 0,
												color: 'secondary.main',
											}}
										>
											<HelpIcon
												sx={{
													fontSize: { xxs: '16px', xs: '20px', sm: '30px' },
												}}
											/>
										</IconButton>
										<Popover
											open={openUVA}
											anchorEl={anchorElUVA}
											anchorOrigin={{
												vertical: 'top',
												horizontal: 'center',
											}}
											transformOrigin={{
												vertical: 'bottom',
												horizontal: 'center',
											}}
											onClose={handleCloseUVARadiation}
											disableRestoreFocus
										>
											<RadiationChart
												title='24 Hrs UVA Radiation'
												city={name}
											></RadiationChart>
										</Popover>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</Card>
		</Box>
	);
}
