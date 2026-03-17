import { useState } from "react";
import "../Style/Register.css"
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ── Icons ── */
const EyeIcon = ({ open }) =>
  open ? (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

/* ── Component ── */
export default function Register({ onSignIn }) {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (

   <>
        <Navbar/>
        <div className="reg-root">
      <div className="reg-card">

        {/* ── Form Panel ── */}
        <div className="reg-form-panel">
          <h1 className="reg-title">Registration</h1>
          <p className="reg-subtitle">
            Already have account?{" "}
            <Link to="/SignIn">
              <a href="#">Sign In.</a>
            </Link>
          </p>

          <div className="field-row">
            <div className="field no-mb">
              <label>First name <span>*</span></label>
              <div className="input-wrap">
                <span className="input-icon"><UserIcon /></span>
                <input type="text" placeholder="John" />
              </div>
            </div>
            <div className="field no-mb">
              <label>Last name</label>
              <div className="input-wrap">
                <span className="input-icon"><UserIcon /></span>
                <input type="text" placeholder="Doe" />
              </div>
            </div>
          </div>

          <div className="field">
            <label>Mail</label>
            <div className="input-wrap">
              <span className="input-icon"><MailIcon /></span>
              <input type="email" placeholder="hello@example.com" />
            </div>
          </div>

          <div className="field">
            <label>Password</label>
            <div className="input-wrap">
              <span className="input-icon"><LockIcon /></span>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Min. 8 characters"
              />
              <button className="input-eye" onClick={() => setShowPass(!showPass)}>
                <EyeIcon open={showPass} />
              </button>
            </div>
          </div>

          <div className="field">
            <label>Confirm password</label>
            <div className="input-wrap">
              <span className="input-icon"><LockIcon /></span>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Repeat password"
              />
              <button className="input-eye" onClick={() => setShowConfirm(!showConfirm)}>
                <EyeIcon open={showConfirm} />
              </button>
            </div>
          </div>

          <div className="terms-row">
            <input type="checkbox" id="terms" />
            <span>
              I agree to the <a>Terms of Service</a> and <a>Privacy Policy</a>
            </span>
          </div>

          <button className="btn-register">Register</button>
        </div>

        {/* ── Image Panel ── */}
        <div className="reg-image-panel">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80"
            alt="ARV fashion"
          />
          <div className="image-label">
            <span>ARV Studios</span>
            Arrive in Style
          </div>
        </div>

      </div>
    </div>
    <Footer/>
   </>

  );
}