const answers = {};

const addAnswers = (room, answerList) => {
	if (!answers[room]) {
		answers[room] = [];
	}
	currentAnswers = answers[room];
	id = currentAnswers.length;
	for (let i = 0; i < answerList.length; i++) {
		answerList[i]['id'] = id;
		answerList[i]['position'] = { x: 0, y: 0 };
		id++;
		currentAnswers.push(answerList[i]);
	}
	answers[room] = currentAnswers;
};

const getAnswers = (room) => {
	return answers[room];
};

const updatePosition = (room, id, position) => {
	roomAnswers = answers[room];
	const i = roomAnswers.findIndex((x) => x.id == id);
	let answer = roomAnswers[i];
	answer['position'] = position;
	roomAnswers[i] = answer;
	answers[room] = roomAnswers;
	return answers;
};

module.exports = {
	addAnswers,
	getAnswers,
	updatePosition,
};
