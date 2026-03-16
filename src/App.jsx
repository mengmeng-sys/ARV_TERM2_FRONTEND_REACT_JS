import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CatalogPage from './Pages/Catalog';
import ContactPage from './Pages/Contact';
import SignIn from './Pages/login';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CatalogPage/>}/>
        <Route path='/ContactPage' element={<ContactPage/>}/>
        <Route path='/SignIn' element={<SignIn/>}/>
      </Routes>

    
    </BrowserRouter>

  )
}
export default App;