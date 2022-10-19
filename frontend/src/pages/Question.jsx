import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnswerItem from '../components/AnswerItem';
import Header from '../components/Header';
import { Answer } from '../data/answer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowRight } from 'react-icons/fa';
import { getQuestions } from '../data/questions';
const { io } = require('socket.io-client');

const ENDPOINT = 'http://localhost:5000/';
// const ENDPOINT = 'https://hindsight.herokuapp.com/';
const socket = io(ENDPOINT);

function Question() {
	const navigate = useNavigate();
	const room = localStorage.getItem('room');
	const name = localStorage.getItem('name');
	const qNum = 0;
	const [points, setPoints] = useState(
		JSON.parse(localStorage.getItem('points'))
	);
	const [answers, setAnswers] = useState(
		JSON.parse(localStorage.getItem('answers'))
	);
	const questions = getQuestions();
	const [answer, setAnswer] = useState('');

	useEffect(() => {
		if (!room) {
			navigate('/');
		}

		socket.emit('joinRoom', { room, name });
	}, [room, name]);

	const onChange = (e) => {
		setAnswer(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (validAnswer()) {
			var newAnswers = answers;
			const newAnswer = new Answer(qNum, name, answer);
			newAnswers.push(newAnswer);
			localStorage.setItem('answers', JSON.stringify(newAnswers));
			setAnswers(newAnswers);
			setPoints(points + 50);
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
		localStorage.setItem('points', JSON.stringify(points));
		navigate(`/game`);
	};

	return (
		room && (
			<div className='container'>
				<div className='header'>
					<Header room={room} name={name} points={points} />
				</div>
				<div className='body'>
					<div className='question-box'>
						<div className='room-header'>
							<h1 className='text prompt'>{questions[qNum].question}</h1>
						</div>

						<form className='q-form' onSubmit={onSubmit}>
							<input
								className='q-form-in'
								type='text'
								name='answer'
								value={answer}
								onChange={onChange}
							/>
							<button className='btn-form-sm'>
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

				<div className='footer'>
					<button className='btn btn-sm' onClick={next}>
						Next
					</button>
				</div>
			</div>
		)
	);
}

export default Question;
