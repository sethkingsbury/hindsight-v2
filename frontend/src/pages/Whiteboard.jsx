import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';
import ColorKey from '../components/ColorKey';
import ActionItemModal from '../components/ActionItemModal';
import { getQuestions } from '../data/questions';
const { io } = require('socket.io-client');

const ENDPOINT = 'http://localhost:5000/';
// const ENDPOINT = 'https://hindsight.herokuapp.com/';

function Whiteboard() {
	const navigate = useNavigate();
	const room = localStorage.getItem('room');
	const name = localStorage.getItem('name');
	const [answers, setAnswers] = useState([]);
	const questions = getQuestions();
	const [modalOpen, setModalOpen] = useState(false);

	const socket = io(ENDPOINT);

	useEffect(() => {
		if (localStorage.getItem('reload') === '0') {
			localStorage.setItem('reload', '1');
			window.location.reload();
		}

		socket.emit('joinRoom', { room, name });
		socket.emit('getAnswers', { room });
	}, [answers]);

	useEffect(() => {
		socket.on('answerList', (answerList) => {
			setAnswers(answerList);
			localStorage.setItem('answers', JSON.stringify([]));
		});

		socket.on('positionUpdateResponse', ({ newAnswers }) => {
			console.log('answer list updated');
			setAnswers([...newAnswers]);
		});

		socket.on('updateActionItems', ({ actionItems }) => {
			console.log('action items updated');
			localStorage.setItem('actionItems', JSON.stringify(actionItems));
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
				<h1 className='text prompt'>Categorize your answers</h1>
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
