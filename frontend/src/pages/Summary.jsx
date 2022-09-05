import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Summary() {
	const navigate = useNavigate();
	const location = useLocation();
	const [gameData, setGameData] = useState(location.state.gameData);
	const next = () => {
		navigate(`/`);
	};
	return (
		<div className='room-container'>
			<h1>Summary</h1>
			<div className='room-footer'>
				<button className='btn success' onClick={next}>
					Next
				</button>
			</div>
		</div>
	);
}

export default Summary;
