const Stream = require('node-rtsp-stream');

export default async function handler(req, res) {
	if (!res.socket.server.io) {
		var cameraUrl = '';
		var websocketPort = '';
		if (req.body.name === 'Cochabamba') {
			cameraUrl = process.env.CAMERACBBA;
			websocketPort = process.env.WSPORTCBBA;
		} else if (req.body.name === 'Santa Cruz') {
			cameraUrl = process.env.CAMERASCZ;
			websocketPort = process.env.WSPORTSCZ;
		} else {
			cameraUrl = process.env.CAMERALPZ;
			websocketPort = process.env.WSPORTLPZ;
		}
		if (req.method === 'POST') {
			try {
				const stream = new Stream({
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
				res.socket.server.io = stream;
				return res.status(200).json({ status: 'ok' });
			} catch (error) {
				return res.status(400).json({ error: error.message });
			}
		} else {
			return res.status(500).json({ error: 'HTTP Method not Valid' });
		}
	} else {
		console.log('socket.io already running');
	}
	res.end();
}
