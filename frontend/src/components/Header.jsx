import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className='header'>
      <Link className='link' to='/'>
        Hindsight
      </Link>
    </div>
  );
}

export default Header;
