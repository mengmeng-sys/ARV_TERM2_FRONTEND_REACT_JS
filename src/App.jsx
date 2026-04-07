import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import CartRoot from './components/CartRoot'

import CatalogPage    from './Pages/Catalog'
import ContactPage    from './Pages/Contact'
import HomePage       from './Pages/Home'
import AboutPage      from './Pages/About'
import SignIn         from './Pages/Login'
import Register       from './Pages/Register'
import ForgotPassword from './Pages/RecoveringPW'
import UserProfile    from './Pages/UserProfile'

import AdminDashboard from './Pages/admin/AdminDashboard'
import AdminProducts  from './Pages/admin/AdminProducts'
import AdminUsers     from './Pages/admin/AdminUsers'
import AdminOrders    from './Pages/admin/AdminOrders'

import { RequireAuth, RequireAdmin } from './components/Guards'

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <CartRoot />
        <Routes>
          <Route path='/'               element={<HomePage />} />
          <Route path='/CatalogPage'    element={<CatalogPage />} />
          <Route path='/AboutPage'      element={<AboutPage />} />
          <Route path='/ContactPage'    element={<ContactPage />} />
          <Route path='/SignIn'         element={<SignIn />} />
          <Route path='/Register'       element={<Register />} />
          <Route path='/ForgotPassword' element={<ForgotPassword />} />
          <Route path='/UserProfile'    element={<RequireAuth><UserProfile /></RequireAuth>} />
          <Route path='/admin'          element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
          <Route path='/admin/products' element={<RequireAdmin><AdminProducts /></RequireAdmin>} />
          <Route path='/admin/users'    element={<RequireAdmin><AdminUsers /></RequireAdmin>} />
          <Route path='/admin/orders'   element={<RequireAdmin><AdminOrders /></RequireAdmin>} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
