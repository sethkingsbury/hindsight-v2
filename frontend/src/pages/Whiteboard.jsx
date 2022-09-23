import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WhiteboardItem from '../components/WhiteboardItem';
import ColorKey from '../components/ColorKey';
import { getQuestions } from '../data/questions';
const { io } = require('socket.io-client');

// const ENDPOINT = 'http://localhost:5000/';
const ENDPOINT = 'https://hindsight.herokuapp.com/';

function Whiteboard() {
	const navigate = useNavigate();
	const room = localStorage.getItem('room');
	const name = localStorage.getItem('name');
	const answers = JSON.parse(localStorage.getItem('answers'));
	const questions = getQuestions();

	const socket = io(ENDPOINT);

	useEffect(() => {
		console.log('WHITEBOARD -> reload');
		if (localStorage.getItem('reload') === '0') {
			localStorage.setItem('reload', '1');
			window.location.reload();
		}

		socket.emit('joinRoom', { room, name });
		socket.emit('getAnswers', { room });

		socket.on('answerList', (answerList) => {
			console.log(answerList);
		});
	}, [socket, name, room, answers]);

	const next = () => {
		navigate(`/actionItems`);
	};

	return (
		<div className='room-container'>
			<div className='room-header'>
				<h2 className='text'>Categorize your answers</h2>
				<button className='btn success' onClick={next}>
					Next
				</button>
			</div>

			<div className='whiteboard-container'>
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

			<div className='whiteboard-footer'>
				<div className='key-container'>
					{questions.map((question) => {
						return (
							<div className='key-item' key={question.qNum}>
								<ColorKey questionObj={question} />
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Whiteboard;
