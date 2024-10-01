import { FaBookmark, FaHome, FaSearch, FaStar } from 'react-icons/fa';
import { IconProps } from '../../types/types';

const Icon = ({ name, size = 84, color = 'black', onClick, type='none' }: IconProps) => {
  const style = {
    pointer: type
  }
  const icons = {
    marked: <FaBookmark size={size} color={color} onClick={onClick} className={style[type]} />, 
    home: <FaHome size={size} color={color} onClick={onClick} className={style[type]}/> , 
    search: <FaSearch size={size} color={color} onClick={onClick} className={style[type]}/>, 
    star: <FaStar color={color} size={size} />, 
  };

  return icons[name] || null;
};

export default Icon;
