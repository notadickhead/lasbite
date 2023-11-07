import React from 'react';
import Navbar from './navbar';
import Feed from './feed';
import Suggested from './suggested';


export default function Home() {
    return (
        <div className="flex h-full bg-gray-100">
            <div className='md:fixed z-[100] bg-white'>
                <Navbar />
            </div>
            <div className="md:w-[55%] w-full justify-center relative md:left-[17rem]">
                <Feed />
            </div>
            <div className="w-[25%] hidden md:block justify-center relative left-[15rem]">
                <Suggested />
            </div>
        </div>
    );
}
