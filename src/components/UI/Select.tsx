
interface SelectProps {
    name: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    children: React.ReactNode; 
    value?: string;
    className?: string;
}

const Select = ({ name, onChange, children, value, className }:SelectProps) => {
    return (
        <select
            name={name}
            value={value}
            onChange={onChange}
            className={`p-2 border border-gray-300 rounded-lg ${className}`}
        >
            {children}
        </select>
    );
};

export default Select;
