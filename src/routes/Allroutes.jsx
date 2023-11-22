import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Home from '../components/home/home';
import Register from '../components/user/registration';
import Login from '../components/user/login';
import Update from '../components/user/update';
import Coures from '../components/Admin/Coures';
import Instructor from '../components/Admin/Instructor';
import Lecture from '../components/Instructor/lecture';

const Allroutes = () => {
  return (
    <>
    <Routes> 
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/update' element={<Update />} />
        <Route path='/instructor' element={<Instructor />} />
        <Route path='/lecture' element={<Lecture />} />
        <Route path='/coures' element={<Coures />} />
    </Routes>
    </>
  )
}

export default Allroutes