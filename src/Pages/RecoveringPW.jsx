import { useState, useRef, useEffect } from "react";
import "../Style/RecoveringPW.css"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ── Icons ── */
const BackArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);

const MailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const MailInputIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const LockIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

const LockInputIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 2l9 4v6c0 5.25-3.75 10.15-9 11.25C6.75 22.15 3 17.25 3 12V6l9-4z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const CheckIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12l3 3 5-5" />
  </svg>
);

const EyeIcon = ({ open }) =>
  open ? (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

/* ────────────────────────────
   Step 1 — Enter Email
──────────────────────────── */
function StepEmail({ onBack, onNext }) {
  return (
    <div className="fp-card">
      <button className="fp-back" onClick={onBack}>
        <BackArrow /> Back
      </button>

      <div className="fp-steps">
        <div className="fp-step-dot done" />
        <div className="fp-step-dot" />
        <div className="fp-step-dot" />
      </div>

      <div className="fp-icon-circle">
        <MailIcon />
      </div>
      <h1 className="fp-title">Forgot Password ?</h1>
      <p className="fp-desc">
        Please let us know your registration mail address and then we will
        send you a code to verify your mail via mail box. Thanks
      </p>

      <div className="fp-field">
        <label className="fp-label">Mail</label>
        <div className="fp-input-wrap">
          <span className="fp-input-icon"><MailInputIcon /></span>
          <input type="email" placeholder="hello@example.com" />
        </div>
      </div>

      <button className="fp-btn" onClick={onNext}>Verify</button>
    </div>
  );
}

/* ────────────────────────────
   Step 2 — Verify OTP
──────────────────────────── */
function StepVerify({ onBack, onNext }) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [seconds, setSeconds] = useState(30);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const handleInput = (val, i) => {
    const next = [...otp];
    next[i] = val.replace(/\D/g, "").slice(-1);
    setOtp(next);
    if (next[i] && i < 3) refs[i + 1].current?.focus();
  };

  const handleKey = (e, i) => {
    if (e.key === "Backspace" && !otp[i] && i > 0)
      refs[i - 1].current?.focus();
  };

  const timer = `0:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="fp-card">
      <button className="fp-back" onClick={onBack}>
        <BackArrow /> Back
      </button>

      <div className="fp-steps">
        <div className="fp-step-dot done" />
        <div className="fp-step-dot done" />
        <div className="fp-step-dot" />
      </div>

      <div className="fp-icon-circle">
        <ShieldIcon />
      </div>
      <h1 className="fp-title">Verification Code</h1>
      <p className="fp-desc">
        Enter the 4-digit code we sent to your email address.
      </p>

      <div className="otp-row">
        {otp.map((v, i) => (
          <input
            key={i}
            ref={refs[i]}
            className={`otp-box${v ? " filled" : ""}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={v}
            onChange={(e) => handleInput(e.target.value, i)}
            onKeyDown={(e) => handleKey(e, i)}
          />
        ))}
      </div>

      <button className="fp-btn" onClick={onNext}>Confirm your code</button>

      <div className="resend-row">
        <span className="resend-timer">{timer} resend code again</span>
        <button className="resend-btn" onClick={() => setSeconds(30)}>
          Resend
        </button>
      </div>
    </div>
  );
}

/* ────────────────────────────
   Step 3 — Set New Password
──────────────────────────── */
function StepSetPassword({ onBack, onDone }) {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="fp-card">
      <button className="fp-back" onClick={onBack}>
        <BackArrow /> Back
      </button>

      <div className="fp-steps">
        <div className="fp-step-dot done" />
        <div className="fp-step-dot done" />
        <div className="fp-step-dot done" />
      </div>

      <div className="fp-icon-circle">
        <CheckIcon />
      </div>
      <h1 className="fp-title">Enjoy Your New Password</h1>
      <p className="fp-desc">
        Choose a strong password to keep your account secure.
      </p>

      <div className="fp-field">
        <label className="fp-label">Password</label>
        <div className="fp-input-wrap">
          <span className="fp-input-icon"><LockInputIcon /></span>
          <input
            type={showPass ? "text" : "password"}
            placeholder="New password"
          />
          <button className="fp-input-eye" onClick={() => setShowPass(!showPass)}>
            <EyeIcon open={showPass} />
          </button>
        </div>
      </div>

      <div className="fp-field">
        <label className="fp-label">Confirm password</label>
        <div className="fp-input-wrap">
          <span className="fp-input-icon"><LockInputIcon /></span>
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Repeat password"
          />
          <button className="fp-input-eye" onClick={() => setShowConfirm(!showConfirm)}>
            <EyeIcon open={showConfirm} />
          </button>
        </div>
      </div>

      <button className="fp-btn" onClick={onDone}>Submit</button>
    </div>
  );
}

/* ────────────────────────────
   Root — ForgotPassword Page
──────────────────────────── */
export default function ForgotPassword({ onBack }) {
  // step: "email" | "verify" | "setpassword" | "done"
  const [step, setStep] = useState("email");

  return (
   <>
        <Navbar/>
        <div className="fp-root">
      {step === "email" && (
        <StepEmail
          onBack={onBack || (() => {})}
          onNext={() => setStep("verify")}
        />
      )}

      {step === "verify" && (
        <StepVerify
          onBack={() => setStep("email")}
          onNext={() => setStep("setpassword")}
        />
      )}

      {step === "setpassword" && (
        <StepSetPassword
          onBack={() => setStep("verify")}
          onDone={() => setStep("done")}
        />
      )}

      {step === "done" && (
        <div className="fp-card fp-card--success">
          <div className="fp-icon-circle">
            <CheckIcon />
          </div>
          <h1 className="fp-title">All Done!</h1>
          <p className="fp-desc">
            Your password has been updated successfully.
          </p>
          <button className="fp-btn" onClick={() => setStep("email")}>
            Back to Login
          </button>
        </div>
      )}
    </div>
    <Footer/>
   </>
  );
}