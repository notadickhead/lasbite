import React from 'react';
import Avatar from '../assets/avatar.png';
import { Link } from 'react-router-dom';

export default function Message(){

    const chatData = [
        {
            id: 1,
            profile: Avatar,
            name: "Jean Paul",
            lastChat: "Hi"
        },
        {
            id: 2,
            profile: Avatar,
            name: "Keza Maya",
            lastChat: "Hi there"
        },
        {
            id: 3,
            profile: Avatar,
            name: "James Soufal",
            lastChat: "Hi"
        },
        {
            id: 4,
            profile: Avatar,
            name: "Angelina Angelina",
            lastChat: "Is this still available?"
        },
        {
            id: 5,
            profile: Avatar,
            name: "Jean Baptiste",
            lastChat: "Looks good"
        }
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-1/4 bg-white p-4 border-r">
                <h2 className="text-xl font-semibold mb-4">Your Conversations</h2>
                <div className="overflow-y-auto h-4/5">
                    {chatData.map((chat, index) => (
                        <div key={index} className="p-2 mb-2 hover:bg-gray-200 rounded cursor-pointer">
                            <div className="flex items-center">
                                <img
                                    src={chat.profile}
                                    alt={`Chat Icon for ${chat.name}`}
                                    className="w-10 h-10 rounded-full mr-4"
                                />
                                <div>
                                    <p className="font-semibold">{chat.name}</p>
                                    <p className="text-gray-500">{chat.lastChat}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-3/4 bg-gray-200">
                <div className="p-4 flex justify-between items-center border-b">
                    <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-6 w-6 mr-2 transform rotate-180"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.293 4.293a1 1 0 011.414 0L13 9.586V7a1 1 0 012 0v4a1 1 0 01-1 1H7a1 1 0 010-2h2.586l-5.293-5.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Back
                    </Link>
                </div>
                <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-12 w-12 mx-auto text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <p className="text-xl font-semibold mt-4">Your conversations</p>
                </div>
            </div>
        </div>
    );
};