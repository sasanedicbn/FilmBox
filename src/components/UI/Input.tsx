import { InputProps } from "../../types/types";

const Input = ({ type, name, onChange, styleType = 'login', placeholder, ...rest }: InputProps) => {
  const styles = {
    login: 'w-full mb-2 p-2 border border-gray-300 rounded-lg',
    searchFilms: 'w-[220px]  p-1 border rounded-lg bg-gray-300 text-ml pl-2'
  };

  return (
    <input
      className={styles[styleType]}
      type={type}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default Input;
