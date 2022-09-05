import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';
import AnswerComponent from '../components/AnswerComponent';

function Whiteboard() {
	const location = useLocation();
	const navigate = useNavigate();
	const [gameData, setGameData] = useState(location.state.gameData);
	const { room, questions, qNum, answers, answer } = gameData;

	const next = () => {
		navigate(`/actionItems`, {
			state: {
				gameData: gameData,
			},
		});
	};

	return (
		<div className='room-container'>
			<h1>Whiteboard</h1>
			<div className='whiteboard-container'>
				{answers.map((answer) => {
					return <AnswerComponent key={answer.answer} answer={answer.answer} />;
				})}
			</div>
			<div className='room-footer'>
				<button className='btn success' onClick={next}>
					Next
				</button>
			</div>
		</div>
	);
}

export default Whiteboard;
