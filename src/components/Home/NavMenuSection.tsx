import { signOut } from "firebase/auth";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../config/firebase";

const NavMenuSection = () => {
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
          await signOut(auth);
          toast.success('The user has been successfully logged out!');
          navigate('/')
        } catch (error) {
          toast.error('Error logging out user!')
        }
      };
      
    return (
        <nav className="bg-gray-800 p-4 w-full max-w-full">
            <ul className="flex justify-between items-center flex-wrap">
                <li>
                    <Link to='/home' className="text-white text-lg font-bold">FilmBox</Link>
                </li>
                <li>
                    <p className="text-gray-200">Welcome back</p>
                </li>
                <li>
                    <Link to={''}  onClick={handleLogout} className="text-white flex items-center">
                        Log out <span className="ml-2"><FiLogOut /></span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavMenuSection;
