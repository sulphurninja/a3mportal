import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [internGroups, setInternGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, internGroupsResponse] = await Promise.all([
          axios.get('/api/getUsers'),
          axios.get('/api/getInternGroup'),
        ]);

        setUsers(usersResponse.data);
        setInternGroups(internGroupsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const getInternGroupName = (groupId) => {
    const internGroup = internGroups.find((group) => group._id === groupId);
    return internGroup ? internGroup.name : 'Unknown Group';
  };

  return (
    <div className="min-h-screen border-4 text-black font-mono mt-12  flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mt-4 mb-6">User List</h1>
      <div className="w-[90%] grid grid-cols-1 gap-4">
        {users.map((user, index) => (
          <motion.div
            key={user._id}
            className="bg-white text-black p-4 shadow-md rounded-lg flex items-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex-grow">
            <p className={` flex fixed  lg:text-xl text-[10px] ml-[70%]  lg:ml-[40%] ${getInternGroupName(user.groupId) === 'Data Science' ? 'text-green-900' : 'text-amber-800'}`}>
                {getInternGroupName(user.groupId)}
              </p>
              <h2 className="text-xl text-start font-bold mb-2">
                {index + 1}. {user.name}
                
              </h2>
              <p className="text-gray-600 text-start">Username: {user.userName}</p>
              
            </div>
            <span className="ml-auto">{user.active === 'true' ? '🟢' : '🔴'}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Users;
