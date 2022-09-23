import { useNavigate } from 'react-router-dom';

function ActionItems() {
	const navigate = useNavigate();

	const next = () => {
		navigate(`/summary`);
	};

	return (
		<div className='room-container'>
			<h1 className='text'>Action Items</h1>
			<div className='room-footer'>
				<button className='btn success' onClick={next}>
					Next
				</button>
			</div>
		</div>
	);
}

export default ActionItems;
