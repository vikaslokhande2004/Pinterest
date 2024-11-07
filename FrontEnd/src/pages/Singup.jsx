import React, { useState } from "react";
import { assets } from "../assets/assets";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

function Singup() {

    const [showPassword, setShowPassword] = useState(false);
    const showpass = () => {
        setShowPassword(!showPassword)
    }


    const [avatar,setavatar] = useState(false)
    const [coverImage,setcoverImage] = useState(false)
    const [username,setusername] = useState('')
    const [fullname,setfullname] = useState('')
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')
    


    const onSubmitHandler = async (e) => {
        e.preventDefault();
    
        try {
          const formData = new FormData()
          formData.append("username", username)
          formData.append("fullname", fullname)
          formData.append("email", email)
          formData.append("password", password)
          formData.append("avatar", avatar)
          formData.append("coverImage", coverImage)

    
          for (let [key,value] of formData.entries()) {
            console.log(`${key}:${value}`)
          }
    
    
          // const response = await axios.post(formData)
          // console.log(response)
    
        } catch (error) {
          alert("Sonthing with worng")
        }
      }


    return (
        <div className="w-full h-screen flex items-center justify-center bg-zinc-900">
            <div className="w-[33vw] flex items-center justify- flex-col p-6 bg-[#ffffff] rounded-[30px]">
                <div className="flex items-center justify-center flex-col gap-3">
                    <img src={assets.imglogo} className="w-[6vw]" />
                    <h1 className=" font-semibold text-3xl">Sing up to see more</h1>
                </div>
                <form onSubmit={onSubmitHandler} className="flex relative mt-6 items-center justify-center flex-col gap-5">
                    <input type="text"  onChange={(e) => setfullname(e.target.value)} value={fullname}  className="w-[22vw] h-10 p-3 border-none outline-none text-black bg-[#dee2e6] rounded-lg" placeholder="Fullname" />
                    <input type="text" onChange={(e) => setusername(e.target.value)} value={username} className="w-[22vw] h-10 p-3 border-none outline-none text-black bg-[#dee2e6] rounded-lg" placeholder="Username" />
                    <div>
                        <div className="mb-3">
                            <label
                                htmlFor="ProfileImage"
                                className="mb-2 inline-block text-neutral-500 dark:text-neutral-400"
                            >ProfileImage</label>
                            <input
                                 onChange={(e) => setavatar(e.target.files[0])}
                                className="relative m-0 block w-[22vw] min-w-0 flex-auto rounded border border-solid border-secondary-500 bg-neutral-200 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface/50 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface/50 focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:bg-neutral-600  dark:text-white/50 file:dark:text-white/50"
                                type="file"
                                id="ProfileImage" />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="CoverImage"
                                className="mb-2 inline-block text-neutral-500 dark:text-neutral-400"
                            >CoverImage</label>
                            <input
                                 onChange={(e) => setcoverImage(e.target.files[0])}
                                className="relative m-0 block w-[22vw] min-w-0 flex-auto rounded border border-solid border-secondary-500 bg-neutral-200 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface/50 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface/50 focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:bg-neutral-600  dark:text-white/50 file:dark:text-white/50"
                                type="file"
                                id="CoverImage" />
                        </div>
                    </div>
                    <input type="email"  onChange={(e) => setemail(e.target.value)} value={email} className="w-[22vw] h-10 p-3 border-none outline-none text-black bg-[#dee2e6] rounded-lg" placeholder="Email" />
                    <div className='relative'>
                        <input type={showPassword ? 'text' : 'password'}  onChange={(e) => setpassword(e.target.value)} value={password} className="w-[22vw] h-10 p-3 border-none outline-none text-black bg-[#dee2e6] rounded-lg" placeholder="Password" />
                        <span className=" absolute right-2 top-1/2 -translate-x-1/2 -translate-y-1/2" onClick={showpass} > {showPassword ? <IoMdEyeOff className=" text-xl" /> : <IoMdEye className="text-xl" />} </span>
                    </div>
                    <button type='submit' className="w-[22vw] h-10 text-white font-bold border-none outline-none rounded-full bg-[#e60023] hover:bg-[#d62828]">Sing Up</button>
                </form>
                <a className="text-xs font-bold cursor-pointer">Log in</a>
            </div>
        </div>
    );
}

export default Singup
