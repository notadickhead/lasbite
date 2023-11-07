import React from 'react';
import ProteinsIcon from '../assets/proteins-icon.png';
import FruitsIcon from '../assets/fruits-icon.png';
import { Link } from 'react-router-dom';

const suggestedItems = [
    {
        id: 1,
        foodIcon: ProteinsIcon,
        creator: 'Jane Doe',
        category: 'Ready Meals'
    },
    {
        id: 2,
        foodIcon: ProteinsIcon,
        creator: 'Jane Doe',
        category: 'Proteins'
    },
    {
        id: 3,
        foodIcon: FruitsIcon,
        creator: 'Jane Doe',
        category: 'Fruits'
    }
]

export default function Suggested () {
  return (
    <div className='py-11'>
      <div className="bg-white rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-4">Suggested Bites</h2>
        {suggestedItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 mb-1">
            <div className="flex items-center">
              <img src={item.foodIcon} alt="Food Icon" className="w-12 h-12 rounded-full" />
              <div className="ml-4">
                <p className="text-sm font-semibold">{item.category}</p>
                <p className="text-sm">{item.creator}</p>
              </div>
            </div>
            <Link to={`/bite/1`}>
              <button className="bg-green-800 text-white rounded-lg py-2 px-4 text-sm">View More</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
