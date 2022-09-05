import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGameCode } from '../helpers/randomStr';

function CreateRoom() {
	const [gameData, setGameData] = useState({
		name: '',
		room: createGameCode(),
		users: [],
	});
	const { name, room, users } = gameData;
	const navigate = useNavigate();

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
				<input type='text' name='name' value={name} onChange={onChange} />
				<button className='btn'>Enter</button>
			</form>
		</div>
	);
}

export default CreateRoom;
