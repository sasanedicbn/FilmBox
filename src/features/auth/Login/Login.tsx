import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="h-screen flex justify-center items-center w-full bg-gray-800">
      <div className="bg-gray-300 w-[425px] h-120 flex flex-col justify-center p-10 rounded-lg shadow-lg">
        <LoginHeader />
        <LoginForm />
        <div className="mt-4 text-center text-gray-800">
          <p>Don't have an account? <a href="#" className="text-blue-700">Sign Up</a></p>
          <p className="mt-2">Or, <a href="#" className="text-blue-700">Log in as guest</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
