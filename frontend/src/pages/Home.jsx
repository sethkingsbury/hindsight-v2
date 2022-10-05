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
			<div className='header'></div>
			<div className='body'>
				<h1 className='text title'>Welcome to Hindsight</h1>
				<div className='form'>
					<button className='btn btn-lg' onClick={create}>
						Create Retro
					</button>
					<button className='btn btn-lg' onClick={join}>
						Join Retro
					</button>
				</div>
			</div>
		</div>
	);
}

export default Home;
