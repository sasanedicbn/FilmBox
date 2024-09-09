import Input from "../../../components/UI/Input";
import Label from "../../../components/UI/Label";
import LoginHeader from "./LoginHeader";

const Login = () => {
    const LoginData = [
        { type: 'email', value: '', name: 'email', label: 'Email' },
        { type: 'password', value: '', name: 'password', label: 'Password' }
    ];

    return (
        <div className="h-screen flex justify-center items-center w-full">
            <div className="bg-gray-400 w-64 flex flex-col justify-center p-6 rounded-lg shadow-lg">
                <LoginHeader />
                {LoginData.map((data) => (
                    <div key={data.name} className="mb-4">
                        <Input
                            type={data.type}
                            value={data.value}
                            name={data.name}
                            onChange={() => {}}
                            className="w-full mb-2 p-2 border border-gray-300 rounded"
                        />
                        <Label text={data.label} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Login;
