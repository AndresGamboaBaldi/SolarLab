import { Server } from 'socket.io';

const globalForSocket = global;

const connectSocket = async () => {
	if (!globalForSocket.socket) {
		const io = new Server({
			cors: {
				origin: 'http://localhost:3000',
			},
		});
		io.listen(4000);
		io.on('connect', async (socket) => {
			socket.on('connect', (reason) => {
				console.log('Socket Client Connected');
			});
			socket.on('disconnect', (reason) => {
				console.log('Socket Client Disconnected');
			});
		});

		return io;
	} else {
		return globalForSocket.socket;
	}
};

export const socket = globalForSocket.socket || connectSocket();

if (process.env.NODE_ENV !== 'production') globalForSocket.socket = socket;

export default socket;
