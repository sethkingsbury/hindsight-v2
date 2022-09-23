import { Question } from './question';

const getQuestions = () => {
	const questionStrings = [
		'What does the team need to start doing?',
		'What would you like to see the team do more often?',
		'What should the team continue doing?',
		'What would you like to see the team do less often?',
		'What does the team need to stop doing?',
	];

	const questionColors = [
		'#FFF9B1',
		'#DAF7A1',
		'#FF9D48',
		'#77CCC7',
		'#B485BC',
	];

	let questions = [];
	for (let i = 0; i < questionStrings.length; i++) {
		questions.push(new Question(i, questionStrings[i], questionColors[i]));
	}
	return questions;
};

export { getQuestions };
