import { useState } from "react";
import "../Style/Register.css";
import { Link, useNavigate } from "react-router-dom";
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

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.07 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" />
  </svg>
);

/* ── Component ── */
export default function Register() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRegister = () => {
    const { firstName, lastName, email, phone, password, confirm } = form;

    if (!firstName || !email || !password || !confirm) {
      setError("Please fill in all required fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    // Save user to localStorage
    const userData = { firstName, lastName, email, phone, password };
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");

    // Navigate to UserProfile
    navigate("/UserProfile");
  };

  return (
    <>
      <Navbar />
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
                  <input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    value={form.firstName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="field no-mb">
                <label>Last name</label>
                <div className="input-wrap">
                  <span className="input-icon"><UserIcon /></span>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="field">
              <label>Mail <span>*</span></label>
              <div className="input-wrap">
                <span className="input-icon"><MailIcon /></span>
                <input
                  type="email"
                  name="email"
                  placeholder="hello@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label>Phone number</label>
              <div className="input-wrap">
                <span className="input-icon"><PhoneIcon /></span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+1 234 567 890"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label>Password <span>*</span></label>
              <div className="input-wrap">
                <span className="input-icon"><LockIcon /></span>
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={handleChange}
                />
                <button className="input-eye" onClick={() => setShowPass(!showPass)}>
                  <EyeIcon open={showPass} />
                </button>
              </div>
            </div>

            <div className="field">
              <label>Confirm password <span>*</span></label>
              <div className="input-wrap">
                <span className="input-icon"><LockIcon /></span>
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirm"
                  placeholder="Repeat password"
                  value={form.confirm}
                  onChange={handleChange}
                />
                <button className="input-eye" onClick={() => setShowConfirm(!showConfirm)}>
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
            </div>

            {error && <p className="reg-error">{error}</p>}

            <div className="terms-row">
              <input type="checkbox" id="terms" />
              <span>
                I agree to the <a>Terms of Service</a> and <a>Privacy Policy</a>
              </span>
            </div>

            <button className="btn-register" onClick={handleRegister}>Register</button>
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
      <Footer />
    </>
  );
}