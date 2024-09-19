import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

const NavMenuSection = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex justify-between items-center">
                <li>
                    <Link to='/home' className="text-white text-lg font-bold">FilmBox</Link>
                </li>
                <li>
                    <p className="text-gray-200">Welcome back, {'SASA'}</p>
                </li>
                <li>
                    <Link to='/' className="text-white flex items-center">
                        Log out <span className="ml-2"><FiLogOut /></span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavMenuSection;
