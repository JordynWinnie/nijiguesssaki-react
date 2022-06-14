import NijiLogo from './nijiguesssaki_logo.png'
import { Link } from 'react-router-dom'
const Header = () => {
    return (
        <nav className='navBar'>
            <Link to="/"><img src={NijiLogo} alt="" /> </Link>
            <ul>
                <li> <Link to="/guess">Guess!</Link> </li>
                <li> <Link to="/setup">Setup</Link> </li>
            </ul>
        </nav>
    );
}

export default Header;