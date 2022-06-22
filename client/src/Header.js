import NijiLogo from './nijiguesssaki_logo.png'
import { Link } from 'react-router-dom'
const Header = () => {
    return (
        <nav className='flex justify-between bg-gray-800 p-4'>
            <Link to='/'><img src={NijiLogo} alt="" /> </Link>
            <ul className='text-white flex items-center gap-6 text-xl'>
                <li> <Link to="/guess">Guess!</Link> </li>
                <li> <Link to="/setup">Setup</Link> </li>
            </ul>
        </nav>
    );
}

export default Header;