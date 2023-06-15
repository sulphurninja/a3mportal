import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [name, setName] = useState('');

  const handleCreateInternGroup = async () => {
    try {
      const response = await axios.post('/api/internGroup', { name });
      console.log(response.data); // Log the created InternGroup object
      // Clear the input field or perform any other necessary actions
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='p-4 bg-[#1D1817] rounded-md  cursor-pointer transition duration-300 ease-in-out'>
      <h1 className='text-lg font-bold font-mono text-[#FEFEFF] mb-2'>Create New Intern Group</h1>
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='rounded-lg h-12 font-mono px-4 text-black w-72'
      />
      <button className='hover:bg-[#C53131] rounded-lg h-12 w-36 mx-8' onClick={handleCreateInternGroup}>Create</button>
    </div>
  );
};

export default AdminDashboard;
