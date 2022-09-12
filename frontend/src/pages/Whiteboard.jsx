import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WhiteboardItem from '../components/WhiteboardItem';

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
			<div className='room-header'>
				<h2>Categorize your answers</h2>
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
		</div>
	);
}

export default Whiteboard;
