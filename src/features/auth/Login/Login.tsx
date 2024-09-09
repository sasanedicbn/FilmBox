import Input from "../../../components/UI/Input";
import Label from "../../../components/UI/Label";
import LoginHeader from "./LoginHeader";

const Login = () => {
    const LoginData = [
        { type: 'email', value: '', name: 'email', label: 'Email' },
        { type: 'password', value: '', name: 'password', label: 'Password' }
    ];

    return (
        <div>
            <LoginHeader />
            {LoginData.map((data) => (
                <>
                <Input
                    key={data.name}  
                    type={data.type}
                    value={data.value}
                    name={data.name}
                    onChange={() => {}}
                />
                <Label data={data.label}/>
                </>
            ))}
        </div>
    );
}

export default Login;

