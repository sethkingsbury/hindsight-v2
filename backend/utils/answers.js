const answers = {};

const addAnswers = (room, answerList) => {
	if (!answers[room]) {
		answers[room] = answerList;
	} else {
		answers[room] = answers[room].concat(answerList);
	}
};

const getAnswers = (room) => {
	return answers[room];
};

module.exports = {
	addAnswers,
	getAnswers,
};
