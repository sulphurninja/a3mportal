import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../store/GlobalState';
import { postData } from '../utils/fetchData';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';

function Login() {
  const initialState = { userName: '', password: '' };
  const [userData, setUserData] = useState(initialState);
  const { userName, password } = userData;
  const { state = {}, dispatch } = useContext(DataContext);
  const { auth = {} } = state;
  const router = useRouter();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await postData('auth/login', userData);

    if (res.error) {
      // If there is an error, do nothing and let the user try again
      return;
    }

    dispatch({
      type: 'AUTH',
      payload: {
        token: res.access_token,
        user: res.user,
      },
    });

    Cookie.set('refreshtoken', res.refresh_token, {
      path: '/api/auth/accessToken',
      expires: 7,
    });

    localStorage.setItem('firstLogin', 'true');
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0) {
      if (auth.user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/Dashboard');
      }
    }
  }, [auth, router]);

  return (
    <div className="w-screen h-screen relative">
      <img src="/bg.gif" className="absolute w-full   h-full object-cover" />
      <img src="/bg.gif" className="absolute w-full mt-[-30%] lg:hidden md:hidden h-full object-cover" />
    
      <div className="h-full w-full absolute opacity-50 bg-black"></div>
      <div className="h-[20%]">hii</div>
      <div className="absolute ml-[20%] font-bold mt-[80%] lg:mt-[30%] md:mt-[10%]  text-red-600 text-xs font-mono">
        Restricted to A3M personnel and authorized users only.
      </div>
      <div className="flex flex-col lg:mt-[-5%] justify-center items-center absolute h-[80%]">
        <div className="w-full sm:w-11/12 md:w-2/3 lg:w-1/2 xl:w-full">
          <h4 className="bg-[#1D1817] text-xs lg:ml-24  lg:text-2xl rounded-2xl text-center font-mono text-white py-2">
            Track Progress, Manage Tasks & Engage in Group Discussions: 
            <br>
            </br>
            <span className='font-bold text-lg ml-12 text-amber-300 '>The A3M NextGen Portal for Interns and Employees.</span>
          </h4>
          <form className="bg-[#1D1817] w-[50%] ml-[30%] lg:ml-[90%] font-mono rounded-2xl shadow-md p-4 " onSubmit={handleSubmit}>
            <div className="pb-4">
              <label className="block text-white font-bold text-lg" htmlFor="username">
                Username
              </label>
              <input
                className="shadow appearance-none rounded w-full text-lg p-2 bg-black text-white leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                name="userName"
                value={userName}
                onChange={handleChangeInput}
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="py-4">
              <label className="block text-white font-bold text-lg" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none text-lg rounded w-full py-2 px-3 bg-black text-white leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={handleChangeInput}
                placeholder="Enter Password"
              />
            </div>
            <div className="flex items-center justify-center mt-4">
              <button
                className="bg-[#811029] hover:bg-[#ae1536] w-full text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
          <p className="text-center text-white text-xs mt-4">&copy; A3M NextGen Pvt.Ltd</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
