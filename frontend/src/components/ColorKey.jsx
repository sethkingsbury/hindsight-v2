function colorKey({ questionObj }) {
	const { question, color } = questionObj;

	const styles = {
		colorStyle: {
			background: color,
		},
	};

	return (
		<div className='color-key'>
			<div className='color-box' style={styles.colorStyle}></div>
			{question}
		</div>
	);
}

export default colorKey;
