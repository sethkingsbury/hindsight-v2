import { useNavigate } from 'react-router-dom';

function Home() {
	const navigate = useNavigate();

	const create = () => {
		navigate('/create');
	};

	const join = () => {
		navigate('/join');
	};

	return (
		<div className='container'>
			<h1 className='text title'>Welcome to Hindsight</h1>
			<div className='form'>
				<button className='btn' onClick={create}>
					Create Retro
				</button>
				<button className='btn' onClick={join}>
					Join Retro
				</button>
			</div>
		</div>
	);
}

export default Home;
