import React from 'react';
import { Link } from 'react-router-dom';

function RoomHeader({ room, username, points }) {
	return (
		<div className='header-container'>
			<p className='text text-lg'>Room: {room}</p>
			<p className='text text-lg'>Name: {username}</p>
			<p className='text text-lg'>Points: {points}</p>
		</div>
	);
}

export default RoomHeader;
