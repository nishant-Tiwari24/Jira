import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import WorkBox from './WorkBox';

const Work = () => {
  const [cards, setCards] = useState([]);

  const addCard = () => {
    setCards([...cards, { id: cards.length + 1 }]);
  };

  return (
    <div className="bg-white w-[100vw] min-h-screen py-8">
      <div className="px-10 mx-auto">
        <nav className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Project Title: Your Work</h1>
            <p className="text-gray-600">Project Description: Manage your tasks here</p>
          </div>
          <button
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md flex items-center"
            onClick={addCard}
          >
            <FiPlus className="mr-2" />
            Add Work
          </button>
        </nav>
        <div className='grid grid-cols-4'>
        {cards.map((card) => (
          
          <div className='py-4 w-96 flex'>
          <WorkBox key={card.id} />
          </div>
          
        ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
