import React, {useState} from 'react';
import Avatar from '../assets/avatar.png';
import { FaHeart, FaShare, FaStar } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Proteins from '../assets/proteins.png';
import { Link } from 'react-router-dom';
import Suggested from './suggested';
import Navbar from './navbar';

export default function Profile(){
    const [likes, setLikes] = useState(0);
    const [shares, setShares] = useState(0);

    const handleLikeClick = () => {
        setLikes(likes + 1);
      };
    const handleShareClick = () => {
        setShares(shares + 1);
    };

    const savedBites = [
        {   id: 1, 
            name: 'Lorem Ipsum', 
            description: 'Lorem ipsum dolor sit amet,siamet', 
            image: Proteins, 
            creator: "Jane Doe",
            createrAvatar: Avatar,
            rating: 4.5,
            distance: '2km'
        },
    ];

  return (
    <div className="flex h-screen bg-gray-100">
        <div className='md:fixed z-[100] bg-white'>
            <Navbar />
        </div>
        <div className="md:w-[55%] w-full justify-center relative md:left-[16rem]">
            <h2 className="text-xl font-semibold mt-10 lg:ml-20 md:ml-1 mb-6">My Saved Bites</h2>
            <div className='flex flex-col items-center mb-6'>
            {savedBites.map((bite) => (
                <div key={bite.id} className='bg-white rounded-lg shadow-md mb-4 w-full lg:w-4/5'>
                    <div className='flex flex-row-reverse justify-between items-center'>
                        <div className='text-center sm:text-right relative right-5 top-3'>
                            <span className='text-gray-600 text-base flex items-center'>
                            <FaHeart
                                className={`mr-1 cursor-pointer ${likes > 0 ? 'text-green-700' : ''}`}
                                onClick={handleLikeClick}
                            />
                            {likes}
                            <FaShare
                                className='ml-2 mr-1 cursor-pointer text-green-700'
                                onClick={handleShareClick}
                            />
                            </span>
                        </div>
                        <div className='relative text-center sm:text-left left-[16rem] top-7'>
                            <div className='flex items-center'>
                            <img src={bite.createrAvatar} alt='Avatar' className='w-18 h-18 rounded-full inline-block' />
                            <div className='flex flex-col ml-2'>
                                <span className='text-sm font-semibold'>{bite.creator}</span>
                                <div className='flex items-center'>
                                <span className='text-sm font-semibold'>{bite.rating}</span>
                                <span className='text-green-700 ml-1 flex items-center'>
                                    <FaStar className='inline-block mr-1' />
                                </span>
                                </div>
                            </div>
                            </div>
                        </div>   
                    </div>
                    <div className='flex flex-col mt-4 sm:flex-row'>
                        <img src={bite.image} alt={bite.name} className='relative left-10 bottom-10 w-auto h-[13rem] object-cover rounded-lg' />
                        <div className='relative left-16 top-6 mt-2 sm:mt-0 ml-0 sm:ml-4 flex flex-col'>
                            <span className='text-lg sm:text-xl font-semibold text-left'>{bite.name}</span>
                            <span className='text-gray-500 mt-2 text-center'>{bite.description}</span>
                            <div className='text-center mt-2 text-base'>
                                <span className='text-gray-600 text-sm flex items-center'>
                                    <FaMapMarkerAlt className='mr-1' />
                                    {bite.distance} away
                                </span>
                            </div>
                            <div className='flex mt-4 justify-center relative right-7'>
                                <button className='bg-green-800 text-white rounded-lg py-2 px-4 mr-4'>Take a Bite</button>
                                <Link to={`/bite/${bite.id}`}>
                                    <button className='bg-gray-300 text-gray-600 rounded-lg py-2 px-4'>Details</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
        <div className="w-[25%] hidden md:block justify-center relative left-[15rem]">
            <Suggested />
        </div>
    </div>
  );
};