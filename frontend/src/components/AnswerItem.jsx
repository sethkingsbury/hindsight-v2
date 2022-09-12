function AnswerItem({ answer, color }) {
	const styles = {
		colorStyle: {
			background: color,
		},
	};

	return (
		<div className='whiteboard-item' style={styles.colorStyle}>
			{answer}
		</div>
	);
}

export default AnswerItem;
