import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WhiteboardItem from '../components/WhiteboardItem';
import ColorKey from '../components/ColorKey';

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

			<div className='whiteboard-footer'>
				<div className='key-container'>
					{questions.map((question) => {
						return (
							<div className='key-item'>
								<ColorKey key={question.qNum} questionObj={question} />
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Whiteboard;
