import { SelectProps } from "../../types/types";

const Select = ({ name, onChange, children, className }:SelectProps) => {
    return (
        <select
            name={name}
            onChange={onChange}
            className={`p-1 border bg-gray-300 border-gray-300 rounded-lg pointer cursor-pointer ${className}`}
        >
            {children}
        </select>
    );
};

export default Select;
