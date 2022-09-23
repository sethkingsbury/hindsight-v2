const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 5000;
const {
	userJoin,
	getUser,
	userLeave,
	getUsers,
	readyUser,
} = require('./utils/users');
const { addAnswers, getAnswers } = require('./utils/answers');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});

// app.use(express.static(path.join(__dirname, '../frontend/build')))

io.on('connection', (socket) => {
	socket.on('joinRoom', ({ room, name }) => {
		console.log(`${name} joining room: ${room}`);
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
		console.log('Getting Answers');
		const answerList = getAnswers(room);
		io.to(room).emit('answerList', answerList);
	});

	socket.on('ready', ({ room, name }) => {
		const allReady = readyUser(room, name);
		if (allReady) {
			io.to(room).emit('toWhiteboard');
		}
	});

	socket.on('disconnect', () => {
		const user = userLeave(socket.id);
		if (user) {
			io.to(user.room).emit('userList', getUsers(user.room));
		}
	});
});

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../frontend/build')));

	app.get('*', (req, res) =>
		res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
	);
} else {
	app.get('/', (req, res) => {
		res.status(200).json({ message: 'Welcome to Hindsight' });
	});
}

server.listen(PORT, () => console.log(`Server runnning on port ${PORT}`));
