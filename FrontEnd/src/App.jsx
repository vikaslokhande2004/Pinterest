import React, { useState } from 'react'
import Login from './pages/Login'
import Singup from './pages/Singup'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Myprofile from './pages/Myprofile'
import Profile from './pages/Profile'
import Post from './pages/Post'
import PostUpload from './pages/PostUpload'

const App = () => {

  const [token, settoken] = useState('adfs')

  return (
    <>
      {token ? <Navbar /> : <></>}
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
  )
}

export default App
