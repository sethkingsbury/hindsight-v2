import Draggable from 'react-draggable';

function AnswerComponent({ answer }) {
	return (
		<Draggable axis='both' bounds='parent'>
			<div className='answer-container'>{answer}</div>
		</Draggable>
	);
}

export default AnswerComponent;
