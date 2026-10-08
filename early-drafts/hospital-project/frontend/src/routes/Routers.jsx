import React from 'react'
import Home from '../pages/Home'
import Services from '../pages/Services'
import Login from ' ../pages/Login'
import Signup from '../pages/Signup'
import Contact from '../pages/Contact'
import Doctors from '../pages/Doctors'
import DoctorsDetails from '../pages/DoctorsDetails'

import{Routers,Route} from 'react-router-dom'
const Routers = () => {
  return (
    <Routers>
    <Route path="/" element={<Home/>} />
    <Route path="/home" element={<Home/>} /> 
    <Route path="/doctors" element={<Doctors/>} /> 
    <Route path="/doctors/:id" element={<DoctorsDetails/>} /> 
    <Route path="/login" element={<Login/>} /> 
    <Route path="/register" element={<Signup/>} /> 
    <Route path="/contact" element={<Contact/>} /> 
    <Route path="/services" element={<Services/>} />  
    </Routers>
  )
}

export default Routers;
