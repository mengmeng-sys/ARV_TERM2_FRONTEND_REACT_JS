import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// ── Client pages ──────────────────────────────────────────────────────────────
import CatalogPage    from './Pages/Catalog'
import ContactPage    from './Pages/Contact'
import HomePage       from './Pages/Home'
import AboutPage      from './Pages/About'
import SignIn         from './Pages/Login'
import Register       from './Pages/Register'
import ForgotPassword from './Pages/RecoveringPW'
import UserProfile    from './Pages/UserProfile'

// ── Admin pages ───────────────────────────────────────────────────────────────
import AdminDashboard from './Pages/admin/AdminDashboard'
import AdminProducts  from './Pages/admin/AdminProducts'
import AdminUsers     from './Pages/admin/AdminUsers'
import AdminOrders    from './Pages/admin/AdminOrders'

// ── Guards ────────────────────────────────────────────────────────────────────
import { RequireAuth, RequireAdmin } from './components/Guards'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public client routes ── */}
        <Route path='/'               element={<HomePage />} />
        <Route path='/CatalogPage'    element={<CatalogPage />} />
        <Route path='/AboutPage'      element={<AboutPage />} />
        <Route path='/ContactPage'    element={<ContactPage />} />
        <Route path='/SignIn'         element={<SignIn />} />
        <Route path='/Register'       element={<Register />} />
        <Route path='/ForgotPassword' element={<ForgotPassword />} />

        {/* ── Protected client route ── */}
        <Route path='/UserProfile' element={
          <RequireAuth><UserProfile /></RequireAuth>
        } />

        {/* ── Admin routes ── */}
        <Route path='/admin'          element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
        <Route path='/admin/products' element={<RequireAdmin><AdminProducts /></RequireAdmin>} />
        <Route path='/admin/users'    element={<RequireAdmin><AdminUsers /></RequireAdmin>} />
        <Route path='/admin/orders'   element={<RequireAdmin><AdminOrders /></RequireAdmin>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App