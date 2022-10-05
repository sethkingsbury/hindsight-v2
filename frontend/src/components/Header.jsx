import { Link } from 'react-router-dom';

function Header() {
	return (
		<Link className='link' to='/'>
			<h1 className='text'>Hindsight</h1>
		</Link>
	);
}

export default Header;
