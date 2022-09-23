import { useNavigate } from 'react-router-dom';

function Summary() {
	const navigate = useNavigate();

	const next = () => {
		localStorage.clear();
		navigate(`/`);
	};

	return (
		<div className='room-container'>
			<h1 className='text'>Summary</h1>
			<div className='room-footer'>
				<button className='btn success' onClick={next}>
					End Game
				</button>
			</div>
		</div>
	);
}

export default Summary;
