// Button.tsx
import { ButtonProps } from "../../types/types";

const Button = ({ type, children, onClick, disabled = false }: ButtonProps) => {
    const base = 'w-full py-2.5 px-5 text-center no-underline cursor-pointer rounded';

    const styles = {
        login: `${base} bg-blue-500 text-white hover:bg-blue-600 mt-2 rounded-lg`,
        pagination: `bg-blue-500 text-white px-4 py-2 rounded`,
        upload: `py-2.5 px-5 text-center no-underline cursor-pointer rounded w-[25%] my-8 mt-4 ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-lg`,
    };

    return (
        <button
            className={styles[type]}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
