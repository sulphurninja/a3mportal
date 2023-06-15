// pages/dashboard.tsx
import { DataContext } from '@/store/GlobalState';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie'
import React, { useContext, useEffect, useState } from 'react';
import { FiHome, FiCheckSquare, FiBookOpen, FiTrendingUp, FiMessageSquare, FiHelpCircle } from 'react-icons/fi';
import axios from 'axios';
import { motion } from 'framer-motion'
import Link from 'next/link';

interface Task {
    _id: string;
    title: string;
    description: string;
}


const Tasks: React.FC = () => {
    const { state, dispatch } = useContext(DataContext);
    const { auth } = state;
    const router = useRouter();


    const handleLogout = () => {
        Cookie.remove('refreshtoken', { path: '/api/auth/refreshToken' })
        localStorage.removeItem('firstLogin')
        dispatch({ type: 'AUTH', payload: {} })
        window.location.href = '/';
    }

    const handleLogoutClick = () => {
        handleLogout();
    };

    const [userName, setUserName] = useState("");
    const [groupId, setGroupId] = useState("");
    const [tasks, setTasks] = useState<Task[]>([]);

    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        if (auth && auth.user && auth.user.name) {
            setUserName(auth.user.name);
        }
    }, [auth]);

    useEffect(() => {
        if (auth && auth.user && auth.user.groupId) {
            setGroupId(auth.user.groupId);
        }
    }, [auth]);

    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            setGreeting("Good Morning");
        } else if (currentHour < 18) {
            setGreeting("Good Afternoon");
        } else {
            setGreeting("Good Evening");
        }
    }, []);

    useEffect(() => {
        const fetchTasks = async () => {
          try {
            const response = await axios.get<Task[]>(`/api/getTasks?groupId=${groupId}`);
            setTasks(response.data);
            console.log(response.data, 'intern groups tasks');
          } catch (error) {
            console.error(error);
          }
        };
      
        if (groupId) {
          fetchTasks();
        }
      }, [groupId]);

    if (!auth.user || auth.user.role === 'admin') {
        return null; // or any loading/error message you want to display
    }


    return (
        <div className="flex min-h-screen text-center bg-gray-100">
            {/* Side Menu */}
            <aside className="w-16 md:w-20 lg:w-24 bg-[#1D1817] text-white">
                <nav className="flex flex-col items-center">
                    <div className="py-4">
                        <Link href='/'>
                        <button className="text-2xl  text-gray-300 hover:text-[#F56565] transition duration-300 ease-in-out">
                            <FiHome className="lg:ml-1" />
                            <span className="hidden text-sm font-bold text-center md:inline">Home</span>
                        </button>
                        </Link>
                    </div>
                    <div className="py-4">
                        <button className="text-2xl text-gray-300 hover:text-[#F56565] transition duration-300 ease-in-out">
                            <FiCheckSquare className="lg:ml-1" />
                            <span className="hidden text-sm text-center font-bold md:inline">Tasks</span>
                        </button>
                    </div>
                    <div className="py-4">
                        <button className="text-2xl text-gray-300 hover:text-[#F56565] transition duration-300 ease-in-out">
                            <FiBookOpen className="lg:ml-3" />
                            <span className="hidden text-xs font-bold text-center md:inline">Tutorials</span>
                        </button>
                    </div>
                    <div className="py-4">
                        <button className="text-2xl text-gray-300 hover:text-[#F56565] transition duration-300 ease-in-out">
                            <FiTrendingUp className="lg:ml-3" />
                            <span className="hidden text-center text-sm font-bold md:inline">Progress</span>
                        </button>
                    </div>
                    <div className="py-4">
                        <button className="text-2xl text-gray-300 hover:text-[#F56565] transition duration-300 ease-in-out">
                            <FiMessageSquare className="lg:ml-5" />
                            <span className="hidden text-sm font-bold md:inline">Discussion</span>
                        </button>
                    </div>
                    <div className="py-4">
                        <button className="text-2xl text-gray-300 hover:text-[#F56565] transition duration-300 ease-in-out">
                            <FiHelpCircle className="lg:ml-1" />
                            <span className="hidden text-sm font-bold md:inline">Help</span>
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1   bg-neutral-300  p-6">
                <header className="flex items-center justify-between mb-6">
                    <div className='w-[10%] h-[10%]'>
                        <img src="/logo.png" alt="Logo" className="h-full w-full" />
                    </div>
                    <h1 className="text-xl font-bold text-black font-mono">{greeting} {userName}!</h1>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleLogoutClick}
                    >
                        Logout
                    </button>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <motion.div
              key={task._id}
              className="bg-white p-4 rounded shadow-md"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h2 className="text-xl text-black font-bold mb-2">{task.title}</h2>
              <p className="text-gray-600">{task.description}</p>
            </motion.div>
          ))}
        </div>
                <footer className='mt-12'>

                    <h1 className='text-black font-mono mt-10 lg:mt-24'> Code that creates an impact, Designs that leave a mark.</h1>

                </footer>

            </main>
        </div>
    );
};

export default Tasks;
