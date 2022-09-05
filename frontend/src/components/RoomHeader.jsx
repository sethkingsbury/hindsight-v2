import React from 'react';

function RoomHeader({ room, username, points }) {
	return (
		<div className='room-header'>
			<div className='room-details'>
				<p>Room: {room}</p>
				<p>Name: {username}</p>
			</div>
			<p>Points: {points}</p>
		</div>
	);
}

export default RoomHeader;
