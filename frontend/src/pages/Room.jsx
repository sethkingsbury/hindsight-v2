import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
const { io } = require('socket.io-client');

const ENDPOINT = 'localhost:5000';
// const ENDPOINT = 'https://hindsight.herokuapp.com/';
const socket = io(ENDPOINT);

function Room() {
	const navigate = useNavigate();
	const [room, setRoom] = useState(localStorage.getItem('room'));
	const [name, setName] = useState(localStorage.getItem('name'));
	const [points, setPoints] = useState(0);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		if (!room) {
			navigate('/');
		}

		socket.emit('joinRoom', { room, name });

		socket.on('userList', (users) => {
			setUsers(users);
		});

		socket.on('startGameResponse', (room) => {
			start();
		});
	}, [socket, name, room]);

	const onSubmit = () => {
		socket.emit('startGame', room);
	};

	const start = () => {
		localStorage.setItem('actionItems', JSON.stringify([]));
		localStorage.setItem('answers', JSON.stringify([]));
		localStorage.setItem('reload', '0');
		navigate(`/game`);
	};

	return (
		<div className='container'>
			<div className='header'>
				<Header room={room} name={name} points={points} />
			</div>
			<div className='body'>
				<div className='user-container'>
					{users.map((user) => (
						<div className='user' key={user.id}>
							{user.name}
						</div>
					))}
				</div>
			</div>
			<div className='footer'>
				<button className='btn btn-sm' onClick={onSubmit}>
					Start Retro
				</button>
			</div>
		</div>
	);
}

export default Room;
