import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/AdminLayout'
import { getProducts, getUsers, getOrders } from '../../data/store.js'
import styles from '../../Style/admin/AdminDashboard.module.css'

function StatCard({ icon, label, value, sub, color }) {
  return (
    <div className={styles.statCard} style={{ borderTopColor: color }}>
      <div className={styles.statIcon} style={{ background: color + '22', color }}>{icon}</div>
      <div>
        <div className={styles.statValue}>{value}</div>
        <div className={styles.statLabel}>{label}</div>
        {sub && <div className={styles.statSub}>{sub}</div>}
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const products = useMemo(() => getProducts(), [])
  const users    = useMemo(() => getUsers().filter(u => u.role !== 'admin'), [])
  const orders   = useMemo(() => getOrders(), [])

  const revenue  = orders.reduce((s, o) => s + (o.total || 0), 0)
  const pending  = orders.filter(o => o.status === 'pending').length
  const recent   = [...orders].reverse().slice(0, 5)

  const statusColor = { pending: '#f59e0b', processing: '#3b82f6', shipped: '#8b5cf6', delivered: '#10b981', cancelled: '#ef4444' }

  return (
    <AdminLayout title="Dashboard">
      {/* ── Stats row ── */}
      <div className={styles.statsRow}>
        <StatCard icon="" label="Total Revenue"   value={`$${revenue}`}         color="#10b981" />
        <StatCard icon="" label="Total Orders"    value={orders.length}          color="#3b82f6" sub={`${pending} pending`} />
        <StatCard icon="" label="Customers"       value={users.length}           color="#8b5cf6" />
        <StatCard icon="" label="Products"        value={products.length}        color="#8B5E4A" />
      </div>

      {/* ── Quick links ── */}
      <div className={styles.quickRow}>
        {[
          { to: '/admin/products', label: '+ Add Product',  bg: '#8B5E4A' },
          { to: '/admin/users',    label: '→ View Customers', bg: '#3b82f6' },
          { to: '/admin/orders',   label: '→ Manage Orders', bg: '#10b981' },
          { to: '/',               label: ' View Store',    bg: '#555' },
        ].map(q => (
          <Link key={q.to} to={q.to} className={styles.quickBtn} style={{ background: q.bg }}>
            {q.label}
          </Link>
        ))}
      </div>

      {/* ── Recent orders ── */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Orders</h2>
          <Link to="/admin/orders" className={styles.seeAll}>See all →</Link>
        </div>
        {recent.length === 0 ? (
          <p className={styles.empty}>No orders yet.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recent.map(o => (
                <tr key={o.id}>
                  <td className={styles.orderId}>{o.id}</td>
                  <td>{o.items.length} item{o.items.length !== 1 ? 's' : ''}</td>
                  <td><strong>${o.total}</strong></td>
                  <td>
                    <span className={styles.badge} style={{ background: (statusColor[o.status] || '#999') + '22', color: statusColor[o.status] || '#999' }}>
                      {o.status}
                    </span>
                  </td>
                  <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  )
}
