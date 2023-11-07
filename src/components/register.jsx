import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, db, facebookProvider, provider } from "../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import "./styles.css"

export default function Register () {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();

// federated login

const handleGoogleLogin = () => {
  signInWithPopup(auth, provider)
    .then(async (res) => {
      // The signed-in user info.
      
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = provider.credentialFromResult(res);
        const token = credential.accessToken;
        console.log(token);
        // The signed-in user info.
        const user = token.user;
        console.log(user.displayName);
      // Save the user in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        // Add any additional user fields as needed
      });

      console.log('User saved in Firestore');
      navigate("/");
    })
    .catch((err) => {
      setErr(true);
    });
};


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
    const first_name = e.target[0].value;
    const last_name = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;
    const displayName = first_name + " " + last_name;
    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date();
     
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              first_name,
                last_name,
              displayName,
              email,
              date_joined: date,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/login");
        }
         catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        }catch (err) {
          console.log(err);
          setErr(true);
          setLoading(false);
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
            <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
            <div>
                <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900">
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    autoComplete="first_name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    autoComplete="last_name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                 
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              
        

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                 <span>
                 Sign in
                    </span> 
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
              Already have an account?{' '}
<Link to={'/login'} className="text-indigo-600 hover:text-green-600 font-semibold">                Login
              </Link>
            </p>
          </div>
   
  
  );
};

