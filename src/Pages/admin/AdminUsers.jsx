import React, { useState, useEffect } from 'react'
import AdminLayout from '../../components/AdminLayout'
import { getUsers, updateUser, deleteUser } from '../../data/store.js'
import styles from '../../Style/admin/AdminTable.module.css'

export default function AdminUsers() {
  const [users, setUsers]   = useState([])
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState(null)
  const [form, setForm]     = useState({})
  const [confirm, setConfirm] = useState(null)

  const reload = () => setUsers(getUsers())
  useEffect(() => { reload() }, [])

  const filtered = users.filter(u =>
    `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(search.toLowerCase())
  )

  const openEdit = (u) => { setEditing(u.id); setForm({ ...u }) }
  const closeEdit = () => { setEditing(null); setForm({}) }

  const handleSave = () => {
    updateUser(editing, form); reload(); closeEdit()
  }

  const handleDelete = (id) => {
    deleteUser(id); reload(); setConfirm(null)
  }

  return (
    <AdminLayout title="Customers">
      <div className={styles.toolbar}>
        <input
          className={styles.search}
          placeholder="Search customers…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Joined</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={6} className={styles.empty}>No customers found.</td></tr>
            )}
            {filtered.map(u => (
              <tr key={u.id}>
                <td>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div className={styles.userAvatar}>{u.firstName?.charAt(0)}{u.lastName?.charAt(0)}</div>
                    <span className={styles.bold}>{u.firstName} {u.lastName}</span>
                  </div>
                </td>
                <td>{u.email}</td>
                <td>{u.phone || '—'}</td>
                <td>
                  <span className={`${styles.roleBadge} ${u.role === 'admin' ? styles.roleAdmin : styles.roleClient}`}>
                    {u.role}
                  </span>
                </td>
                <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                <td>
                  <button className={styles.btnEdit}   onClick={() => openEdit(u)}>Edit</button>
                  {u.role !== 'admin' && (
                    <button className={styles.btnDelete} onClick={() => setConfirm(u.id)}>Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit modal */}
      {editing && (
        <div className={styles.overlay} onClick={closeEdit}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Edit Customer</h2>
            <div className={styles.formGrid}>
              <label>First Name<input value={form.firstName || ''} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} /></label>
              <label>Last Name<input value={form.lastName || ''} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} /></label>
              <label>Email<input value={form.email || ''} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></label>
              <label>Phone<input value={form.phone || ''} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></label>
              <label>Role
                <select value={form.role || 'client'} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
                  <option value="client">client</option>
                  <option value="admin">admin</option>
                </select>
              </label>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.btnCancel} onClick={closeEdit}>Cancel</button>
              <button className={styles.btnPrimary} onClick={handleSave}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {confirm && (
        <div className={styles.overlay} onClick={() => setConfirm(null)}>
          <div className={styles.confirmBox} onClick={e => e.stopPropagation()}>
            <p>Delete this customer account?</p>
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
