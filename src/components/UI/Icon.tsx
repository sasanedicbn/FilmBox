import { FaCheckCircle, FaHome } from 'react-icons/fa';

const Icon = ({ name, size = 24, color = 'black' }) => {
    const icons = {
        check: <FaCheckCircle size={size} color={color} />,
        home: <FaHome size={size} color={color} />,
    };

    return icons[name] || null;
};

export default Icon;
