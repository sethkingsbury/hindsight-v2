import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGameCode } from '../helpers/randomStr';
import { FaArrowRight } from 'react-icons/fa';
const { io } = require('socket.io-client');

function CreateRoom() {
	const [gameData, setGameData] = useState({
		name: '',
		room: createGameCode(),
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
			<h1>Enter your name</h1>
			<form className='form' onSubmit={onSubmit}>
				<input
					className='form-input'
					type='text'
					name='name'
					value={name}
					onChange={onChange}
				/>
				<button className='form-btn'>
					<FaArrowRight />
				</button>
			</form>
		</div>
	);
}

export default CreateRoom;
