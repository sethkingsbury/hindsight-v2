import React from 'react';

function RoomHeader({ room, username, points }) {
	return (
		<div className='room-header'>
			<div className='room-details'>
				<p className='text'>Room: {room}</p>
				<p className='text'>Name: {username}</p>
			</div>
			<p className='text'>Points: {points}</p>
		</div>
	);
}

export default RoomHeader;
