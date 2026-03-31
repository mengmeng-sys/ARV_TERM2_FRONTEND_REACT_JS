import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logout, getCurrentUser } from '../data/store.js'
import styles from '../Style/admin/AdminLayout.module.css'

const NAV = [
  { label: 'Dashboard',  path: '/admin',          icon: '▦' },
  { label: 'Products',   path: '/admin/products',  icon: '👕' },
  { label: 'Orders',     path: '/admin/orders',    icon: '📦' },
  { label: 'Customers',  path: '/admin/users',     icon: '👥' },
]

export default function AdminLayout({ children, title }) {
  const location  = useLocation()
  const navigate  = useNavigate()
  const user      = getCurrentUser()
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = () => { logout(); navigate('/SignIn') }

  return (
    <div className={styles.shell}>
      {/* ── Sidebar ── */}
      <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
        <div className={styles.sidebarTop}>
          <div className={styles.brand}>
            {!collapsed && <span className={styles.brandText}>ARV Admin</span>}
            <button className={styles.collapseBtn} onClick={() => setCollapsed(c => !c)}>
              {collapsed ? '›' : '‹'}
            </button>
          </div>

          <nav className={styles.nav}>
            {NAV.map(n => (
              <Link
                key={n.path}
                to={n.path}
                className={`${styles.navItem} ${location.pathname === n.path ? styles.active : ''}`}
              >
                <span className={styles.navIcon}>{n.icon}</span>
                {!collapsed && <span className={styles.navLabel}>{n.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        <div className={styles.sidebarBottom}>
          <Link to='/' className={styles.navItem}>
            <span className={styles.navIcon}>🏪</span>
            {!collapsed && <span className={styles.navLabel}>View Store</span>}
          </Link>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <span className={styles.navIcon}>⏻</span>
            {!collapsed && <span className={styles.navLabel}>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className={styles.main}>
        <header className={styles.topbar}>
          <h1 className={styles.pageTitle}>{title}</h1>
          <div className={styles.adminInfo}>
            <div className={styles.avatar}>{user?.firstName?.charAt(0) || 'A'}</div>
            <span className={styles.adminName}>{user?.firstName} {user?.lastName}</span>
          </div>
        </header>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}
