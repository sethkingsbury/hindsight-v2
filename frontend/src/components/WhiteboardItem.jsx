import Draggable from 'react-draggable';

function WhiteboardItem({ answer }) {
	return (
		<Draggable axis='both' bounds='parent'>
			<div className='whiteboard-item'>{answer}</div>
		</Draggable>
	);
}

export default WhiteboardItem;
