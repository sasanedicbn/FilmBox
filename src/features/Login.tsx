import { useState } from "react";
import LoginHeader from "./LoginHeader";
import Signup from "./Signup";
import LoginForm from "./LoginForm";

const Login = () => {
  const [openSignUp, setOpenSignUp] = useState(false);

  const openSignUpHandler = () => {
    setOpenSignUp((state) => !state);
  };

  return (
    <div className="h-screen flex justify-center items-center w-full bg-gray-800">
      <div className="bg-gray-300 w-[425px] h-[95%] flex flex-col justify-center p-10 rounded-lg shadow-lg">
        <LoginHeader />
        {openSignUp ? <LoginForm /> : <Signup />}
        <div className="mt-4 text-center text-gray-800">
          <p>
            Don't have an account?{" "}
            <a href="#" className="text-blue-700" onClick={openSignUpHandler}>
              Sign Up
            </a>
          </p>
          <p className="mt-2">
            Or,{" "}
            <a href="#" className="text-blue-700">
              Log in as guest
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
