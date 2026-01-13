import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  EnvelopeIcon, 
  LockClosedIcon, 
  UserIcon,
  ArrowRightIcon 
} from "@heroicons/react/24/outline";
import { useAuth } from '../contextAPI/AuthContext';  // 👈 Add this

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();  // 👈 AuthContext hook
  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password || !role) {
      toast.error("Please fill all fields");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${API_URL}/api/users/login`,
        { email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message || "Login successful!");
      
      // 👈 INTEGRATE WITH AUTHCONTEXT
      login(data.token, data.user);  // Set user state & token globally
      
      // Role-based redirect
      if (data.user.role === 'writer') {
        navigate("/admin-blog");
      } else {
        navigate("/my-profile");
      }
      
      // Clear form
      setEmail("");
      setPassword("");
      setRole("");
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen fixed inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-900 flex items-center justify-center ">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-40 left-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-zinc-600 to-zinc-400 bg-clip-text text-transparent text-4xl font-black tracking-tight">
            Gul<span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl">Blog</span>
          </div>
          <div className="w-32 h-1 mx-auto mt-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full shadow-lg" />
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-zinc-900/80 backdrop-blur-3xl border border-zinc-700/50 rounded-4xl p-10 shadow-2xl hover:shadow-3xl hover:shadow-cyan-500/20 transition-all duration-500"
        >
          <div className="text-center mb-10">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="flex justify-center items-center w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl backdrop-blur-xl border-2 border-cyan-400/30 p-5"
            >
              <LockClosedIcon className="w-12 h-12 text-cyan-400 " />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-zinc-400 text-lg">Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Role Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <label className=" text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-cyan-400" />
                Select Role
              </label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-5 py-4 bg-zinc-800/50 backdrop-blur-xl border border-zinc-600/50 rounded-2xl text-zinc-100 placeholder-zinc-400 focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-400 transition-all duration-300 text-lg font-medium hover:border-cyan-400/70 disabled:opacity-50"
                >
                  <option value="">Choose your role</option>
                  <option value="reader">👤 Reader</option>
                  <option value="writer">⚙️ Writer</option>
                </select>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <label className="block text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
                <EnvelopeIcon className="w-5 h-5 text-cyan-400" />
                Email Address
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full px-5 py-4 bg-zinc-800/50 backdrop-blur-xl border border-zinc-600/50 rounded-2xl text-zinc-100 placeholder-zinc-400 focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-400 transition-all duration-300 text-lg font-medium hover:border-cyan-400/70 disabled:opacity-50"
                required
              />
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <label className="block text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
                <LockClosedIcon className="w-5 h-5 text-cyan-400" />
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full px-5 py-4 bg-zinc-800/50 backdrop-blur-xl border border-zinc-600/50 rounded-2xl text-zinc-100 placeholder-zinc-400 focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-400 transition-all duration-300 text-lg font-medium hover:border-cyan-400/70 disabled:opacity-50"
                required
              />
            </motion.div>

            {/* Register Link */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-center text-zinc-400 text-sm"
            >
              New here?{" "}
              <Link 
                to="/register" 
                className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors duration-300 flex items-center justify-center gap-1 group"
              >
                Create Account
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.p>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              className="w-full py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-3xl hover:shadow-cyan-500/40 focus:ring-4 focus:ring-cyan-500/50 border border-transparent hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
            >
              <AnimatePresence>
                {isLoading ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"
                  />
                ) : (
                  <motion.span
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  >
                    Sign In
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>
        </motion.div>

        {/* Bottom Decorative Element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute -bottom-12 -right-12 w-32 h-32 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"
        />
      </div>
    </div>
  );
}
