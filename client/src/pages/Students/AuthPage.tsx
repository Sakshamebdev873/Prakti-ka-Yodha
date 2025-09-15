import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// --- Sub-Components for Clarity ---

const AnimatedGradient = () => (
  <motion.div
    className="absolute inset-0 z-0"
    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
    transition={{ duration: 25, ease: "linear", repeat: Infinity }}
    style={{
      background:
        "linear-gradient(-45deg, #10b981, #22c55e, #14b8a6, #059669)",
      backgroundSize: "400% 400%",
    }}
  />
);

// @ts-ignore
const LoginForm = ({ onSwitch, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email === "test@example.com" && password === "password") {
      console.log("LOGIN SUCCESS (Mocked)");
      onLoginSuccess(); // This will trigger the navigation
    } else {
      setError("Invalid email or password. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      key="login"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="w-full"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        Welcome Back, Warrior!
      </h2>
      <p className="text-gray-500 mb-8">Log in to continue your mission.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <p className="text-red-500 text-center font-semibold">{error}</p>
        )}

        <div className="relative">
          <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 pl-12 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            required
          />
        </div>
        <div className="relative">
          <FaLock className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pl-12 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            required
          />
        </div>
        <motion.button
          type="submit"
          className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg shadow-lg disabled:opacity-50"
          whileHover={{
            scale: isLoading ? 1 : 1.02,
            y: isLoading ? 0 : -2,
            boxShadow:
              "0 10px 15px -3px rgb(249 115 22 / 0.3)",
          }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          disabled={isLoading}
        >
          {isLoading ? "Logging In..." : "Log In"}
        </motion.button>
      </form>

      <p className="mt-8 text-center text-gray-600">
        Don't have an account?{" "}
        <button
          onClick={onSwitch}
          className="font-bold text-emerald-600 hover:underline"
        >
          Sign Up
        </button>
      </p>
    </motion.div>
  );
};

// @ts-ignore
const SignupForm = ({ onSwitch }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // ✅ role state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // ✅ navigation hook

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (email === "taken@example.com") {
      setError("This email address is already taken.");
      setIsLoading(false);
    } else if (!name || !email || !password || !role) {
      setError("Please fill in all fields.");
      setIsLoading(false);
    } else {
      console.log("SIGNUP SUCCESS (Mocked)", { name, email, role });
      setSuccess("Account created! Redirecting...");

      setTimeout(() => {
        // ✅ Role-based redirect
        if (role === "student") navigate("/student");
        else if (role === "teacher") navigate("/teacher");
        else if (role === "institution") navigate("/institution");
      }, 1500);
    }
  };

  return (
    <motion.div
      key="signup"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="w-full"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Join the Mission</h2>
      <p className="text-gray-500 mb-8">
        Create your account to start your adventure.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <p className="text-red-500 text-center font-semibold">{error}</p>}
        {success && <p className="text-green-600 text-center font-semibold">{success}</p>}

        {/* Name */}
        <div className="relative">
          <FaUser className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 pl-12 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            required
          />
        </div>

        {/* Email */}
        <div className="relative">
          <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 pl-12 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            required
          />
        </div>

        {/* Password */}
        <div className="relative">
          <FaLock className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pl-12 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            required
          />
        </div>

        {/* ✅ Role Choice Box */}
        <div className="relative">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full text-gray-600 p-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            required
          >
            <option value="">Sign up as...</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="institution">Institution</option>
          </select>
        </div>

        <motion.button
          type="submit"
          className="w-full py-3 bg-emerald-600 text-white font-bold rounded-lg shadow-lg disabled:opacity-50"
          whileHover={{
            scale: isLoading ? 1 : 1.02,
            y: isLoading ? 0 : -2,
            boxShadow: "0 10px 15px -3px rgb(16 185 129 / 0.3)",
          }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </motion.button>
      </form>

      <p className="mt-8 text-center text-gray-600">
        Already have an account?{" "}
        <button
          onClick={onSwitch}
          className="font-bold text-emerald-600 hover:underline"
        >
          Log In
        </button>
      </p>
    </motion.div>
  );
};


const AuthPage: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    console.log("Redirecting to dashboard...");
    navigate("//dashboard");
  };

  return (
    <div className="min-h-screen  bg-gray-100  flex items-center  justify-center p-4">
      <div className="relative w-full max-w-5xl h-[650px] flex shadow-2xl rounded-3xl overflow-hidden">
        {/* Left Branding Panel */}
        <div className="relative hidden lg:flex w-1/2 items-center justify-center p-12 text-white">
          <AnimatedGradient />
          <div className="relative z-10 text-center space-y-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
              className="flex items-center justify-center gap-2 text-4xl font-bold"
            >
              <span className="text-4xl">🍃</span>
              <span>Prakriti Ke</span>
              <span className="text-orange-300">Yoddha</span>
            </motion.div>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-200"
            >
              Play, Learn, and Protect. Your mission to save the planet starts
              now.
            </motion.p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="w-full lg:w-1/2 bg-white p-8 sm:p-12 flex flex-col justify-center relative">
          <motion.button
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-4 right-4 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
          >
            ← Back to Home
          </motion.button>

          <AnimatePresence mode="wait">
            {isLoginView ? (
              <LoginForm
                key="login"
                onSwitch={() => setIsLoginView(false)}
                onLoginSuccess={handleLoginSuccess}
              />
            ) : (
              <SignupForm key="signup" onSwitch={() => setIsLoginView(true)} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
