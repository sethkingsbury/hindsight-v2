import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const { io } = require('socket.io-client');

const ENDPOINT = 'http://localhost:5000/';
// const ENDPOINT = 'https://hindsight.herokuapp.com/';

function Game() {
	const navigate = useNavigate();
	const [ready, setReady] = useState(false);
	const room = localStorage.getItem('room');
	const name = localStorage.getItem('name');
	const answers = JSON.parse(localStorage.getItem('answers'));

	const socket = io(ENDPOINT);

	useEffect(() => {
		if (localStorage.getItem('reload') === '0') {
			localStorage.setItem('reload', '1');
			window.location.reload();
		}

		socket.emit('joinRoom', { room, name });

		socket.on('toWhiteboard', () => {
			localStorage.setItem('reload', '0');
			navigate(`/whiteboard`);
		});
	}, [socket, navigate, room, name, answers]);

	const submit = (qNum) => {
		localStorage.setItem('qNum', JSON.stringify(qNum));
		navigate(`/question`);
	};

	const submitAnswers = () => {
		setReady(true);
		const randomTimeout = Math.random() * 1000;
		setTimeout(() => {
			socket.emit('submitAnswers', { room, answers });
			socket.emit('ready', { room, name });
		}, randomTimeout);
	};

	const toggleReady = () => {
		confirmAlert({
			title: 'Submit Answers',
			message: "Are you sure you've finished answering all the questions?",
			buttons: [
				{
					label: 'Yes',
					onClick: () => submitAnswers(),
				},
				{
					label: 'No',
					onClick: () => null,
				},
			],
		});
	};

	return ready ? (
		<h1 className='text'>Waiting on team members</h1>
	) : (
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
