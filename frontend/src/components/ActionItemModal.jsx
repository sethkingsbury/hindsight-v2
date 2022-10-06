import '../styles/Modal.css';

function ActionItemModal({ setOpenModal }) {
	return (
		<div className='modal-background'>
			<div className='modal-container'>
				<div className='modal-title'>
					<h3>Are You Sure You Want to Continue?</h3>
				</div>
				<div className='modal-body'>
					<textarea className='modal-input' cols='40' rows='10'></textarea>
				</div>
				<div className='modal-footer'>
					<button
						onClick={() => {
							setOpenModal(false);
						}}
						className='btn btn-sm danger'
					>
						Cancel
					</button>
					<button className='btn btn-sm success'>Confirm</button>
				</div>
			</div>
		</div>
	);
}

export default ActionItemModal;
