const Stream = require('node-rtsp-stream');

export default async function handler(req, res) {
	var cameraUrl = '';
	var websocketPort = '';
	var key = '';
	if (req.body.name === 'Cochabamba') {
		cameraUrl = process.env.CAMERACBBA;
		websocketPort = process.env.WSPORTCBBA;
		key = 'cbba';
	} else if (req.body.name === 'Santa Cruz') {
		cameraUrl = process.env.CAMERASCZ;
		websocketPort = process.env.WSPORTSCZ;
		key = 'scz';
	} else {
		cameraUrl = process.env.CAMERALPZ;
		websocketPort = process.env.WSPORTLPZ;
		key = 'lpz';
	}
	if (!res.socket.server[key]) {
		if (req.method === 'POST') {
			try {
				const stream = await new Stream({
					name: 'SolarLabCamera',
					streamUrl: cameraUrl,
					wsPort: websocketPort,
					ffmpegOptions: {
						'-f': 'mpegts', // output file format.
						'-codec:v': 'mpeg1video', // video codec
						'-b:v': '1000k', // video bit rate
						'-r': 25, // frame rate
						'-s': '240x240', // video size
						'-loglevel': 'panic',
						'-bf': 0,
						//'-c': 'copy',
						'-filter:v': 'fps=fps=10',
					},
				});
				res.socket.server[key] = true;
				return res.status(200).json({ status: true });
			} catch (error) {
				return res.status(400).json({ error: error.message, status: false });
			}
		} else {
			return res.status(500).json({ error: 'HTTP Method not Valid' });
		}
	} else {
		console.log('socket.io already running');
		return res.status(200).json({ status: true });
	}
}
