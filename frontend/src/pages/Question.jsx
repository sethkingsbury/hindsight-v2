import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnswerItem from '../components/AnswerItem';
import { Answer } from '../data/answer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowRight } from 'react-icons/fa';
import { getQuestions } from '../data/questions';
const { io } = require('socket.io-client');

function Question() {
	const navigate = useNavigate();
	const room = localStorage.getItem('room');
	const name = localStorage.getItem('name');
	const qNum = JSON.parse(localStorage.getItem('qNum'));
	const [answers, setAnswers] = useState(
		JSON.parse(localStorage.getItem('answers'))
	);
	const questions = getQuestions();
	const [answer, setAnswer] = useState('');
	const socket = io('http://localhost:5000/');

	useEffect(() => {
		socket.emit('joinRoom', { room, name });
	}, [socket, room, name]);

	const onChange = (e) => {
		setAnswer(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (validAnswer()) {
			var newAnswers = answers;
			const newAnswer = new Answer(qNum, name, answer);
			newAnswers.push(newAnswer);
			setAnswers(newAnswers);
			setAnswer('');
		}
	};

	const validAnswer = () => {
		let valid = false;
		if (answer.length < 1) {
			toast.error('Enter an answer');
		} else if (answer.length > 50) {
			toast.error('Keep it brief! (50 characters)');
		} else if (answers.find((a) => a.answer === answer)) {
			toast.error("You've already submitted that answer!");
		} else {
			valid = true;
		}
		return valid;
	};

	const next = () => {
		localStorage.setItem('answers', JSON.stringify(answers));
		navigate(`/game`);
	};

	return (
		<div className='room-container'>
			<div className='room-body'>
				<div className='question-box'>
					<div className='room-header'>
						<h2 className='text'>{questions[qNum].question}</h2>
					</div>

					<form className='form' onSubmit={onSubmit}>
						<input
							className='form-input'
							type='text'
							name='answer'
							value={answer}
							onChange={onChange}
						/>
						<button className='form-btn'>
							<FaArrowRight />
						</button>
					</form>
				</div>
				<div className='answer-box'>
					{answers
						.filter((x) => x.qNum === qNum)
						.map((answer) => {
							return (
								<AnswerItem
									key={answer.answer}
									answer={answer.answer}
									color={questions[qNum]['color']}
								/>
							);
						})}
				</div>
			</div>

			<div className='room-footer'>
				<button className='btn success' onClick={next}>
					Next
				</button>
			</div>
		</div>
	);
}

export default Question;
