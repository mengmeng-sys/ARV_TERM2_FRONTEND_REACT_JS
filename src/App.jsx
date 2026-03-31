import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CatalogPage from './Pages/Catalog';
import ContactPage from './Pages/Contact';
import HomePage from './Pages/Home';
import AboutPage from './Pages/About';
import SignIn from './Pages/Login';
import Register from './Pages/Register';
import ForgotPassword from './Pages/RecoveringPW';
import UserProfile from './Pages/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/CatalogPage' element={<CatalogPage/>}/>
        <Route path='/AboutPage' element={<AboutPage/>}/>
        <Route path='/ContactPage' element={<ContactPage />} />
        <Route path='/SignIn' element={<SignIn />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/ForgotPassword' element={<ForgotPassword />} />
        <Route path='/UserProfile' element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;