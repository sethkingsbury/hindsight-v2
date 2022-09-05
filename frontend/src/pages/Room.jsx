import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getQuestions } from '../data/questions';
// const { io } = require('socket.io-client');

function Room() {
	const location = useLocation();
	const navigate = useNavigate();
	const [gameData, setGameData] = useState(location.state.gameData);
	var { name, room, users } = gameData;
	// const socket = io('http://localhost:5000/');

	const leave = () => {
		// socket.emit('leaveRoom', { name, room });
		navigate('/');
	};

	const start = () => {
		const questions = getQuestions();
		const game = {
			room: room,
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
		// if (!users.includes(name)) {
		// 	socket.emit('joinRoom', { name, room });
		// }
		// socket.on('userJoined', (newUsers) => {
		// 	setGameData((prevState) => ({
		// 		...prevState,
		// 		users: newUsers,
		// 	}));
		// });
		// socket.on('userDisconnect', (userName) => {
		// 	console.log(`${userName} has left`);
		// });
		// console.log(users);
	}, []);

	return (
		<div className='room-container'>
			<div className='room-header'>
				<button className='btn danger' onClick={leave}>
					Leave Room
				</button>
			</div>
			<div className='room-body'>
				<div className='room-info'>
					<p>Name: {name}</p>
					<p>Room: {room}</p>
					<p>Users:</p>
					<ul>
						{users.map((user) => (
							<li key={user}>{user}</li>
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
