import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { RiSearch2Line } from "react-icons/ri";

function Navbar() {
    const [login,setlogin] = useState(false)
    return (
        <div className='h-24 w-full flex items-center justify-between bg-[#ffffff]'>
            <div className='flex items-center ml-4 gap-2'>
                <img src={assets.imglogo} className='w-[6vw]' />
                <button className='w-[7vw] py-2 flex items-center justify-center text-zinc-900 bg-[#E60023] rounded-3xl'>Explore</button>
            </div>
            <div className='flex items-center justify-center bg-[#E1E1E1] w-1/2 rounded-full overflow-hidden'>
                <label className='p-2 cursor-pointer' htmlFor="search"><RiSearch2Line className='text-xl' /></label>
                <input className='p-2 border-none bg-transparent outline-none w-[93%]' type="search" id="search" placeholder='Search'/>
            </div>
            <div className=' mr-4'>
                {login ? <div className='flex gap-3 items-center'>
                    <button className='w-[6vw] py-2 flex items-center justify-center text-zinc-900 bg-[#E60023] rounded-3xl'>Log in</button>
                    <button className='w-[6vw] py-2 flex items-center justify-center text-zinc-900 bg-[#E60023] rounded-3xl'>Sing up</button>
                </div> : <div className='flex gap-3 items-center'>
                    <button className='w-12 h-12 rounded-full overflow-hidden bg-zinc-800'><img className='h-full w-full object-fill' src={assets.proimg} /></button>
                    <button className='w-[6vw] py-2 flex items-center justify-center text-zinc-900 bg-[#E60023] rounded-3xl'>Logout</button>
                </div>}
            </div>
        </div>
    )
}

export default Navbar
