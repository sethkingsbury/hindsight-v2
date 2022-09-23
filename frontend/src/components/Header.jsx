import { Link } from 'react-router-dom';

function Header() {
	return (
		<div className='header'>
			<Link className='link' to='/'>
				<h3 className='text'>Hindsight</h3>
			</Link>
		</div>
	);
}

export default Header;
