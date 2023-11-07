import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FacebookAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider, facebookProvider} from "../firebase";
import { FaGoogle, FaFacebook } from "react-icons/fa";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
    const res = await signInWithPopup(auth, provider);
    console.log(res);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  }

  const handleFacebookLogin = async () => {
    try {
     const res = await signInWithPopup(auth, facebookProvider);
     console.log(res);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };
 
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
        <p
          className="m-auto h-10 w-auto logo text-5xl text-green-800"
        >LasBite</p>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        
        <h1 className="mt-10 text-center header-text text-2xl">
          Join Us and Share that LasBite
        </h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white p-8 rounded-md shadow-md">
        <form className="space-y-6"  method="POST" onSubmit={handleSubmit}>
       
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <Link to="/password-reset" className="font-semibold text-indigo-600 hover:text-green-500">
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          
    

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign In
            </button>
            </div>
            </form>

            <button onClick={handleGoogleLogin} className="bg-grey-light hover:bg-grey font-semibold py-1.5 px-3 rounded-md mt-2 inline-flex items-center bg-white border-solid border-green-800 border-2 w-full text-center">
                    <div className="inline-flex mx-auto">
                    <FaGoogle className="text-red-600 mr-2 my-auto">

                    </FaGoogle>
                   
                        <span className="m-auto">Sign In with Google</span>
                        </div>
                </button>

                <button onClick={handleFacebookLogin} className="bg-grey-light hover:bg-grey font-semibold py-1.5 px-3 rounded-md mt-2 inline-flex items-center bg-white border-solid border-green-800 border-2 w-full text-center">
                    <div className="inline-flex mx-auto">
                    <FaFacebook className="text-indigo-600 mr-2 my-auto">

                    </FaFacebook>
                   
                        <span className="m-auto">Sign In with Facebook</span>
                        </div>
                </button>
          </div>
      

        <p className="mt-10 text-center text-sm text-gray-500">
          Dont have an account?{' '}
          <Link to={'/register'} className="text-indigo-600 hover:text-green-600 font-semibold">
            Register
          </Link>
        </p>
      </div>

);
};

export default Login;