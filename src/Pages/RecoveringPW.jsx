import { useState } from "react";
import "../Style/RecoveringPW.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const BackArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);

const MailIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const LockIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
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


  //  SHARED SUB-COMPONENTS


// Step progress dots — pass how many are "done" (1, 2, or 3)
const StepDots = ({ done }) => (
  <div className="fp-steps">
    {[1, 2, 3].map((n) => (
      <div key={n} className={`fp-step-dot${n <= done ? " done" : ""}`} />
    ))}
  </div>
);

// Card header: back button + dots + icon + title + description
const CardHeader = ({ onBack, doneDots, icon, title, desc }) => (
  <>
    <button className="fp-back" onClick={onBack}>
      <BackArrow /> Back
    </button>
    <StepDots done={doneDots} />
    <div className="fp-icon-circle">{icon}</div>
    <h1 className="fp-title">{title}</h1>
    <p className="fp-desc">{desc}</p>
  </>
);

// Single password field with show/hide toggle
const PasswordField = ({ label, placeholder }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="fp-field">
      <label className="fp-label">{label}</label>
      <div className="fp-input-wrap">
        <span className="fp-input-icon"><LockIcon size={14} /></span>
        <input type={show ? "text" : "password"} placeholder={placeholder} />
        <button className="fp-input-eye" onClick={() => setShow(!show)}>
          <EyeIcon open={show} />
        </button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   STEP 1 — Enter Email
───────────────────────────────────────── */
function StepEmail({ onBack, onNext }) {
  return (
    <div className="fp-card">
      <CardHeader
        onBack={onBack}
        doneDots={1}
        icon={<MailIcon />}
        title="Forgot Password ?"
        desc="Please let us know your registration mail address and then we will send you a code to verify your mail via mail box. Thanks"
      />

      <div className="fp-field">
        <label className="fp-label">Mail</label>
        <div className="fp-input-wrap">
          <span className="fp-input-icon"><MailIcon size={14} /></span>
          <input type="email" placeholder="hello@example.com" />
        </div>
      </div>

      <button className="fp-btn" onClick={onNext}>Verify</button>
    </div>
  );
}

/* ─────────────────────────────────────────
   STEP 2 — Verify OTP
───────────────────────────────────────── */
function StepVerify({ onBack, onNext }) {
  return (
    <div className="fp-card">
      <CardHeader
        onBack={onBack}
        doneDots={2}
        icon={<ShieldIcon />}
        title="Verification Code"
        desc="Enter the 4-digit code we sent to your email address."
      />

      <div className="otp-row">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="otp-box" />
        ))}
      </div>

      <button className="fp-btn" onClick={onNext}>Confirm your code</button>

      <div className="resend-row">
        <span className="resend-timer">0:30 resend code again</span>
        <button className="resend-btn">Resend</button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   STEP 3 — Set New Password
───────────────────────────────────────── */
function StepSetPassword({ onBack, onDone }) {
  return (
    <div className="fp-card">
      <CardHeader
        onBack={onBack}
        doneDots={3}
        icon={<CheckIcon />}
        title="Enjoy Your New Password"
        desc="Choose a strong password to keep your account secure."
      />

      <PasswordField label="Password" placeholder="New password" />
      <PasswordField label="Confirm password" placeholder="Repeat password" />

      <button className="fp-btn" onClick={onDone}>Submit</button>
    </div>
  );
}

/* ─────────────────────────────────────────
   ROOT — ForgotPassword Page
───────────────────────────────────────── */
export default function ForgotPassword({ onBack }) {
  const [step, setStep] = useState("email");

  return (
    <>
      <Navbar />
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
            <div className="fp-icon-circle"><CheckIcon /></div>
            <h1 className="fp-title">All Done!</h1>
            <p className="fp-desc">Your password has been updated successfully.</p>
            <button className="fp-btn" onClick={() => setStep("email")}>
              Back to Login
            </button>
          </div>
        )}

      </div>
      <Footer />
    </>
  );
}