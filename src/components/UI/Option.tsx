
interface OptionProps {
    value: string; 
    children: React.ReactNode; 
}

const Option = ({ value, children }:OptionProps) => {
    return <option value={value}>{children}</option>;
};

export default Option;
