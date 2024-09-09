import { InputProps } from "../../types/types";

const Input = ({type, name, value, onChange, styleType}:InputProps) => {
    const styles = {
        login: 'w-full mb-2 p-2 border border-gray-300 rounded-lg'
    }
    return(
        <input className={styles[styleType]} type={type} name={name} value={value} onChange={onChange}/>
    )
}
export default Input;