import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { DataContext } from '@/store/GlobalState';


const CreateTutorial = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const [internGroups, setInternGroups] = useState([]);
  const [groupId, setGroupId] = useState('');

  const handleChangeGroupId = (e) => {
    setGroupId(e.target.value);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    // Fetch intern group names when component mounts
    const fetchInternGroups = async () => {
      try {
        const response = await axios.get('/api/getInternGroup');
        setInternGroups(response.data);
        console.log(internGroups, 'intern groups');
      } catch (error) {
        console.error(error);
      }
    };

    fetchInternGroups();
  }, []);

  const handleCreateTask = async () => {
    try {
      const response = await axios.post('/api/tutorials', {
        groupId,
        title,
        description,
      });
      console.log(response.data); // Log the created Task object
      // Clear the input fields or perform any other necessary actions
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border mt-16 rounded p-4">
      <h2 className="text-lg bg-[#1D1817] font-mono font-bold mb-2">Create a New Tutorial</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter Title"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description"
          rows={3}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="groupId">
          Intern Group
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="groupId"
          name="groupId"
          value={groupId}
          onChange={handleChangeGroupId}
        >
          <option value="">Select Intern Group</option>
          {internGroups.map((group) => (
            <option key={group._id} value={group._id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleCreateTask}
        className="bg-[#1D1817] hover:bg-amber-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Create Tutorial
      </button>
    </div>
  );
};

export default CreateTutorial;
