import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CatalogPage from './Pages/Catalog';
import ContactPage from './Pages/Contact';
import SignIn from './Pages/Login';
import Register from './Pages/Register';
import ForgotPassword from './Pages/RecoveringPW';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CatalogPage/>}/>
        <Route path='/ContactPage' element={<ContactPage/>}/>
        <Route path='/SignIn' element={<SignIn/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
      </Routes>

    
    </BrowserRouter>

  )
}
export default App;