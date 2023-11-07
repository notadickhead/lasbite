import React, { useState } from 'react';
import FoodIcon from '../assets/food-icon.png';
import NutsIcon from '../assets/nuts.png';
import FruitsIcon from '../assets/fruits-icon.png';
import ProteinsIcon from '../assets/proteins-icon.png';
import Proteins from '../assets/proteins.png';
import Fruits from '../assets/fruits.png';
import Avatar from '../assets/avatar.png';
import { FaHeart, FaShare, FaStar } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

export default function Feed() {
  const [searchQuery, setSearchQuery] = useState('');
  const [likes, setLikes] = useState(0);
  const [shares, setShares] = useState(0);
  const [requestedLikes, setReqLikes] = useState(0);
  const [requestedShares, setReqShares] = useState(0);

  const handleLikeClick = () => {
    setLikes(likes + 1);
  };

  const handleShareClick = () => {
    setShares(shares + 1);
  };

  const handleLikesClick = () => {
    setReqLikes(requestedLikes + 1);
  };

  const handleSharesClick = () => {
    setReqShares(requestedShares + 1);
  };

  const foodCategories = [
    { id: 1, name: 'Vegetables', icon: FoodIcon },
    { id: 2, name: 'Fruits', icon: FruitsIcon },
    { id: 3, name: 'Proteins', icon: ProteinsIcon},
    { id: 4, name: 'Nuts&Seeds', icon: NutsIcon },
    { id: 5, name: 'Spices', icon: NutsIcon },
    { id: 6, name: 'Dairy', icon: ProteinsIcon },
    { id: 7, name: 'Vegan', icon: FoodIcon },
    { id: 8, name: 'ReadyMeals', icon: ProteinsIcon },
  ];

  const sharedBites = [
    { id: 1, 
      name: 'Lorem Ipsum', 
      description: 'Lorem ipsum dolor sit amet,siamet', 
      image: Proteins, 
      creator: "Jane Doe",
      createrAvatar: Avatar,
      rating: 4.5,
      distance: '2km'
    },
  ];

   const requestedBites = [
    { id: 1, 
      name: 'Lorem Ipsum', 
      description: 'Lorem ipsum dolor sit amet,siamet', 
      image: Fruits,
      creator: "Jane Doe",
      createrAvatar: Avatar,
      rating: 4.7,
      distance: '2km'
    },
  ];

  const filteredCategories = foodCategories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchClick = () => {
    const matchingCategories = foodCategories.filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log(matchingCategories);
  };

  return (
    <div className='px-10 sm:px-20 md:px-6'>
      <div className="relative">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search food items"
            className="lg:w-4/5 lg:ml-[3.7rem] w-full border text-sm border-gray-300 rounded-lg px-6 p-3 mb-6 mt-20 md:mt-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={handleSearchClick}
            style={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
          />
          <div className="absolute lg:right-[15%] right-8 md:top-[60%] top-[68%] transform -translate-y-1/2 p-2 rounded-full bg-green-700">
            <FaSearch className="text-white text-sm cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Food Categories Section */}
      <h2 className="text-xl font-semibold lg:ml-16 md:ml-1 mb-2">Bite Categories</h2>
      <div className='flex w-full lg:w-4/5 lg:ml-16 overflow-x-auto shadow-md mb-6 bg-white rounded-lg' style={{ overflowX: 'auto' }}>
        <div className='flex space-x-4 p-2' style={{ flexWrap: 'no-wrap' }}> 
          {filteredCategories.map((category) => (
            <div key={category.id} className='w-1/5 p-2'>
              <div className='text-center cursor-pointer'>
                <div className="w-14 h-14 mx-auto overflow-hidden">
                  <img src={category.icon} alt={category.name} className='w-full h-full' /> 
                </div>
                <span className='block text-sm font-semibold'>{category.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-6 lg:ml-16 md:ml-1 ">Shared Bites</h2>
      {/* Shared Bites Section */}
      <div className='flex flex-col items-center mb-6'>
        {sharedBites.map((bite) => (
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

      <h2 className="text-xl font-semibold mb-6 md:ml-1 lg:ml-16">Requested Bites</h2>
      <div className='flex flex-col items-center mb-6'>
        {requestedBites.map((bite) => (
          <div key={bite.id} className='bg-white rounded-lg shadow-md mb-4 w-full lg:w-4/5'>
            <div className='flex flex-row-reverse justify-between items-center'>
              <div className='text-center sm:text-right relative right-5 top-3'>
                <span className='text-gray-600 text-base flex items-center'>
                  <FaHeart
                    className={`mr-1 cursor-pointer ${requestedLikes > 0 ? 'text-green-800' : ''}`}
                    onClick={handleLikesClick}
                  />
                  {requestedLikes}
                  <FaShare
                    className='ml-2 mr-1 cursor-pointer text-green-700'
                    onClick={handleSharesClick}
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
                      <span className='text-green-800 ml-1 flex items-center'>
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
  );
}
