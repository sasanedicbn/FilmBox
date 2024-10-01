import { FaBookmark, FaHome, FaSearch, FaStar } from 'react-icons/fa';
import { IconProps } from '../../types/types';

const Icon = ({ name, size = 84, color = 'black', onClick, type = 'none' }: IconProps) => {
  const style = {
    cursor: type === 'pointer' ? 'pointer' : 'default',
  };

  const icons = {
    marked: <FaBookmark size={size} color={color} onClick={onClick} style={style} />, 
    home: <FaHome size={size} color={color} onClick={onClick} style={style} />, 
    search: <FaSearch size={size} color={color} onClick={onClick} style={style} />, 
    star: <FaStar color={color} size={size} style={style} />,
  };

  return icons[name] || null;
};

export default Icon;
