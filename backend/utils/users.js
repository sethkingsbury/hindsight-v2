const users = [];

const userJoin = (id, name, room, ready = false, points = 0) => {
	const user = { id, name, room, ready, points };
	users.push(user);
	return user;
};

const getUser = (room, name) => {
	return users.find((user) => user.name === name && user.room === room);
};

const userLeave = (id) => {
	const i = users.findIndex((user) => user.id === id);
	if (i !== -1) {
		return users.splice(i, 1)[0];
	}
};

const getUsers = (room) => {
	return users.filter((user) => user.room === room);
};

const readyUser = (room, name) => {
	var user = users.filter((user) => {
		return user.room == room && user.name == name;
	})[0];

	const i = users.indexOf(user);
	user.ready ? (user.ready = false) : (user.ready = true);
	users[i] == user;

	const roomUsers = users.filter((user) => {
		return user.room == room;
	});

	var allReady;
	roomUsers.every((user) => {
		return user.ready;
	})
		? (allReady = true)
		: (allReady = false);

	return allReady;
};

const addPoints = (name, points) => {
	const i = users.findIndex((user) => user.name == name);
	let user = users[i];
	user['points'] = parseInt(points);
	users[i] = user;
};

const getPointsTotal = (room) => {
	roomUsers = users.filter((user) => user.room === room);
	console.log(roomUsers);
	let total = 0;
	for (let i = 0; i < roomUsers.length; i++) {
		total += roomUsers[i].points;
	}
	return total;
};

module.exports = {
	userJoin,
	getUser,
	userLeave,
	getUsers,
	readyUser,
	addPoints,
	getPointsTotal,
};
