import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const { io } = require('socket.io-client');

function JoinRoom() {
	const [gameData, setGameData] = useState({
		name: '',
		room: '',
		users: [],
	});
	const { name, room, users } = gameData;
	const navigate = useNavigate();
	const socket = io('http://localhost:5000/');

	const onSubmit = (e) => {
		e.preventDefault();

		navigate(`/room`, {
			state: {
				gameData: gameData,
			},
		});
	};

	const onChange = (e) => {
		setGameData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div className='container'>
			<h1>Enter retro code</h1>
			<form className='form' onSubmit={onSubmit}>
				<input
					type='text'
					name='name'
					value={name}
					placeholder='Your name...'
					onChange={onChange}
				/>
				<input
					type='text'
					name='room'
					value={room}
					placeholder='Retro code...'
					onChange={onChange}
				/>
				<button className='btn'>Enter</button>
			</form>
		</div>
	);
}

export default JoinRoom;
