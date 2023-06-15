import React, { useContext, useState, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import { postData } from '../utils/fetchData'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'

function Login() {
  const initialState = { userName: '', password: '' }
  const [userData, setUserData] = useState(initialState)
  const { userName, password } = userData
  const { state = {}, dispatch } = useContext(DataContext)
  const { auth = {} } = state
  const router = useRouter()


  


  const handleChangeInput = e => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const res = await postData('auth/login', userData)

    if (res.error) {
      // If there is an error, do nothing and let the user try again
      return
    }

    dispatch({
      type: 'AUTH',
      payload: {
        token: res.access_token,
        user: res.user
      }
    })

    Cookie.set('refreshtoken', res.refresh_token, {
      path: '/api/auth/accessToken',
      expires: 7
    })

    localStorage.setItem('firstLogin', 'true')
  }

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
      <img src="/bg.gif" className="absolute w-full h-full object-cover" />
      <div className="h-full w-full absolute opacity-50 bg-black"></div>
      <div className="h-[20%]">hii</div>
      <div className="absolute ml-[10%] mt-[30%] text-white text-2xl">
      Restricted to A3M personnel and authorized users only.
      </div>
      <div className="flex justify-around absolute h-[80%]">
        <div className="w-1/3  font-mono font-bold  text-center  text-white">
          <h4 className="bg-[#1D1817]  text-xs rounded-2xl ">
            Track Progress, Manage Tasks & Engage in Group Discussions: The A3M NextGen Portal for Interns and Employees.
          </h4>
        </div>
        <div className="w-1/3">
          <div className="h-1/6"></div>
          <div className="h-1/3 ml-36 w-full">
            <form
              className="bg-[#130326] rounded-2xl shadow-md p-4 w-full"
              onSubmit={handleSubmit}
            >
              <div className="pt-4">
                <label
                  className="block text-white font-bold pb-4 text-2xl"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none rounded w-full text-2xl p-2 bg-black text-white leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  name="userName"
                  value={userName}
                  onChange={handleChangeInput}
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div className="py-4">
                <label
                  className="block text-white text-2xl font-bold py-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none text-2xl rounded w-full py-2 px-3 bg-black text-white leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChangeInput}
                  placeholder="Enter Password"
                />
              </div>
              <div className="flex items-center justify-between w-1/2 ml-auto mr-auto">
                <button
                  className="bg-[#811029] hover:bg-[#ae1536] w-full text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
            <p className="text-center text-white text-xs">
              &copy;A3M NextGen Pvt.Ltd
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
