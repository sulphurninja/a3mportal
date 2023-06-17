// pages/dashboard.tsx
import { DataContext } from '@/store/GlobalState';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { FiHome, FiCheckSquare, FiBookOpen, FiTrendingUp, FiMessageSquare, FiHelpCircle, FiCalendar } from 'react-icons/fi';
import Link from 'next/link';

const Attendance = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const router = useRouter();
  const [attendance, setAttendance] = useState({}); // State to store attendance data
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to track selected date

  const handleLogout = () => {
    Cookie.remove('refreshtoken', { path: '/api/auth/refreshToken' });
    localStorage.removeItem('firstLogin');
    dispatch({ type: 'AUTH', payload: {} });
    window.location.href = '/';
  };

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
    // Fetch attendance data from the API for the selected intern
    const fetchAttendance = async () => {
      try {
        // Make an API call to fetch attendance data for the selected intern
        const response = await axios.get('/api/attendance', {
          params: {
            internId: 'intern_id_here', // Replace with the actual intern ID
          },
        });

        // Store the attendance data in the state
        setAttendance(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAttendance();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleMarkAttendance = async (date) => {
    try {
      // Make an API call to mark attendance for the selected date and intern
      await axios.post('/api/attendance', {
        internId: 'intern_id_here', // Replace with the actual intern ID
        date: date,
      });

      // Update the attendance state with the new data
      setAttendance((prevAttendance) => ({
        ...prevAttendance,
        [date.toISOString()]: true,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!auth.user || auth.user.role === 'admin') {
      router.push('/');
    } else {
      if (auth.user && auth.user.name) {
        setUserName(auth.user.name);
      }
    }
  }, [auth, router]);

  if (!auth.user || auth.user.role === 'admin') {
    return null; // or any loading/error message you want to display
  }

  const startDate = new Date(new Date().getFullYear(), 5, 19); // June 19th of the current year
  const endDate = new Date(new Date().getFullYear(), 7, 19); // August 19th of the current year
  const dateRange = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    dateRange.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
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
            <button className="text-2xl text-gray-300 hover:text-[#F56565] transition duration-300 ease-in-out">
              <FiCalendar className="lg:ml-4" />
              <span className="hidden text-sm font-bold md:inline">Calendar</span>
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
        <div className='font-mono font-bold text-black'>
          <h1>Attendance</h1>
          <p>Working Hours : 9:00 AM to 5:00 PM</p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {dateRange.map((date) => (
              <div key={date.toISOString()} className="bg-white p-4 rounded-md shadow">
                <p>{date.toDateString()}</p>
                <button
                  className={`mt-2 bg-${attendance[date.toISOString()] ? 'green' : 'red'}-500 hover:bg-${attendance[date.toISOString()] ? 'green' : 'red'}-700 text-white font-bold py-2 px-4 rounded`}
                  onClick={() => handleMarkAttendance(date)}
                >
                  {attendance[date.toISOString()] ? 'Present' : 'Absent'}
                </button>
              </div>
            ))}
          </div>
        </div>
        <footer className='mt-12'>
          <h1 className='text-black font-mono mt-10 lg:mt-24'> Code that creates an impact, Designs that leave a mark.</h1>
        </footer>
      </main>
    </div>
  );
};

export default Attendance;
