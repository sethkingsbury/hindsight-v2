import { useEffect } from 'react';
import Header from '../components/Header';
const { io } = require('socket.io-client');

const ENDPOINT = 'http://localhost:5000/';
// const ENDPOINT = 'https://hindsight.herokuapp.com/';
const socket = io(ENDPOINT);

function ActionItems() {
	const room = localStorage.getItem('room');
	const name = localStorage.getItem('name');
	const points = localStorage.getItem('points');
	const actionItems = JSON.parse(localStorage.getItem('actionitems'));

	return (
		<div className='container'>
			<div className='header'>
				<Header
					title='Categorize your answers'
					room={room}
					name={name}
					points={points}
				/>
			</div>
			<div className='body'>
				{actionItems.map((actionItem) => {
					return (
						<div key={actionItem} className='action-item'>
							{actionItem}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ActionItems;
