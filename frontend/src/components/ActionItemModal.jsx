import { useState } from 'react';
import '../styles/Modal.css';
const { io } = require('socket.io-client');

const ENDPOINT = 'http://localhost:5000/';
// const ENDPOINT = 'https://hindsight.herokuapp.com/';

function ActionItemModal({ setOpenModal }) {
	const socket = io(ENDPOINT);
	const room = localStorage.getItem('room');
	const [actionItem, setActionItem] = useState('');
	const onSubmit = () => {
		console.log('submitting action item');
		socket.emit('actionItemSubmission', { room, actionItem });
		setOpenModal(false);
	};

	const onChange = (e) => {
		setActionItem(e.target.value);
	};

	return (
		<div className='modal-background'>
			<div className='modal-container'>
				<div className='modal-title'>
					<h3>Are You Sure You Want to Continue?</h3>
				</div>
				<div className='modal-body'>
					<textarea
						className='modal-input'
						cols='40'
						rows='10'
						value={actionItem}
						onChange={onChange}
					></textarea>
				</div>
				<div className='modal-footer'>
					<button
						onClick={() => {
							setOpenModal(false);
						}}
						className='btn btn-sm danger'
					>
						Cancel
					</button>
					<button className='btn btn-sm success' onClick={onSubmit}>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
}

export default ActionItemModal;
