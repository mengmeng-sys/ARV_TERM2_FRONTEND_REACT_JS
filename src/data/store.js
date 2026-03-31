// ─── ARV Studios · Central Data Store (localStorage) ───────────────────────
// All reads/writes go through here so both client & admin share the same data.

import { products as defaultProducts } from './products.js';

const KEYS = {
  PRODUCTS:  'arv_products',
  USERS:     'arv_users',
  ORDERS:    'arv_orders',
  CURRENT:   'arv_current_user',
};

// ── seed helpers ─────────────────────────────────────────────────────────────

function seed() {
  // Products – flatten the category object into a flat array
  if (!localStorage.getItem(KEYS.PRODUCTS)) {
    const flat = Object.values(defaultProducts).flat();
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(flat));
  }
  // Users – seed an admin account
  if (!localStorage.getItem(KEYS.USERS)) {
    const admins = [
      {
        id: 'admin-1',
        firstName: 'Admin',
        lastName:  '',
        email:     'admin@arv.com',
        phone:     '',
        password:  'admin1234',
        role:      'admin',
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem(KEYS.USERS, JSON.stringify(admins));
  }
  // Orders – start empty
  if (!localStorage.getItem(KEYS.ORDERS)) {
    localStorage.setItem(KEYS.ORDERS, JSON.stringify([]));
  }
}

// ── products ──────────────────────────────────────────────────────────────────

export function getProducts() {
  seed();
  return JSON.parse(localStorage.getItem(KEYS.PRODUCTS));
}

export function saveProducts(products) {
  localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
}

export function addProduct(product) {
  const products = getProducts();
  const newProduct = { ...product, id: Date.now() };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
}

export function updateProduct(id, updates) {
  const products = getProducts().map(p => p.id === id ? { ...p, ...updates } : p);
  saveProducts(products);
}

export function deleteProduct(id) {
  saveProducts(getProducts().filter(p => p.id !== id));
}

// ── users ─────────────────────────────────────────────────────────────────────

export function getUsers() {
  seed();
  return JSON.parse(localStorage.getItem(KEYS.USERS));
}

export function saveUsers(users) {
  localStorage.setItem(KEYS.USERS, JSON.stringify(users));
}

export function getUserByEmail(email) {
  return getUsers().find(u => u.email === email) || null;
}

export function registerUser({ firstName, lastName, email, phone, password }) {
  const users = getUsers();
  if (users.find(u => u.email === email)) return { error: 'Email already registered.' };
  const user = {
    id: 'user-' + Date.now(),
    firstName, lastName, email, phone, password,
    role: 'client',
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  saveUsers(users);
  return { user };
}

export function updateUser(id, updates) {
  const users = getUsers().map(u => u.id === id ? { ...u, ...updates } : u);
  saveUsers(users);
  // keep current session in sync
  const cur = getCurrentUser();
  if (cur && cur.id === id) setCurrentUser({ ...cur, ...updates });
}

export function deleteUser(id) {
  saveUsers(getUsers().filter(u => u.id !== id));
}

// ── session ───────────────────────────────────────────────────────────────────

export function getCurrentUser() {
  const raw = localStorage.getItem(KEYS.CURRENT);
  return raw ? JSON.parse(raw) : null;
}

export function setCurrentUser(user) {
  localStorage.setItem(KEYS.CURRENT, JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem(KEYS.CURRENT);
  // backwards-compat with old keys used by original code
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('user');
}

export function login(email, password) {
  // backwards-compat: also check the old single-user key
  const old = JSON.parse(localStorage.getItem('user') || 'null');
  if (old && old.email === email && old.password === password) {
    const user = { ...old, id: old.id || 'legacy-1', role: old.role || 'client' };
    setCurrentUser(user);
    return { user };
  }
  const user = getUserByEmail(email);
  if (!user) return { error: 'No account found.' };
  if (user.password !== password) return { error: 'Incorrect password.' };
  setCurrentUser(user);
  return { user };
}

// ── orders ────────────────────────────────────────────────────────────────────

export function getOrders() {
  seed();
  return JSON.parse(localStorage.getItem(KEYS.ORDERS));
}

export function addOrder(items, userId) {
  const orders = getOrders();
  const order = {
    id: 'ORD-' + Date.now(),
    userId,
    items,
    total: items.reduce((s, i) => s + i.price * i.qty, 0),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
  return order;
}

export function updateOrderStatus(id, status) {
  const orders = getOrders().map(o => o.id === id ? { ...o, status } : o);
  localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
}

export function deleteOrder(id) {
  localStorage.setItem(KEYS.ORDERS, JSON.stringify(getOrders().filter(o => o.id !== id)));
}

// initialise on import
seed();
