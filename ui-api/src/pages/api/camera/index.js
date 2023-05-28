const Stream = require('node-rtsp-stream');

export default async function handler(req, res) {
	if (!res.socket.server.io) {
		try {
			const stream = new Stream({
				name: 'Bunny',
				streamUrl: 'cameraurl',
				wsPort: 9999,
				ffmpegOptions: {
					'-f': 'mpegts', // output file format.
					'-codec:v': 'mpeg1video', // video codec
					'-b:v': '1000k', // video bit rate
					'-r': 25, // frame rate
					'-s': '216x216', // video size
					'-bf': 0,
					'-loglevel': 'panic',
					//-c copy
					'-filter:v': 'fps=fps=10',
				},
			});
			res.socket.server.io = stream;
			return res.status(200).json({ status: 'ok' });
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	} else {
		console.log('socket.io already running');
	}
	res.end();
}
