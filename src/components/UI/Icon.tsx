import { FaBookmark, FaHome, FaSearch } from 'react-icons/fa';

const Icon = ({ name, size = 84, color = 'black' }) => {
    const icons = {
        marked: <FaBookmark size={size} color={color} />,
        home: <FaHome size={size} color={color} />,
        search: <FaSearch size={size} color={color}/>
    };

    return icons[name] || null;
};

export default Icon;
