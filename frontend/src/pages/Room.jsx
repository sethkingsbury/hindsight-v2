import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoomHeader from '../components/RoomHeader';
const { io } = require('socket.io-client');

const ENDPOINT = 'localhost:5000';
// const ENDPOINT = 'https://hindsight.herokuapp.com/';

function Room() {
	const navigate = useNavigate();
	const room = localStorage.getItem('room');
	const name = localStorage.getItem('name');
	const [users, setUsers] = useState([]);

	const socket = io(ENDPOINT);

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
	}, [socket, name, room]);

	return (
		<div className='container'>
			<div className='header'>
				<RoomHeader room={room} username={name} points='0' />
			</div>
			<div className='user-container'>
				{users.map((user) => (
					<div className='user' key={user.id}>
						{user.name}
					</div>
				))}
			</div>
			<div className='footer'>
				<button className='btn success' onClick={start}>
					Start Retro
				</button>
			</div>
		</div>
	);
}

export default Room;
