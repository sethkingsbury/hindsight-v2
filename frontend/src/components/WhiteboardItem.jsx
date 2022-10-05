import { useState } from 'react';

function WhiteboardItem({ answer, color }) {
	const room = localStorage.getItem('room');

	const styles = {
		colorStyle: {
			background: color,
		},
	};

	return (
		<div className='whiteboard-item' style={styles.colorStyle}>
			{answer.answer}
		</div>
	);
}

export default WhiteboardItem;
