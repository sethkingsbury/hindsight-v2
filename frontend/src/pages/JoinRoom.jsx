import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function JoinRoom() {
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();

		localStorage.setItem('name', name);
		localStorage.setItem('room', room);
		navigate(`/room`);
	};

	const nameChange = (e) => {
		setName(e.target.value);
	};

	const roomChange = (e) => {
		setRoom(e.target.value);
	};

	return (
		<div className='container'>
			<div className='header'></div>
			<div className='body'>
				<h1 className='text prompt'>Enter retro code</h1>
				<form className='form' onSubmit={onSubmit}>
					<input
						className='input-md'
						type='text'
						name='name'
						value={name}
						placeholder='Your name...'
						onChange={nameChange}
						required
					/>
					<input
						className='input-md'
						type='text'
						name='room'
						value={room}
						placeholder='Retro code...'
						onChange={roomChange}
						required
					/>
					<button className='btn btn-md'>Enter</button>
				</form>
			</div>
		</div>
	);
}

export default JoinRoom;
