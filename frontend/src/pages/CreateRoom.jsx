import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGameCode } from '../helpers/randomStr';
import { FaArrowRight } from 'react-icons/fa';

function CreateRoom() {
	const [gameData, setGameData] = useState({
		name: '',
		room: createGameCode(),
	});

	const { name, room } = gameData;
	const navigate = useNavigate();

	const onSubmit = (e) => {
		e.preventDefault();

		localStorage.setItem('name', name);
		localStorage.setItem('room', room);
		navigate(`/room`);
	};

	const onChange = (e) => {
		setGameData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div className='container'>
			<h1 className='text prompt'>Enter your name</h1>
			<form className='form' onSubmit={onSubmit}>
				<input
					className='form-input'
					placeholder='Your name...'
					type='text'
					name='name'
					value={name}
					onChange={onChange}
					required
				/>
				<button className='btn btn-form'>Go</button>
			</form>
		</div>
	);
}

export default CreateRoom;
