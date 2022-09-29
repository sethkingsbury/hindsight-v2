import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WhiteboardItem from '../components/WhiteboardItem';
import ColorKey from '../components/ColorKey';
import { getQuestions } from '../data/questions';
const { io } = require('socket.io-client');

const ENDPOINT = 'http://localhost:5000/';
// const ENDPOINT = 'https://hindsight.herokuapp.com/';

function Whiteboard() {
	const navigate = useNavigate();
	const room = localStorage.getItem('room');
	const name = localStorage.getItem('name');
	const [answers, setAnswers] = useState(
		JSON.parse(localStorage.getItem('answers'))
	);
	const questions = getQuestions();

	const socket = io(ENDPOINT);

	useEffect(() => {
		if (localStorage.getItem('reload') === '0') {
			localStorage.setItem('reload', '1');
			window.location.reload();
		}

		socket.emit('joinRoom', { room, name });
		socket.emit('getAnswers', { room });
	}, []);

	useEffect(() => {
		socket.on('answerList', (answerList) => {
			setAnswers(answerList);
			localStorage.setItem('answers', JSON.stringify([]));
		});
	}, [socket, name, room]);

	const next = () => {
		navigate(`/actionItems`);
	};

	return (
		<div className='container'>
			<div className='header'>
				<h2 className='text'>Categorize your answers</h2>
			</div>
			<div className='whiteboard-container'>
				<div className='whiteboard'>
					{answers.map((answer) => {
						return (
							<WhiteboardItem
								key={answer.answer}
								answer={answer}
								color={questions[answer.qNum]['color']}
							/>
						);
					})}
				</div>
				<div className='key-container'>
					<h3>Key</h3>
					{questions.map((question) => {
						return (
							<div className='key-item' key={question.qNum}>
								<ColorKey questionObj={question} />
							</div>
						);
					})}
				</div>
			</div>
			<div className='footer'>
				<button className='btn success' onClick={next}>
					Next
				</button>
			</div>
		</div>
	);
}

export default Whiteboard;
