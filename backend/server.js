const path = require('path');
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const { userJoin, getUser, userLeave, getUsers } = require('./utils/users');
const { addAnswers, getAnswers } = require('./utils/answers');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
	},
});

// app.use(express.static(path.join(__dirname, '../frontend/build')))

io.on('connection', (socket) => {
	socket.on('joinRoom', ({ room, name }) => {
		if (!getUser(room, name)) {
			const user = userJoin(socket.id, name, room);
			socket.join(user.room);
			io.to(user.room).emit('userList', getUsers(user.room));
		}
	});

	socket.on('submitAnswers', ({ room, answers }) => {
		addAnswers(room, answers);
	});

	socket.on('getAnswers', ({ room }) => {
		const answerList = getAnswers(room);
		io.to(room).emit('answerList', answerList);
	});

	socket.on('disconnect', () => {
		const user = userLeave(socket.id);
		if (user) {
			io.to(user.room).emit('userList', getUsers(user.room));
		}
	});
});

const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server runnning on port ${PORT}`));
