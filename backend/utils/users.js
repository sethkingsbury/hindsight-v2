const users = [];

const userJoin = (id, name, room) => {
	const user = { id, name, room };
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

module.exports = {
	userJoin,
	getUser,
	userLeave,
	getUsers,
};
