import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function Home() {
	const navigate = useNavigate();

	useEffect(() => {
		localStorage.clear();
	});

	const create = () => {
		navigate('/create');
	};

	const join = () => {
		navigate('/join');
	};

	return (
		<div className='container'>
			<div className='header'>
				<Header />
			</div>
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
