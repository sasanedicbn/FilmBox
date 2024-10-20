
const Button = ({ type, children, onClick, disabled = false }:ButtonProps) => {
    const base = 'w-full py-2.5 px-5 text-center no-underline cursor-pointer rounded';

    const styles = {
      login: `${base} bg-blue-500 text-white hover:bg-blue-600 mt-2 rounded-lg`,
      pagination: `bg-blue-500 text-white px-4 py-2 rounded`,
    };

    return (
        <button className={styles[type]} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;
