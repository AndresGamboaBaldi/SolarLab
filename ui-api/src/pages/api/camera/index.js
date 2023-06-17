const Stream = require('node-rtsp-stream');

export default async function handler(req, res) {
	if (req.method === 'GET') {
		if (!res.socket.server['cbba']) {
			try {
				const streamCbba = await new Stream({
					name: 'SolarLabCameraCBBA',
					streamUrl: process.env.CAMERACBBA,
					wsPort: process.env.WSPORTCBBA,
					ffmpegOptions: {
						'-f': 'mpegts', // output file format.
						'-codec:v': 'mpeg1video', // video codec
						'-b:v': '1000k', // video bit rate
						'-r': 25, // frame rate
						'-s': '240x240', // video size
						'-bf': 0,
						'-loglevel': 'panic',
						'-filter:v': 'fps=fps=15',
						//'-c': 'copy',
					},
				});
				res.socket.server['cbba'] = true;
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log('CBBA Camera Socket Already Running');
		}
		if (!res.socket.server['lpz']) {
			try {
				const streamLpz = await new Stream({
					name: 'SolarLabCameraLPZ',
					streamUrl: process.env.CAMERALPZ,
					wsPort: process.env.WSPORTLPZ,
					ffmpegOptions: {
						'-f': 'mpegts', // output file format.
						'-codec:v': 'mpeg1video', // video codec
						'-b:v': '1000k', // video bit rate
						'-r': 25, // frame rate
						'-s': '240x240', // video size
						'-bf': 0,
						'-loglevel': 'panic',
						'-filter:v': 'fps=fps=15',
						//'-c': 'copy',
					},
				});
				res.socket.server['lpz'] = true;
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log('LPZ Camera Socket Already Running');
		}
		if (!res.socket.server['scz']) {
			try {
				const streamScz = await new Stream({
					name: 'SolarLabCameraSCZ',
					streamUrl: process.env.CAMERASCZ,
					wsPort: process.env.WSPORTSCZ,
					ffmpegOptions: {
						'-f': 'mpegts', // output file format.
						'-codec:v': 'mpeg1video', // video codec
						'-b:v': '1000k', // video bit rate
						'-r': 25, // frame rate
						'-s': '240x240', // video size
						'-bf': 0,
						'-loglevel': 'panic',
						'-filter:v': 'fps=fps=15',
						//'-c': 'copy',
					},
				});
				res.socket.server['scz'] = true;
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log('SCZ Camera Socket Already Running');
		}
		return res.status(200).json({ status: true });
	} else {
		console.log('HTTP Method not Valid');
		return res.status(500).json({ error: 'HTTP Method not Valid' });
	}
}
