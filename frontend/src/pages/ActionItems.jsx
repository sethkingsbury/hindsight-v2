import '../styles/actionItems.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const { io } = require('socket.io-client');

const ENDPOINT = 'http://localhost:5000/';
// const ENDPOINT = 'https://hindsight.herokuapp.com/';

function ActionItems() {
	const socket = io(ENDPOINT);
	const navigate = useNavigate();

	// State
	const room = localStorage.getItem('room');
	const [actionItems, setActionItems] = useState(
		JSON.parse(localStorage.getItem('actionItems'))
	);

	const next = () => {
		navigate(`/summary`);
	};

	useEffect(() => {
		socket.emit('actionItemRequest', { room });
	}, []);

	useEffect(() => {
		socket.on('actionItemResponse', ({ actionItemRes }) => {
			setActionItems(actionItemRes);
		});
	}, [socket]);

	return (
		<div className='container'>
			<div className='header'>header</div>
			<div className='body'>
				{actionItems.map((item) => (
					<div className='action-item'>{item}</div>
				))}
			</div>
			<div className='footer'>Footer</div>
		</div>
	);
}

export default ActionItems;
