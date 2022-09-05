import { Question } from './question';

const getQuestions = () => {
	const questionStrings = ['Continue', 'More of', 'Less of', 'Start', 'Stop'];
	let questions = [];
	for (let i = 0; i < questionStrings.length; i++) {
		questions.push(new Question(i, questionStrings[i]));
	}
	return questions;
};

export { getQuestions };
