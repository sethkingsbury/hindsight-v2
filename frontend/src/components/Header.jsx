import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Header({ title, room, name, points }) {
	return (
		<>
			<div className='start'>
				<Link className='link' to='/'>
					Hindsight
				</Link>
			</div>
			<div className='middle'>{title}</div>
			<div className='end'>
				<div className='header-item'>
					{room != null && 'Room: '}
					{room}
				</div>
				<div className='header-item'>
					{name != null && 'Name: '}
					{name}
				</div>
				<div className='header-item'>
					{points != null && 'Points: '}
					{points}
				</div>
			</div>
		</>
	);
}

export default Header;
