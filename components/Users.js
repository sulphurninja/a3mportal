import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/getUsers'); // Update the API endpoint if necessary
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">User List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <motion.div
            key={user._id}
            className="bg-white text-black p-4 shadow-md rounded-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-xl font-bold mb-2">{user.name}</h2>
            <p className="text-gray-600">Username: {user.userName}</p>
            <p>Group: {user.groupId}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Users;
