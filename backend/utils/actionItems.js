const actionItems = {};

const addActionItem = (room, actionItem) => {
	let roomActionItems;
	actionItems[room]
		? (roomActionItems = actionItems[room])
		: (roomActionItems = []);
	roomActionItems.push(actionItem.trim());
	actionItems[room] = roomActionItems;

	console.log(actionItems);
};

const getActionItems = (room) => {
	return actionItems[room];
};

module.exports = {
	addActionItem,
	getActionItems,
};
