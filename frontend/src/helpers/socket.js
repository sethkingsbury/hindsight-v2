import io from 'socket.io-client';
let socket;

const initiateSocket = (room, name) => {
	socket = io('http://localhost:5000/');
	console.log(`Connecting socket...`);
	if (socket && room) socket.emit('join', { room, name });
};

const disconnectSocket = () => {
	console.log('Disconnecting socket...');
	if (socket) socket.disconnect();
};

export { initiateSocket, disconnectSocket };
