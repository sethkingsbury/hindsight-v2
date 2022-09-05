import { Question } from './question';

const getQuestions = () => {
	const questionStrings = [
		'What should the team continue doing?',
		'What would you like to see the team do more often?',
		'What would you like to see the team do less often?',
		'What does the team need to start doing?',
		'What does the team need to stop doing?',
	];
	let questions = [];
	for (let i = 0; i < questionStrings.length; i++) {
		questions.push(new Question(i, questionStrings[i]));
	}
	return questions;
};

export { getQuestions };
