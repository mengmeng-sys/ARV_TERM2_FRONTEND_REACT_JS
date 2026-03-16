import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../Style/Signin.module.css"

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const handleSubmit = () => {
    if (!email || !password) return;
    const newUser = { email, password };
    setUsers(prev => [...prev, newUser]);
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <Navbar />
      <div className={styles.page}>
        <div className={styles.card}>
          <h1 className={styles.title}>Sign in with mail</h1>

          <p className={styles.registerText}>
            does not have account ?{" "}
            <a href="#" className={styles.registerLink}>Register.</a>
          </p>

          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.forgotWrapper}>
            <a href="#" className={styles.forgotLink}>Forgot password ?</a>
          </div>

          <div className={styles.btnWrapper}>
            <button className={styles.signInBtn} onClick={handleSubmit}>
              Sign in
            </button>
          </div>

          <div className={styles.divider}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerText}>or sign in with ...</span>
            <span className={styles.dividerLine} />
          </div>

          <div className={styles.socialRow}>
            <button className={styles.socialBtn}>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
            </button>
            <button className={styles.socialBtn}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="12" fill="#29B6F6"/>
                  <path d="M5.5 11.5l11-4.5-1.5 9-3.5-2.5-1.5 1.5-.5-3 6-5.5-7 4.5-3-.5z" fill="white"/>
                </svg>
            </button>
            <button className={styles.socialBtn}>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <defs>
                    <radialGradient id="ig1" cx="30%" cy="107%" r="150%">
                      <stop offset="0%" stopColor="#fdf497"/>
                      <stop offset="5%" stopColor="#fdf497"/>
                      <stop offset="45%" stopColor="#fd5949"/>
                      <stop offset="60%" stopColor="#d6249f"/>
                      <stop offset="90%" stopColor="#285AEB"/>
                    </radialGradient>
                  </defs>
                  <rect width="24" height="24" rx="6" fill="url(#ig1)"/>
                  <circle cx="12" cy="12" r="4" fill="none" stroke="white" strokeWidth="1.5"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="white"/>
                </svg>
            </button>
          </div>
        </div>

        {/* Saved users list */}
        {users.length > 0 && (
          <div className={styles.userList}>
            <h3>Saved Users</h3>
            {users.map((u, i) => (
              <div key={i} className={styles.userItem}>
                <span>{u.email}</span>
                <span>{u.password}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
