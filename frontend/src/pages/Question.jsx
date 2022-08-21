import { useState } from 'react';
import Answer from '../components/Answer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Question() {
	const [gameData, setGameData] = useState({
		qnum: 0,
		questions: ['Continue', 'More of', 'Less of', 'Start', 'Stop'],
		answers: [],
		answer: '',
	});

	const { qnum, questions, answers, answer } = gameData;

	const onChange = (e) => {
		setGameData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();

		let newAnswers = answers;

		if (validAnswer()) {
			console.log('answer');
			newAnswers.push(answer.toUpperCase());
			setGameData((prevState) => ({
				...prevState,
				answers: newAnswers,
				answer: '',
			}));
		}
	};

	const validAnswer = () => {
		let valid = false;
		if (answer.length < 1) {
			toast.error('Enter an answer');
		} else if (answer.length > 50) {
			toast.error('Keep it brief!(50 characters)');
		} else if (answers.includes(answer.toUpperCase())) {
			toast.error("You've already submitted that answer!");
		} else {
			valid = true;
		}
		return valid;
	};

	return (
		<div className='container'>
			<h1>{questions[qnum]}?</h1>
			<form className='form' onSubmit={onSubmit}>
				<input type='text' name='answer' value={answer} onChange={onChange} />
				<button className='btn'>Enter</button>
			</form>
			<div className='answer-box'>
				<ul className='answer-list'>
					{answers.map((answer) => {
						return <Answer key={answer} answer={answer} />;
					})}
				</ul>
			</div>
		</div>
	);
}

export default Question;
