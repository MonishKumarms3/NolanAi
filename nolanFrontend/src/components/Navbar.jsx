import { Link } from "react-router-dom";
import script from '../assets/script.svg'; 
import login from '../assets/login.png';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
        <img src={script} alt="NolanAI Logo" className="nolanIcon" />
        <div className="nav-links">
            <Link to="/about-us" clas>About Us</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/feature">Feature</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/education">Education</Link>
            <Link to="/studios">Studios</Link>
            <Link to="/login">
                <img src={login} alt="Login" className="loginIcon" />
            </Link>
            
        </div>
    </nav>
  );
}

export default Navbar;
