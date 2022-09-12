import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WhiteboardItem from '../components/WhiteboardItem';
import ColorKey from '../components/ColorKey';
import { FaRedo } from 'react-icons/fa';
const { io } = require('socket.io-client');

function Whiteboard() {
	const location = useLocation();
	const navigate = useNavigate();
	const [gameData, setGameData] = useState(location.state.gameData);
	const { room, name, users, questions, qNum, answers, answer } = gameData;
	const socket = io('http://localhost:5000/');

	useEffect(() => {
		socket.emit('joinRoom', { room, name });
		socket.emit('getAnswers', { room });
	}, []);

	useEffect(() => {
		socket.on('answerList', (answerList) => {
			setGameData((prevState) => ({
				...prevState,
				answers: answerList,
			}));
		});
	}, [socket]);

	const next = () => {
		navigate(`/actionItems`, {
			state: {
				gameData: gameData,
			},
		});
	};

	const refreshPage = () => {
		window.location.reload(false);
	};

	return (
		<div className='room-container'>
			<div className='room-header'>
				<h2>Categorize your answers</h2>
				<button className='btn success' onClick={next}>
					Next
				</button>
			</div>

			<div className='whiteboard-container'>
				<button className='refresh-whiteboard' onClick={refreshPage}>
					<FaRedo />
				</button>
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
