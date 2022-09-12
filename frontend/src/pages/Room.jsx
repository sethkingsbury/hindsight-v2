import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getQuestions } from '../data/questions';
import RoomHeader from '../components/RoomHeader';
const { io } = require('socket.io-client');

function Room() {
	const location = useLocation();
	const navigate = useNavigate();
	const [gameData, setGameData] = useState(location.state.gameData);
	var { name, room, users } = gameData;
	const socket = io('http://localhost:5000/');

	const start = () => {
		const questions = getQuestions();
		const game = {
			room: room,
			name: name,
			users: users,
			questions: questions,
			qNum: 0,
			answers: [],
			answer: '',
		};

		navigate(`/question`, {
			state: {
				gameData: game,
			},
		});
	};

	useEffect(() => {
		socket.emit('joinRoom', { room, name });

		socket.on('userList', (users) => {
			setGameData((prevState) => ({
				...prevState,
				users: users,
			}));
		});
	}, [socket]);

	return (
		<div className='room-container'>
			<div className='room-header'>
				<RoomHeader room={room} username={name} points='1000' />
			</div>
			<div className='room-body'>
				<div className='room-info'>
					<p>Users</p>
					<ul>
						{users.map((user) => (
							<li key={user.id}>{user.name}</li>
						))}
					</ul>
				</div>
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
