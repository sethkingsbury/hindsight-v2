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
	addPoints,
	getPointsTotal,
} = require('./utils/users');
const { addAnswers, getAnswers, updatePosition } = require('./utils/answers');
const { addActionItem, getActionItems } = require('./utils/actionItems');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: 'https://hindsight.herokuapp.com/',
		methods: ['GET', 'POST'],
	},
});

io.on('connection', (socket) => {
	socket.on('joinRoom', ({ room, name }) => {
		if (!getUser(room, name)) {
			const user = userJoin(socket.id, name, room);
			socket.join(user.room);
			io.to(user.room).emit('userList', getUsers(user.room));
		}
	});

	socket.on('startGame', (room) => {
		io.to(room).emit('startGameResponse', room);
	});

	socket.on('submitAnswers', ({ room, name, points, answers }) => {
		addAnswers(room, answers);
		addPoints(name, points);
	});

	socket.on('getAnswers', ({ room }) => {
		const answerList = getAnswers(room);
		io.to(room).emit('answerList', answerList);
	});

	socket.on('ready', ({ room, name }) => {
		const allReady = readyUser(room, name);
		const total = getPointsTotal(room);
		console.log(total);
		if (allReady) {
			io.to(room).emit('toWhiteboard', total);
		}
	});

	socket.on('positionUpdateRequest', ({ room, answerId, position }) => {
		const newAnswers = updatePosition(room, answerId, position);
		io.to(room).emit('positionUpdateResponse', newAnswers);
	});

	socket.on('actionItemSubmission', ({ room, actionItem }) => {
		addActionItem(room, actionItem);
	});

	socket.on('actionItemRequest', (room) => {
		const actionItemResponse = getActionItems(room);
		io.to(room).emit('actionItemResponse', actionItemResponse);
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
	// Set build folder as static
	app.use(express.static(path.join(__dirname, '../frontend/build')));

	// FIX: below code fixes app crashing on refresh in deployment
	app.get('*', (_, res) => {
		res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
	});
} else {
	app.get('/', (_, res) => {
		res.status(200).json({ message: 'Welcome to the Hindsight' });
	});
}

server.listen(PORT, () => console.log(`Server runnning on port ${PORT}`));
