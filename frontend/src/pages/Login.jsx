import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api/config";
import { FiShoppingBag, FiTrendingUp, FiEye, FiEyeOff } from "react-icons/fi";

function AuthCard({ type, onAuthSuccess }) {
  const [mode, setMode] = useState("login"); // "login" | "signup"

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isCustomer = type === "customer";
  
  const title = isCustomer ? "Shop smarter with GoCart" : "Grow your business with GoCart";
  const icon = isCustomer ? <FiShoppingBag className="h-6 w-6" /> : <FiTrendingUp className="h-6 w-6" />;
  const colorClass = isCustomer ? "text-primary-600" : "text-accent-600";
  const bgClass = isCustomer ? "bg-primary-50" : "bg-accent-50";
  const btnClass = isCustomer ? "bg-primary-600 hover:bg-primary-500 focus:ring-primary-500" : "bg-slate-900 hover:bg-slate-800 focus:ring-slate-900";

  const handleFillDemo = () => {
    setMode("login");
    setEmail(isCustomer ? "test@gmail.com" : "seller@gmail.com");
    setPassword("123456");
    setError("");
    setSuccess("Demo credentials filled!");
  };

  const switchMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setError("");
    setSuccess("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (mode === "signup") {
      if (!name.trim() || !email.trim() || !password.trim()) {
        setError("Please fill in all required fields.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    } else {
      if (!email.trim() || !password.trim()) {
        setError("Please fill in all fields.");
        return;
      }
    }

    setLoading(true);

    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const body = mode === "login"
        ? { email, password }
        // For signup, we also pass role implicitly or it defaults to customer in mock backend.
        // Wait, the backend doesn't take role in register. It assigns "customer".
        // That's fine for mock, we will route them based on the card they used.
        : { name, email, password };

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const payload = await response.json();

      if (!response.ok) {
        setError(payload.error || (mode === "login" ? "Login failed." : "Sign up failed."));
        return;
      }

      // If user registered from seller card, assign role locally for demo
      const assignedRole = mode === "signup" && !isCustomer ? "seller" : payload.user.role;
      const userData = { ...payload.user, role: assignedRole, token: payload.token, remember: rememberMe };
      
      setSuccess(mode === "login" ? "Login successful! Redirecting..." : "Account created! Redirecting...");
      
      setTimeout(() => {
        onAuthSuccess(userData, type);
      }, 500);
      
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white p-8 sm:p-10 transition-all hover:shadow-lg rounded-2xl ring-1 ring-slate-200 relative overflow-hidden">
      {/* Decorative gradient corner */}
      <div className={`absolute -right-16 -top-16 h-32 w-32 rounded-full ${bgClass} blur-2xl opacity-60 pointer-events-none`}></div>

      <div className="mb-8 flex flex-col items-center text-center relative z-10">
        <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${bgClass} ${colorClass}`}>
          {icon}
        </div>
        <h2 className="text-2xl font-black text-slate-900">{title}</h2>
        <p className="mt-2 text-sm font-medium text-slate-500">
          {mode === "login" ? "Welcome back! Please enter your details." : "Create an account to get started."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col space-y-4 relative z-10">
        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm font-bold text-red-700 ring-1 ring-inset ring-red-600/20">
            ⚠️ {error}
          </div>
        )}
        {success && (
          <div className="rounded-lg bg-success-50 p-4 text-sm font-bold text-success-700 ring-1 ring-inset ring-success-600/20">
            ✅ {success}
          </div>
        )}

        {mode === "signup" && (
          <div>
            <label className="mb-1.5 block text-sm font-bold text-slate-700">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            />
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-sm font-bold text-slate-700">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={isCustomer ? "customer@example.com" : "seller@business.com"}
            className="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-slate-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="block w-full rounded-lg border-0 py-2.5 pr-12 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 hover:text-slate-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
        </div>

        {mode === "signup" && (
          <div>
            <label className="mb-1.5 block text-sm font-bold text-slate-700">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="block w-full rounded-lg border-0 py-2.5 pr-12 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 hover:text-slate-600"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>
        )}

        {mode === "login" && (
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={`h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-600`}
              />
              <span className="text-sm font-medium text-slate-600">Remember me</span>
            </label>
            <button type="button" className="text-sm font-bold text-slate-900 hover:underline">
              Forgot password?
            </button>
          </div>
        )}

        <div className="mt-auto pt-6 space-y-3">
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl px-4 py-3 font-bold text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 ${btnClass}`}
          >
            {loading ? "Please wait..." : (mode === "login" ? `Login as ${isCustomer ? "Customer" : "Seller"}` : "Create Account")}
          </button>
          
          {mode === "login" && (
            <button
              type="button"
              onClick={handleFillDemo}
              className="w-full rounded-xl bg-slate-50 px-4 py-3 font-bold text-slate-700 ring-1 ring-inset ring-slate-300 transition-colors hover:bg-slate-100"
            >
              Use Demo {isCustomer ? "Customer" : "Seller"}
            </button>
          )}
        </div>

        <p className="mt-4 text-center text-sm font-medium text-slate-600">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button" 
            className={`font-bold hover:underline ${colorClass}`}
            onClick={switchMode}
          >
            {mode === "login" 
              ? (isCustomer ? "Create Customer Account" : "Register as Seller")
              : "Sign in"}
          </button>
        </p>
      </form>
    </div>
  );
}

function Login({ onLogin, user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "seller") {
        navigate("/seller", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [user, navigate]);

  const handleAuthSuccess = (userData, type) => {
    onLogin(userData);
    if (type === "seller" || userData.role === "seller") {
      navigate("/seller", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Welcome to GoCart
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Choose your portal to continue.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
          <AuthCard 
            type="customer" 
            onAuthSuccess={handleAuthSuccess} 
          />
          <AuthCard 
            type="seller" 
            onAuthSuccess={handleAuthSuccess} 
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
