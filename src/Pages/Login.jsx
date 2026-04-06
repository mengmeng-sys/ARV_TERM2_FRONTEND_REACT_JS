import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../Style/Signin.module.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../data/store.js";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");

  const handleSubmit = () => {
    if (!email || !password) { setError("Please enter your email and password."); return; }
    const result = login(email, password);
    if (result.error) { setError(result.error); return; }
    if (result.user.role === "admin") navigate("/admin");
    else navigate("/UserProfile");
  };

  return (
    <>
      <Navbar />
      <div className={styles.page}>
        <div className={styles.card}>
          <h1 className={styles.title}>Sign in with mail</h1>
          <p className={styles.registerText}>
            Does not have account?{" "}
            <Link to="/Register"><a href="#" className={styles.registerLink}>Register.</a></Link>
            {/* link to register */}
          </p>
          <div className={styles.inputGroup}>
            <input type="email" placeholder="Mail" value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }} className={styles.input} />
          </div>
          <div className={styles.inputGroup}>
            <input type="password" placeholder="Password" value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }} className={styles.input} />
          </div>
          {error && <p style={{ color: "#e05b5b", fontSize: "13px", marginBottom: "12px" }}>{error}</p>}
          <div className={styles.forgotWrapper}>
            <Link to="/ForgotPassword"><a href="#" className={styles.forgotLink}>Forgot password?</a></Link>
          </div>
          <div style={{ background:"#f7f3f0", borderRadius:8, padding:"10px 14px", fontSize:12, color:"#8B5E4A", marginBottom:12 }}>
            <strong>Admin demo:</strong> admin@arv.com / admin1234
          </div>
          <div className={styles.btnWrapper}>
            <button className={styles.signInBtn} onClick={handleSubmit}>Sign in</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
