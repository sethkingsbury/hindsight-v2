import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AnswerItem from '../components/AnswerItem';
import RoomHeader from '../components/RoomHeader';
import { Answer } from '../data/answer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowRight } from 'react-icons/fa';
const { io } = require('socket.io-client');

function Question() {
	const location = useLocation();
	const navigate = useNavigate();
	const [gameData, setGameData] = useState(location.state.gameData);
	const socket = io('http://localhost:5000/');

	const { room, name, users, questions, qNum, answers, answer } = gameData;

	useEffect(() => {
		socket.emit('joinRoom', { room, name });
	}, []);

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
			const newAnswer = new Answer(qNum, name, answer);
			newAnswers.push(newAnswer);
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
			toast.error('Keep it brief! (50 characters)');
		} else if (answers.find((a) => a.answer === answer)) {
			toast.error("You've already submitted that answer!");
		} else {
			valid = true;
		}
		return valid;
	};

	const next = () => {
		if (qNum + 1 >= questions.length) {
			socket.emit('submitAnswers', { room, answers });
			navigate(`/whiteboard`, {
				state: {
					gameData: gameData,
				},
			});
		} else {
			setGameData((prevState) => ({
				...prevState,
				qNum: qNum + 1,
			}));
		}
	};

	return (
		<div className='room-container'>
			<div className='room-body'>
				<RoomHeader room={room} username='Seth' points='1000' />
				<div className='question-box'>
					<div className='room-header'>
						<h2>{questions[qNum].question}</h2>
						<button className='btn success' onClick={next}>
							Next
						</button>
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
						.filter((x) => x.qNum == qNum)
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

			<div className='room-footer'></div>
		</div>
	);
}

export default Question;
