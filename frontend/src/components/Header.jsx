import { Link } from 'react-router-dom';

function Header() {
	return (
		<div className='header-container'>
			<div className='header'>
				<Link className='link' to='/'>
					<h1 className='text'>Hindsight</h1>
				</Link>
			</div>
		</div>
	);
}

export default Header;
