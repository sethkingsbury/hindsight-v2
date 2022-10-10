import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
const { io } = require('socket.io-client');

const ENDPOINT = 'http://localhost:5000/';
// const ENDPOINT = 'https://hindsight.herokuapp.com/';
const socket = io(ENDPOINT);

function ActionItems() {
	const navigate = useNavigate();

	const room = localStorage.getItem('room');
	const name = localStorage.getItem('name');
	const points = localStorage.getItem('points');
	const pointsTotal = parseInt(localStorage.getItem('total'));
	const actionItems = JSON.parse(localStorage.getItem('actionitems'));

	const onSubmit = () => {
		navigate('/');
	};

	return (
		<div className='container'>
			<div className='header'>
				<Header room={room} name={name} points={points} />
			</div>
			<div className='body'>
				<div className='summary'>
					<h1>Final Team Score : {pointsTotal}</h1>
				</div>
				{actionItems.map((actionItem) => {
					return (
						<div key={actionItem} className='action-item'>
							{actionItem}
						</div>
					);
				})}
			</div>
			<div className='footer'>
				<button className='btn btn-sm' onClick={onSubmit}>
					Finish
				</button>
			</div>
		</div>
	);
}

export default ActionItems;
