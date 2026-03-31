import React, { useState, useEffect } from 'react'
import AdminLayout from '../../components/AdminLayout'
import { getOrders, updateOrderStatus, deleteOrder, addOrder, getProducts, getUsers } from '../../data/store.js'
import styles from '../../Style/admin/AdminTable.module.css'

const STATUSES  = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
const STATUS_COLOR = {
  pending:    '#f59e0b',
  processing: '#3b82f6',
  shipped:    '#8b5cf6',
  delivered:  '#10b981',
  cancelled:  '#ef4444',
}

export default function AdminOrders() {
  const [orders,  setOrders]  = useState([])
  const [search,  setSearch]  = useState('')
  const [filter,  setFilter]  = useState('all')
  const [detail,  setDetail]  = useState(null)
  const [confirm, setConfirm] = useState(null)
  const [addDemo, setAddDemo] = useState(false)

  const reload = () => setOrders(getOrders())
  useEffect(() => { reload() }, [])

  const filtered = orders.filter(o => {
    const matchStatus = filter === 'all' || o.status === filter
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  }).reverse()

  const handleStatus = (id, status) => { updateOrderStatus(id, status); reload() }
  const handleDelete = (id) => { deleteOrder(id); reload(); setConfirm(null) }

  // Create a demo order for testing
  const createDemo = () => {
    const prods = getProducts().slice(0, 2).map(p => ({ ...p, qty: 1 }))
    const users = getUsers().filter(u => u.role === 'client')
    addOrder(prods, users[0]?.id || 'guest')
    reload(); setAddDemo(false)
  }

  return (
    <AdminLayout title="Orders">
      <div className={styles.toolbar}>
        <input
          className={styles.search}
          placeholder="Search by order ID…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {['all', ...STATUSES].map(s => (
            <button
              key={s}
              className={filter === s ? styles.filterActive : styles.filterBtn}
              onClick={() => setFilter(s)}
              style={filter === s && s !== 'all' ? { background: STATUS_COLOR[s] } : {}}
            >
              {s}
            </button>
          ))}
        </div>
        <button className={styles.btnSecondary} onClick={() => setAddDemo(true)}>+ Demo Order</button>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th><th>Items</th><th>Total</th>
              <th>Status</th><th>Date</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={6} className={styles.empty}>No orders found.</td></tr>
            )}
            {filtered.map(o => (
              <tr key={o.id}>
                <td className={styles.orderId}>{o.id}</td>
                <td>{o.items?.length ?? 0} item(s)</td>
                <td><strong>${o.total}</strong></td>
                <td>
                  <select
                    className={styles.statusSelect}
                    value={o.status}
                    onChange={e => handleStatus(o.id, e.target.value)}
                    style={{ color: STATUS_COLOR[o.status] || '#333' }}
                  >
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className={styles.btnEdit}   onClick={() => setDetail(o)}>View</button>
                  <button className={styles.btnDelete} onClick={() => setConfirm(o.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order detail modal */}
      {detail && (
        <div className={styles.overlay} onClick={() => setDetail(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Order {detail.id}</h2>
            <p style={{ color:'#888', fontSize:13, marginBottom:12 }}>
              Placed {new Date(detail.createdAt).toLocaleString()}
            </p>
            <table className={styles.table}>
              <thead><tr><th>Product</th><th>Qty</th><th>Price</th></tr></thead>
              <tbody>
                {detail.items.map((item, i) => (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td>{item.qty}</td>
                    <td>${item.price * item.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ textAlign:'right', marginTop:12, fontWeight:700, fontSize:16 }}>
              Total: ${detail.total}
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.btnCancel} onClick={() => setDetail(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Demo confirm */}
      {addDemo && (
        <div className={styles.overlay} onClick={() => setAddDemo(false)}>
          <div className={styles.confirmBox} onClick={e => e.stopPropagation()}>
            <p>Create a demo order using the first 2 products and first client?</p>
            <div style={{ display:'flex', gap:10, marginTop:16, justifyContent:'flex-end' }}>
              <button className={styles.btnCancel}  onClick={() => setAddDemo(false)}>Cancel</button>
              <button className={styles.btnPrimary} onClick={createDemo}>Create</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {confirm && (
        <div className={styles.overlay} onClick={() => setConfirm(null)}>
          <div className={styles.confirmBox} onClick={e => e.stopPropagation()}>
            <p>Delete this order permanently?</p>
            <div style={{ display:'flex', gap:10, marginTop:16, justifyContent:'flex-end' }}>
              <button className={styles.btnCancel} onClick={() => setConfirm(null)}>Cancel</button>
              <button className={styles.btnDelete} onClick={() => handleDelete(confirm)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
