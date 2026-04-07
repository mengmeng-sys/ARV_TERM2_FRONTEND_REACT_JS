import { useEffect, useState } from "react";
import "../Style/UserProfile.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";
import { getCurrentUser, updateUser, logout } from "../data/store.js";

const UserIcon   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
const MailIcon   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" /></svg>;
const PhoneIcon  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.07 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" /></svg>;
const LockIcon   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>;
const LogoutIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>;

export default function UserProfile() {
  const { cartCount, openCart } = useCart();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) { navigate("/SignIn"); return; }
    setUser(u);
  }, []);

  const handleChange = (e) => { setUser({ ...user, [e.target.name]: e.target.value }); setSaved(false); }; // if we change something inside your profile

  const handleSave = () => {
    updateUser(user.id, user);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = () => { logout(); navigate("/SignIn"); };

  if (!user) return null;

  return (
    <>
      <Navbar cartCount={cartCount} onCartOpen={openCart} />
      <div className="profile-root">
        <div className="profile-card">
          <div className="profile-image-panel">
            <div className="profile-avatar">
              {user.firstName?.charAt(0).toUpperCase()}{user.lastName?.charAt(0).toUpperCase()}
            </div>
            <p className="profile-avatar-name">{user.firstName} {user.lastName}</p>
            <p className="profile-avatar-email">{user.email}</p>
            <button className="btn-logout" onClick={handleLogout}><LogoutIcon /> Sign Out</button>
          </div>

          <div className="profile-form-panel">
            <h1 className="profile-title">Account Settings</h1>
            <p className="profile-subtitle">Manage your personal information</p>

            <div className="field-row">
              <div className="field no-mb">
                <label>First name</label>
                <div className="input-wrap"><span className="input-icon"><UserIcon /></span>
                  <input type="text" name="firstName" value={user.firstName} onChange={handleChange} /></div>
              </div>
              <div className="field no-mb">
                <label>Last name</label>
                <div className="input-wrap"><span className="input-icon"><UserIcon /></span>
                  <input type="text" name="lastName" value={user.lastName} onChange={handleChange} /></div>
              </div>
            </div>

            <div className="field">
              <label>Mail</label>
              <div className="input-wrap"><span className="input-icon"><MailIcon /></span>
                <input type="email" name="email" value={user.email} onChange={handleChange} /></div>
            </div>

            <div className="field">
              <label>Phone number</label>
              <div className="input-wrap"><span className="input-icon"><PhoneIcon /></span>
                <input type="tel" name="phone" value={user.phone || ""} onChange={handleChange} /></div>
            </div>

            <div className="field">
              <label>Password</label>
              <div className="input-wrap"><span className="input-icon"><LockIcon /></span>
                <input type="password" name="password" value={user.password} onChange={handleChange} /></div>
            </div>

            {saved && <p className="profile-saved">✓ Changes saved successfully!</p>}
            <button className="btn-save" onClick={handleSave}>Save Changes</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
