import React, { useState, useEffect } from 'react'
import Login from './pages/Login'
import Singup from './pages/Singup'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Myprofile from './pages/Myprofile'
import Profile from './pages/Profile'
import Post from './pages/Post'
import PostUpload from './pages/PostUpload'
import Spinner from './components/Spinner'


const App = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 
    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <>

{loading ? (
        <Spinner />
      ) : (
        <>
         <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Singup' element={<Singup />} />
        <Route path='/Myprofile' element={<Myprofile />} />
        <Route path='/Profile/:userId' element={<Profile />} />
        <Route path='/Post/:postId' element={<Post />} />
        <Route path='/PostUpload' element={<PostUpload />} />
      </Routes>
        </>
      )}
     
    </>
  )
}

export default App
