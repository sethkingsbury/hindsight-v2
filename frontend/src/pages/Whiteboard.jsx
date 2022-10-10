import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Draggable from 'react-draggable';
import ColorKey from '../components/ColorKey';
import ActionItemModal from '../components/ActionItemModal';
import { getQuestions } from '../data/questions';
const { io } = require('socket.io-client');

// const ENDPOINT = 'http://localhost:5000/';
const ENDPOINT = 'https://hindsight.herokuapp.com/';
const socket = io(ENDPOINT);

function Whiteboard() {
	const navigate = useNavigate();
	const room = localStorage.getItem('room');
	const name = localStorage.getItem('name');
	const points = localStorage.getItem('points');
	const [answers, setAnswers] = useState([]);
	const questions = getQuestions();
	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		if (localStorage.getItem('reload') === '0') {
			localStorage.setItem('reload', '1');
			window.location.reload();
		}
		socket.emit('joinRoom', { room, name });
		socket.emit('getAnswers', { room });
		socket.emit('actionItemRequest', room);
	}, []);

	useEffect(() => {
		socket.on('actionItemResponse', (actionItemResponse) => {
			localStorage.setItem('actionitems', JSON.stringify(actionItemResponse));
		});

		socket.on('answerList', (answerList) => {
			setAnswers(answerList);
			localStorage.setItem('answers', JSON.stringify([]));
		});

		socket.on('positionUpdateResponse', (newAnswers) => {
			setAnswers([...newAnswers]);
		});
	}, [socket, name, room]);

	const next = () => {
		navigate(`/actionItems`);
	};

	// Whiteboard item Tracking
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const handleDrag = (e, ui) => {
		const { x, y } = position;
		setPosition({
			x: x + ui.deltaX,
			y: y + ui.deltaY,
		});
	};

	const handleDrop = (e, ui) => {
		const payload = {
			room: room,
			answerId: ui.node.id,
			position: {
				x: ui.x,
				y: ui.y,
			},
		};
		socket.emit('positionUpdateRequest', payload);
	};

	const cardColor = (color) => {
		return {
			background: color,
		};
	};

	return (
		<div className='container'>
			{modalOpen && <ActionItemModal setOpenModal={setModalOpen} />}
			<div className='header'>
				<Header
					title='Categorize your answers'
					room={room}
					name={name}
					points={points}
				/>
			</div>
			<div className='body'>
				<div className='whiteboard-container'>
					<div className='whiteboard'>
						{answers.map((answer) => {
							return (
								<Draggable
									key={answer['id']}
									axis='both'
									bounds='parent'
									defaultPosition={answer.position}
									onDrag={handleDrag}
									onStop={handleDrop}
								>
									<div
										id={answer['id']}
										className='whiteboard-item'
										style={cardColor(questions[answer.qNum]['color'])}
									>
										{answer.answer}
									</div>
								</Draggable>
							);
						})}
					</div>
					<div className='key-container'>
						<h3>Key</h3>
						{questions.map((question) => {
							return (
								<div className='key-item' key={question.qNum}>
									<ColorKey questionObj={question} />
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<div className='footer'>
				<button
					className=' btn btn-sm openModalBtn'
					onClick={() => {
						setModalOpen(true);
					}}
				>
					Add Action Item
				</button>
				<button className='btn btn-sm' onClick={next}>
					Next
				</button>
			</div>
		</div>
	);
}

export default Whiteboard;
