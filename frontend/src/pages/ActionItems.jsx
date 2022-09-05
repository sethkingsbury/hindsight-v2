import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ActionItems() {
	const navigate = useNavigate();
	const location = useLocation();
	const [gameData, setGameData] = useState(location.state.gameData);
	const next = () => {
		navigate(`/summary`, {
			state: {
				gameData: gameData,
			},
		});
	};
	return (
		<div className='room-container'>
			<h1>Action Items</h1>
			<div className='room-footer'>
				<button className='btn success' onClick={next}>
					Next
				</button>
			</div>
		</div>
	);
}

export default ActionItems;
