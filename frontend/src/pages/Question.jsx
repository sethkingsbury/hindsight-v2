import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AnswerItem from '../components/AnswerItem';
import RoomHeader from '../components/RoomHeader';
import { Answer } from '../data/answer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowRight } from 'react-icons/fa';

function Question() {
	const location = useLocation();
	const navigate = useNavigate();
	const [gameData, setGameData] = useState(location.state.gameData);

	const { room, name, users, questions, qNum, answers, answer } = gameData;

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
			const newAnswer = new Answer(qNum, 'me', answer);
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
		} else if (answers.includes(answer.toUpperCase())) {
			toast.error("You've already submitted that answer!");
		} else {
			valid = true;
		}
		return valid;
	};

	const next = () => {
		console.log(qNum + 1);
		console.log(questions.length);
		if (qNum + 1 >= questions.length) {
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
							return <AnswerItem key={answer.answer} answer={answer.answer} />;
						})}
				</div>
			</div>

			<div className='room-footer'></div>
		</div>
	);
}

export default Question;
