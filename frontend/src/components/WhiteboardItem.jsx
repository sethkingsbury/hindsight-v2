import Draggable from 'react-draggable';

function WhiteboardItem({ answer, color }) {
	const styles = {
		colorStyle: {
			background: color,
		},
	};

	return (
		<Draggable axis='both' bounds='parent'>
			<div className='whiteboard-item' style={styles.colorStyle}>
				{answer.answer}
			</div>
		</Draggable>
	);
}

export default WhiteboardItem;
