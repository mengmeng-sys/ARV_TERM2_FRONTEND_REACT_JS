import React, { useState, useEffect } from 'react'
import AdminLayout from '../../components/AdminLayout'
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../data/store.js'
import styles from '../../Style/admin/AdminTable.module.css'

const EMPTY = { name: '', price: '', category: 'men', color: '#3a3a38', img: '', stock: 50 }
const CATEGORIES = ['men', 'women', 'extras']

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [modal, setModal]       = useState(null)   // null | 'add' | 'edit'
  const [form, setForm]         = useState(EMPTY)
  const [editId, setEditId]     = useState(null)
  const [search, setSearch]     = useState('')
  const [confirm, setConfirm]   = useState(null)

  const reload = () => {
  const data = JSON.parse(localStorage.getItem("arv_products")) || []
  setProducts(data)
}

  useEffect(() => { reload() }, [])

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd  = () => { setForm(EMPTY); setEditId(null); setModal('edit') }
  const openEdit = (p)  => { setForm({ ...p, price: String(p.price), stock: p.stock ?? 50 }); setEditId(p.id); setModal('edit') }
  const closeModal = () => { setModal(null); setForm(EMPTY); setEditId(null) }

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSave = () => {
    if (!form.name || !form.price) return alert('Name and price are required.')
    const data = { ...form, price: Number(form.price), stock: Number(form.stock) }
    if (editId) updateProduct(editId, data)
    else        addProduct(data)
    reload(); closeModal()
  }

  const handleDelete = (id) => {
    deleteProduct(id); reload(); setConfirm(null)
  }

  return (
    <AdminLayout title="Products">
      {/* toolbar */}
      <div className={styles.toolbar}>
        <input
          className={styles.search}
          placeholder="Search products…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className={styles.btnPrimary} onClick={openAdd}>+ Add Product</button>
      </div>

      {/* table */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Swatch</th><th>Name</th><th>Category</th>
              <th>Price</th><th>Stock</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={6} className={styles.empty}>No products found.</td></tr>
            )}
            {filtered.map(p => (
              <tr key={p.id}>
                <td>
                  {p.img
                    ? <img src={p.img} alt={p.name} className={styles.thumb} />
                    : <div className={styles.swatch} style={{ background: p.color }} />
                  }
                </td>
                <td className={styles.bold}>{p.name}</td>
                <td><span className={styles.catBadge}>{p.category}</span></td>
                <td>${p.price}</td>
                <td className={p.stock <= 5 ? styles.lowStock : ''}>{p.stock ?? '—'}</td>
                <td>
                  <button className={styles.btnEdit}   onClick={() => openEdit(p)}>Edit</button>
                  <button className={styles.btnDelete} onClick={() => setConfirm(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Edit / Add Modal ── */}
      {modal === 'edit' && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>{editId ? 'Edit Product' : 'Add Product'}</h2>

            <div className={styles.formGrid}>
              <label>Name *
                <input name="name" value={form.name} onChange={handleChange} placeholder="Product name" />
              </label>
              <label>Price ($) *
                <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="0" min="0" />
              </label>
              <label>Category
                <select name="category" value={form.category} onChange={handleChange}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
              <label>Stock
                <input name="stock" type="number" value={form.stock} onChange={handleChange} min="0" />
              </label>
              <label>Color
                <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                  <input type="color" name="color" value={form.color} onChange={handleChange} style={{ width:40, height:36, padding:2, border:'1px solid #ddd', borderRadius:6 }} />
                  <input name="color" value={form.color} onChange={handleChange} placeholder="#3a3a38" style={{ flex:1 }} />
                </div>
              </label>
              <label>Image URL
                <input name="img" value={form.img} onChange={handleChange} placeholder="https://…" />
              </label>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.btnCancel} onClick={closeModal}>Cancel</button>
              <button className={styles.btnPrimary} onClick={handleSave}>
                {editId ? 'Save Changes' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Confirm Delete ── */}
      {confirm && (
        <div className={styles.overlay} onClick={() => setConfirm(null)}>
          <div className={styles.confirmBox} onClick={e => e.stopPropagation()}>
            <p>Are you sure you want to delete this product?</p>
            <div style={{ display:'flex', gap:10, marginTop:16, justifyContent:'flex-end' }}>
              <button className={styles.btnCancel}  onClick={() => setConfirm(null)}>Cancel</button>
              <button className={styles.btnDelete}  onClick={() => handleDelete(confirm)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
