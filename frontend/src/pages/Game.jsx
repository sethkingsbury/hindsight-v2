import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const { io } = require('socket.io-client');

function Game() {
	const navigate = useNavigate();
	const [ready, setReady] = useState(false);
	const room = localStorage.getItem('room');
	const name = localStorage.getItem('name');
	const answers = JSON.parse(localStorage.getItem('answers'));
	const socket = io('http://localhost:5000/');

	useEffect(() => {
		if (localStorage.getItem('reload') == '0') {
			localStorage.setItem('reload', '1');
			window.location.reload();
		}

		socket.emit('joinRoom', { room, name });

		socket.on('toWhiteboard', () => {
			localStorage.setItem('reload', '0');
			socket.emit('submitAnswers', { room, answers });
			navigate(`/whiteboard`);
		});
	}, [socket]);

	const submit = (qNum) => {
		localStorage.setItem('qNum', JSON.stringify(qNum));
		navigate(`/question`);
	};

	const toggleReady = () => {
		socket.emit('ready', { room, name });
		if (ready) {
			setReady(false);
		} else {
			setReady(true);
		}
	};

	return (
		<div className='game-container'>
			<div className='star-container'></div>
			<button className='btn game-btn star-1' onClick={() => submit(0)}>
				Start
			</button>
			<button className='btn game-btn star-2' onClick={() => submit(1)}>
				More of
			</button>
			<button className='btn game-btn star-3' onClick={() => submit(2)}>
				Continue
			</button>
			<button className='btn game-btn star-4' onClick={() => submit(3)}>
				Less of
			</button>
			<button className='btn game-btn star-5' onClick={() => submit(4)}>
				Stop
			</button>
			<button
				className={
					ready
						? 'btn game-btn ready-btn success'
						: 'btn game-btn ready-btn danger'
				}
				onClick={toggleReady}
			>
				{ready ? 'Ready' : 'Unready'}
			</button>
		</div>
	);
}

export default Game;
