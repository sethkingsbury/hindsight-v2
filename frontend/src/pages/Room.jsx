import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getQuestions } from '../data/questions';
import RoomHeader from '../components/RoomHeader';
const { io } = require('socket.io-client');

function Room() {
	const location = useLocation();
	const navigate = useNavigate();
	const room = localStorage.getItem('room');
	const name = localStorage.getItem('name');
	const [users, setUsers] = useState([]);
	const socket = io('http://localhost:5000/');

	const start = () => {
		localStorage.setItem('answers', JSON.stringify([]));
		localStorage.setItem('reload', '0');
		navigate(`/game`);
	};

	useEffect(() => {
		socket.emit('joinRoom', { room, name });

		socket.on('userList', (users) => {
			setUsers(users);
		});
	}, [socket]);

	return (
		<div className='room-container'>
			<div className='room-header'>
				<RoomHeader room={room} username={name} points='0' />
			</div>
			<div className='room-body'>
				{users.map((user) => (
					<div className='user' key={user.id}>
						{user.name}
					</div>
				))}
			</div>
			<div className='room-footer'>
				<button className='btn success' onClick={start}>
					Start Retro
				</button>
			</div>
		</div>
	);
}

export default Room;
