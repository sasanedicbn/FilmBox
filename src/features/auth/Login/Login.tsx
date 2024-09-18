import Button from "../../../components/UI/Button";
import Input from "../../../components/UI/Input";
import Label from "../../../components/UI/Label";
import LoginHeader from "./LoginHeader";

const Login = () => {
    const LoginData = [
        { type: 'email', value: '', name: 'email', label: 'Email' },
        { type: 'password', value: '', name: 'password', label: 'Password' }
    ];

    return (
        <div className="h-screen flex justify-center items-center w-full bg-gray-800">
            <div className="bg-gray-300 w-2/6 h-120 flex flex-col justify-center p-10 rounded-lg shadow-lg">
                <LoginHeader />
                {LoginData.map((data) => (
                    <div key={data.name} className="mb-4">
                        <Label text={data.label} />
                        <Input
                            type={data.type}
                            name={data.name}
                            onChange={() => {}}
                            styleType="login"
                        />                      
                    </div>
                ))}
                <Button type="login" onClick={() => {}}>Log in</Button>
                <div className="mt-4 text-center text-gray-800">
                    <p>Don't have an account? <a href="#" className="text-blue-700">Sign Up</a></p>
                    <p className="mt-2">Or, <a href="#" className="text-blue-700">Log in as guest</a></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
