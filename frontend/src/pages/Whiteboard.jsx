import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WhiteboardItem from '../components/WhiteboardItem';
import ColorKey from '../components/ColorKey';
import { FaRedo } from 'react-icons/fa';
import questions, { getQuestions } from '../data/questions';
const { io } = require('socket.io-client');

function Whiteboard() {
	const navigate = useNavigate();
	const room = localStorage.getItem('room');
	const name = localStorage.getItem('name');
	const [answers, setAnswers] = useState(
		JSON.parse(localStorage.getItem('answers'))
	);
	const [questions, setQuestions] = useState(getQuestions());
	const socket = io('http://localhost:5000/');

	useEffect(() => {
		if (localStorage.getItem('reload') == '0') {
			localStorage.setItem('reload', '1');
			window.location.reload();
		}

		console.log(answers);

		socket.emit('joinRoom', { room, name });
		socket.emit('getAnswers', { room });
	}, []);

	useEffect(() => {
		socket.on('answerList', (answerList) => {
			console.log(answerList);
		});
	}, [socket]);

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
