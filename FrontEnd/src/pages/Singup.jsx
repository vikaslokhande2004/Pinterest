import React, { useState } from "react";
import { assets } from "../assets/assets";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Singup() {

    const [showPassword, setShowPassword] = useState(false);
    const showpass = () => {
        setShowPassword(!showPassword)
    }
    const [avatar, setAvatar] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);



    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading screen

        try {
            const formData = new FormData();
            formData.append("username", username);
            formData.append("fullname", fullname);
            formData.append("email", email);
            formData.append("password", password);

            // Only append files if they exist
            if (avatar) formData.append("avatar", avatar);
            if (coverImage) formData.append("coverImage", coverImage);
            const { data } = await axios.post('http://localhost:3000/api/v1/user/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setLoading(false);
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message)
            }

            console.log(data);
            console.log(data.message);
        } catch (error) {
            setLoading(false);
            toast.error(error.message)
            alert("Sonthing with worng")
        }
    }


    return (
        <>
            <ToastContainer />

            {loading ? <div wire:loading className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
                <p className="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
            </div> : <></>}

            <div className="w-full h-screen flex items-center justify-center bg-zinc-900">
                <div className="w-[33vw] flex items-center justify- flex-col p-6 bg-[#ffffff] rounded-[30px]">
                    <div className="flex items-center justify-center flex-col gap-3">
                        <img src={assets.imglogo} className="w-[6vw]" />
                        <h1 className=" font-semibold text-3xl">Sing up to see more</h1>
                    </div>
                    <form onSubmit={onSubmitHandler} className="flex relative mt-6 items-center justify-center flex-col gap-5">
                        <input type="text"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)} className="w-[22vw] h-10 p-3 border-none outline-none text-black bg-[#dee2e6] rounded-lg" placeholder="Fullname" />
                        <input type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} className="w-[22vw] h-10 p-3 border-none outline-none text-black bg-[#dee2e6] rounded-lg" placeholder="Username" />
                        <div>
                            <div className="mb-3">
                                <label
                                    htmlFor="ProfileImage"
                                    className="mb-2 inline-block text-neutral-500 dark:text-neutral-400"
                                >ProfileImage</label>
                                <input
                                    onChange={(e) => setAvatar(e.target.files[0])}
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
                                    onChange={(e) => setCoverImage(e.target.files[0])}
                                    className="relative m-0 block w-[22vw] min-w-0 flex-auto rounded border border-solid border-secondary-500 bg-neutral-200 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface/50 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface/50 focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:bg-neutral-600  dark:text-white/50 file:dark:text-white/50"
                                    type="file"
                                    id="CoverImage" />
                            </div>
                        </div>
                        <input type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} className="w-[22vw] h-10 p-3 border-none outline-none text-black bg-[#dee2e6] rounded-lg" placeholder="Email" />
                        <div className='relative'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} className="w-[22vw] h-10 p-3 border-none outline-none text-black bg-[#dee2e6] rounded-lg" placeholder="Password" />
                            <span className=" absolute right-2 top-1/2 -translate-x-1/2 -translate-y-1/2" onClick={showpass} > {showPassword ? <IoMdEyeOff className=" text-xl" /> : <IoMdEye className="text-xl" />} </span>
                        </div>
                        <button type='submit' className="w-[22vw] h-10 text-white font-bold border-none outline-none rounded-full bg-[#e60023] hover:bg-[#d62828]">Sing Up</button>
                    </form>
                    <a className="text-xs font-bold cursor-pointer">Log in</a>
                </div>
            </div>
        </>
    );
}

export default Singup
