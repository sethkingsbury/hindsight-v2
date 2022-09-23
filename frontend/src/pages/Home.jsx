import { useNavigate } from 'react-router-dom';
// import { createGameCode } from '../helpers/randomStr';

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
			<h1 className='text'>Welcome</h1>
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
