import { InputProps } from "../../types/types";

const Input = ({type, name, value, onChange}:InputProps) => {
    return(
        <input type={type} name={name} value={value} onChange={onChange}/>
    )
}
export default Input;