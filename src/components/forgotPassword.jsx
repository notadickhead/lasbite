import React from 'react'
import { Link } from 'react-router-dom';
import {auth } from '../firebase';
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


export default function PasswordReset () {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
    sendPasswordResetEmail(auth, email)
  .then(() => {
    navigate('/newPassword')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    
    if (errorMessage === 'auth/user-not-found') {
        alert('User not found, try again!')
        e.target[0].value = ''
      }
      if (errorCode === 'auth/invalid-email') {
        alert('Invalid email, try again!')
        e.target[0].value = ''
      }
        if (errorCode === 'auth/missing-email') {
            alert('Missing email, try again!')
            e.target[0].value = ''
        }
  });
    }

    return (
       
           
             


         

          
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white p-8 rounded-md shadow-md">
        <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
       
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
            <p className="font-light text-gray-600">
            We’ll send a verification code to this email if it matches an existing LasBite account.
            </p>
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
            <button className='my-2 bg-gray-600 px-5 rounded-full'>
              
               <Link to={'/login'} className='text-white font-semibold'>Back</Link>
                
            </button>
        
        <p>
            Already have an account? <span>
            <Link to={'/login'} className='text-indigo-600 font-semibold'>Sign Up</Link>
            </span>
        </p>
                   
                </div>
     
  
    )
};