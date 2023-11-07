import React from 'react';
import Navbar from './navbar';
import Suggested from './suggested';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import Food from '../assets/sample.png';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { db, storage } from '../firebase';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default function BiteDetails() {
  let { id } = useParams();
const {currentUser} = useContext(AuthContext);


    




  const biteDetails = {
    id: 1,
    imageUrl: Food,
    rating: 4.5,
    author: "Jane Doe",
    itemName: 'Vegan Cheese',
    brand: 'Orgain',
    condition: 'New',
    dietType: 'Gluten Free, Vegan, Plant based',
    description: 'Orgain Vegan cheese is 100% plant based and has no allergies. It is soft and does not taste like plant based so non-vegan also like it. Some ingredient are',
  };


  
  return (
    <div className="flex h-full bg-gray-100">
        <div className='md:fixed z-[100] bg-white'>
            <Navbar />
        </div>
        <div className="md:w-[55%] w-full justify-center relative md:left-[15rem]">
            <div className="text-center mt-10">
                <img
                    src={biteDetails.imageUrl}
                    alt="Food"
                    className="w-auto h-64 rounded-md mx-auto"
                />
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 mb-2 w-2/5 relative -top-[2rem] left-2/4 transform -translate-x-1/2">
                <div className="flex items-center">
                    <FaStar className="text-green-800 mr-1" />
                    <span>{biteDetails.rating} Rated by 409 People in Kigali</span>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 mb-10 w-3/5 left-1/4 mx-auto">
                <h2 className="text-xl font-semibold mb-2 text-center">Details</h2>
                <div>
                    <div>
                        <span className='font-bold mr-2'>Item: </span>
                        {biteDetails.itemName}
                    </div>
                    <div>
                        <span className='font-bold mr-2'>Brand:</span> 
                        {biteDetails.brand}
                    </div>
                    <div>
                        <span className='font-bold mr-2'>Condition:</span> 
                        {biteDetails.condition}
                    </div>
                    <div>
                        <span className='font-bold mr-2'>Diet Type:</span> 
                        {biteDetails.dietType}
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 mb-10 w-3/5 left-1/4 mx-auto">
                <h2 className="text-xl font-semibold mb-2 text-center">Description</h2>
                <div>
                    <span className='text-gray-500 text-center'>{biteDetails.description}</span>
                </div>
            </div>
            <div className="text-center mt-4 mb-6">
                <button className='bg-green-800 text-white rounded-lg py-2 px-4'>Start Chat with {biteDetails.author}</button>
            </div>
        </div>
        <div className="w-[25%] hidden md:block justify-center relative left-[13rem]">
            <Suggested />
        </div>
    </div>
  );
}