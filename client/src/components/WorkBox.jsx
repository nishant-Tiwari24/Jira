import React, { useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';

const WorkBox = () => {
  const [heading, setHeading] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  return (
    <div className="bg-gray-800 p-4 py-8 rounded-lg shadow-lg">
      <input
        type="text"
        placeholder="Enter heading..."
        className="w-full bg-transparent text-white font-semibold mb-4 outline-none"
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
      />
      <div>
        {tasks.map((task, index) => (
          <div key={index} className="flex items-center  justify-between bg-gray-700 p-2 mb-2 rounded-md hover:bg-gray-600">
            <span className="text-white">{task}</span>
            <button className="text-gray-400 hover:text-white">
              <FiEdit2 className="h-5 w-5 fill-current" />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center">
        <input
          type="text"
          placeholder="Add new card..."
          className="flex-grow bg-gray-700 p-2 rounded-md outline-none text-white mr-2"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask} className="bg-amber-500 hover:bg-amber-600 p-2 rounded-md text-white font-semibold">
          + Add new card
        </button>
      </div>
    </div>
  );
};

export default WorkBox;