import React, { useContext, useState, useEffect } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../context/AppContext";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const showpass = () => {
    setShowPassword(!showPassword)
  }
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { backendUrl, assets, setToken, token } = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(backendUrl + '/user/login', {
        email,
        password,
      },{ withCredentials: true });
      if (data.success) {
        toast.success(data.message);
        setToken(true)
        navigate('/')
      } else {
        toast.error(data.message)
        navigate('/Login')
      }
      console.log(data);
      console.log(data.message);
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

//   const singupPage = ()=>{
//     navigate('/Login')
// }

  return (
    <>
      <ToastContainer />
      <div className="w-full h-screen flex items-center justify-center bg-zinc-900">
        <div className="w-[33vw] h-[60vh] flex items-center justify- flex-col p-6 bg-[#ffffff] rounded-[30px]">
          <div className="flex items-center justify-center flex-col gap-3">
            <img src={assets.imglogo} className="w-[6vw]" />
            <h1 className=" font-semibold text-3xl">Log in to see more</h1>
          </div>
          <form onSubmit={onSubmitHandler} className="flex relative mt-6 items-center justify-center flex-col gap-5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[22vw] h-10 p-3 border-none outline-none text-black bg-[#dee2e6] rounded-lg" placeholder="Email" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[22vw] h-10 p-3 border-none outline-none text-black bg-[#dee2e6] rounded-lg" placeholder="Password" />
            <span className=" absolute right-2" onClick={showpass} > {showPassword ? <IoMdEyeOff className=" text-xl" /> : <IoMdEye className="text-xl" />} </span>
            <button type='submit' className="w-[22vw] h-10 text-white font-bold border-none outline-none rounded-full bg-[#e60023] hover:bg-[#d62828]">Log in</button>
          </form>
          <a className="cursor-pointer my-2">Forgotten your password?</a>
          {/* <a className="text-xs font-semibold cursor-pointer">Sign up</a> */}
        </div>
      </div>
    </>
  );
};

export default Login;
