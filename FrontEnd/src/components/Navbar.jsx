import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { RiSearch2Line } from "react-icons/ri";
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

function Navbar() {
    const { token, setToken, backendUrl } = useContext(AppContext)
    const navigate = useNavigate()

    const logout = async () => {
        const { data } = await axios.post(backendUrl + '/user/logout', {}, {
            withCredentials: true,
        });
        if (data.success) {
            setToken(false)
        }
        console.log(data)
    }


    return (
        <div className='h-24 w-full fixed flex items-center justify-between bg-[#ffffff]'>
            <div className='flex items-center ml-4 gap-2'>
                <img src={assets.imglogo} className='w-[6vw]' />
                <NavLink to={'/'}>
                    <button className='w-[7vw] py-2 flex items-center justify-center text-zinc-900 bg-[#E60023] rounded-3xl'>Explore</button>
                </NavLink>
            </div>
            <div className='flex items-center justify-center bg-[#E1E1E1] w-1/2 rounded-full overflow-hidden'>
                <label className='p-2 cursor-pointer' htmlFor="search"><RiSearch2Line className='text-xl' /></label>
                <input className='p-2 border-none bg-transparent outline-none w-[93%]' type="search" id="search" placeholder='Search' />
            </div>
            <div className=' mr-4'>
                {!token ? <div className='flex gap-3 items-center'>
                    <button onClick={() => navigate('/Login')} className='w-[6vw] py-2 flex items-center justify-center text-zinc-900 bg-[#E60023] rounded-3xl'>Log in</button>
                    <button onClick={() => navigate('/Singup')} className='w-[6vw] py-2 flex items-center justify-center text-zinc-900 bg-[#E60023] rounded-3xl'>Sing up</button>
                </div> : <div className='flex gap-3 items-center'>
                    <button onClick={() => navigate('/Myprofile')} className='w-12 h-12 rounded-full overflow-hidden bg-zinc-800'><img className='h-full w-full object-fill' src={assets.proimg} /></button>
                    <button onClick={logout} className='w-[6vw] py-2 flex items-center justify-center text-zinc-900 bg-[#E60023] rounded-3xl'>Logout</button>
                </div>}
            </div>
        </div>
    )
}

export default Navbar
