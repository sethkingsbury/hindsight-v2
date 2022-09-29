function colorKey({ questionObj }) {
	const { short, color } = questionObj;

	const styles = {
		colorStyle: {
			background: color,
		},
	};

	return (
		<div className='color-key'>
			<div className='color-box' style={styles.colorStyle}></div>
			{short}
		</div>
	);
}

export default colorKey;
