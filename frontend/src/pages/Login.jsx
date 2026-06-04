import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api/config";

function Login({ onLogin, user }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const validate = () => {
    const nextErrors = {};

    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password.trim()) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setStatusMessage("");

    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const payload = await response.json();

      if (!response.ok) {
        setErrors({ form: payload.error || "Login failed." });
        return;
      }

      const userData = { ...payload.user, token: payload.token, remember: rememberMe };
      onLogin(userData);
      setStatusMessage("Login successful. Redirecting you now...");
    } catch (error) {
      setErrors({ form: "Unable to connect to the backend. Please try again." });
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-side">
          <div className="auth-decor">
            <div className="auth-badge">GoCart</div>
            <div className="auth-circle auth-circle-1" />
            <div className="auth-circle auth-circle-2" />
          </div>

          <div className="auth-copy">
            <span className="eyebrow">Trusted login</span>
            <h2>Fast, secure access to your GoCart dashboard.</h2>
            <p>Sign in with one account to manage orders, wishlists, and every purchase across the marketplace.</p>

            <ul className="auth-feature-list">
              <li>Instant checkout access</li>
              <li>Saved preferences and order history</li>
              <li>Exclusive deals and smart recommendations</li>
            </ul>
          </div>

          <div className="auth-footer-note">
            <strong>Demo credentials:</strong> user@gocart.com / 123456
          </div>
        </div>

        <div className="auth-form-card">
          <div className="auth-form-head">
            <span className="eyebrow">Member sign in</span>
            <h3>Welcome back.</h3>
            <p className="form-subtitle">Login to continue shopping with speed, security, and personalized access.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {errors.form && <p className="form-message form-error">{errors.form}</p>}

            <div className="form-group">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
              {errors.email && <p className="form-message form-error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="login-password">Password</label>
              <div className="input-with-button">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <button type="button" className="button button-outline password-toggle" onClick={() => setShowPassword((visible) => !visible)}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && <p className="form-message form-error">{errors.password}</p>}
            </div>

            <div className="form-row">
              <label className="checkbox-label">
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                Remember me
              </label>
              <button type="button" className="text-button" onClick={() => setStatusMessage("Password reset is not enabled in demo mode.")}>Forgot password?</button>
            </div>

            <button type="submit" className="button button-primary auth-submit">Sign In</button>

            {statusMessage && <p className="form-message form-success">{statusMessage}</p>}

            <p className="auth-meta">Use the demo credentials above to explore GoCart.</p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
