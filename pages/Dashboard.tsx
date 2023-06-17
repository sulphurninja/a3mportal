// pages/dashboard.tsx
import { DataContext } from '@/store/GlobalState';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie'
import React, { useContext, useEffect, useState } from 'react';
import { FiHome, FiCheckSquare, FiBookOpen, FiTrendingUp, FiMessageSquare, FiHelpCircle, FiCalendar } from 'react-icons/fi';
import Link from 'next/link';

const Dashboard: React.FC = () => {
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
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    if (auth && auth.user && auth.user.name) {
      setUserName(auth.user.name);
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
    if (!auth.user || auth.user.role === 'admin') {
      router.push('/');
    } else {
      if (auth.user && auth.user.name) {
        setUserName(auth.user.name);
      }
    }
  }, [auth, router]);

  if (!auth.user || auth.user.role === 'admin' ) {
    return null; // or any loading/error message you want to display
  }

  return (
    <div className="flex min-h-screen text-center bg-gray-100">
      {/* Side Menu */}
      <aside className="w-16 md:w-20 lg:w-24 bg-[#1D1817] text-white">
        <nav className="flex flex-col items-center">
          <div className="py-4">
            <button className="text-2xl  text-gray-300 hover:text-[#F56565] transition duration-300 ease-in-out">
              <FiHome className="lg:ml-1" />
              <span className="hidden text-sm font-bold text-center md:inline">Home</span>
            </button>
          </div>
          <div className="py-4">
            <Link href='/Tasks'>
            <button className="text-2xl text-gray-300 hover:text-[#F56565] transition duration-300 ease-in-out">
              <FiCheckSquare className="lg:ml-1" />
              <span className="hidden text-sm text-center font-bold md:inline">Tasks</span>
            </button>
            </Link>
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
            <Link href='/Attendance'>
            <button className="text-2xl text-gray-300 hover:text-[#F56565] transition duration-300 ease-in-out">
              <FiCalendar className="lg:ml-4" />
              <span className="hidden text-sm font-bold md:inline">Calendar</span>
            </button>
            </Link>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Task Card */}
          <Link href='/Tasks'>
          <div className="p-4 bg-[#1D1817] rounded-md hover:bg-[#C53131] cursor-pointer transition duration-300 ease-in-out">
            <FiCheckSquare className="absolute" />
            <h2 className="text-lg font-bold font-mono text-[#FEFEFF] mb-2">Tasks </h2>
            <p className="text-[#D7D3D0] font-mono">Your Daily Tasks appear here</p>
          </div>
          </Link>
          {/* Tutorial Card */}
          <Link href='/Tutorials'>
          <div className="p-4 bg-[#1D1817] rounded-md hover:bg-[#C53131] cursor-pointer transition duration-300 ease-in-out">
            <FiBookOpen className="absolute" />
            <h2 className="text-lg font-bold font-mono text-[#FEFEFF] mb-2">Tutorials</h2>
            <p className="text-[#D7D3D0] font-mono">Learn & Grow</p>
          </div>
          </Link>
          {/* Progress Card */}
          <Link href='/Progress'>
          <div className="p-4 bg-[#1D1817] rounded-md hover:bg-[#C53131] cursor-pointer transition duration-300 ease-in-out">
            <FiTrendingUp className="absolute" />
            <h2 className="text-lg font-bold font-mono text-[#FEFEFF] mb-2">Progress</h2>
            <p className="text-[#D7D3D0] font-mono">Track your Journey</p>
          </div>
          </Link>
          {/* Discussion Card */}
          <Link href='/chat'>
          <div className="p-4 bg-[#1D1817] rounded-md hover:bg-[#C53131] cursor-pointer transition duration-300 ease-in-out">
            <FiMessageSquare className="absolute" />
            <h2 className="text-lg font-bold font-mono text-[#FEFEFF] mb-2">Discussion / Group Chat</h2>
            <p className="text-[#D7D3D0] font-mono">Connect, Collaborate & Create</p>
          </div>
          </Link>
           {/* Attendance Card */}
           <Link href='/Attendance'>
           <div className="p-4 bg-[#1D1817] rounded-md hover:bg-[#C53131] cursor-pointer transition duration-300 ease-in-out">
            <FiCalendar className="absolute" />
            <h2 className="text-lg font-bold font-mono text-[#FEFEFF] mb-2">Attendance</h2>
            <p className="text-[#D7D3D0] font-mono">Track your attendance</p>
          </div>
          </Link>
          {/* Help Card */}
          <Link href='/help'>
          <div className="p-4 bg-[#1D1817] rounded-md hover:bg-[#C53131] cursor-pointer transition duration-300 ease-in-out">
            <FiHelpCircle className="absolute" />
            <h2 className="text-lg font-bold font-mono text-[#FEFEFF] mb-2">Help</h2>
            <p className="text-[#D7D3D0] font-mono">Support & Guidance</p>
          </div>
          </Link>
         
        </div>
        <footer className='mt-12'>

          <h1 className='text-black font-mono mt-10 lg:mt-24'> Code that creates an impact, Designs that leave a mark.</h1>

        </footer>

      </main>
    </div>
  );
};

export default Dashboard;
