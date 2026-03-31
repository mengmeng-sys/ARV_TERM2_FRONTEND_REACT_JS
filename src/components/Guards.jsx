import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../data/store.js';

/** Redirects to /SignIn if not logged in */
export function RequireAuth({ children }) {
  const user = getCurrentUser();
  if (!user) return <Navigate to="/SignIn" replace />;
  return children;
}

/** Redirects to / if not an admin */
export function RequireAdmin({ children }) {
  const user = getCurrentUser();
  if (!user) return <Navigate to="/SignIn" replace />;
  if (user.role !== 'admin') return <Navigate to="/" replace />;
  return children;
}
