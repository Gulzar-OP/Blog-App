import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UserPlusIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  LockClosedIcon, 
  AcademicCapIcon,
  CameraIcon,
  UserIcon,
  ArrowLeftIcon 
} from "@heroicons/react/24/outline";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    education: "",
  });
  // const API_URL="http://blog-app-back-nine.vercel.app"
  const API_URL = import.meta.env.VITE_API_URL;
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Photo Handler
  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Photo size must be less than 5MB");
      return;
    }

    setPhoto(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setPhotoPreview(reader.result);
    setError("");
  };

  // Form input handler
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  // Register Submit Handler
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.role) {
      toast.error("Please fill all required fields");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const registerData = new FormData();
    Object.keys(formData).forEach(key => {
      registerData.append(key, formData[key]);
    });
    if (photo) {
      registerData.append("photo", photo);
    }

    try {
      const { data } = await axios.post(
        `${API_URL}/api/users/register`,
        registerData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message || "Registration successful!");
      setFormData({ name: "", email: "", phone: "", password: "", role: "", education: "" });
      setPhoto(null);
      setPhotoPreview("");
      navigate("/login");
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Registration failed";
      toast.error(errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-zinc-950 via-black/90 to-zinc-900 flex items-center justify-center px-4 py-12 overflow-hidden relative">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animation-delay-1000" />
        <div className="absolute top-1/2 left-10 w-64 h-64 bg-gradient-to-r from-cyan-400/5 to-blue-500/5 rounded-full blur-3xl animate-pulse animation-delay-500" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-zinc-600 to-zinc-400 bg-clip-text text-transparent text-4xl md:text-5xl font-black tracking-tight">
            Gul<span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl">Blog</span>
          </div>
          <div className="w-32 h-1 mx-auto mt-6 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full shadow-xl" />
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-zinc-900/85 backdrop-blur-3xl border border-zinc-700/50 rounded-4xl p-10 shadow-3xl hover:shadow-4xl hover:shadow-cyan-500/20 transition-all duration-500"
        >
          <div className="text-center mb-12">
            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl backdrop-blur-xl border-4 border-cyan-400/30 p-6 shadow-2xl"
            >
              <UserPlusIcon className="w-14 h-14 text-cyan-400 mx-auto" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent mb-3"
            >
              Create Account
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-zinc-400 text-lg"
            >
              Join our blogging community
            </motion.p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-5 bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-xl border border-red-500/40 rounded-3xl text-red-100 text-sm font-medium shadow-xl"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Role Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <label className="block text-lg font-semibold text-zinc-200 mb-4 flex items-center gap-3">
                <UserIcon className="w-6 h-6 text-cyan-400" />
                Role *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                disabled={loading}
                className="w-full px-6 py-5 bg-zinc-800/60 backdrop-blur-xl border border-zinc-600/50 rounded-3xl text-zinc-100 placeholder-zinc-400 focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-400 transition-all duration-400 text-lg font-semibold hover:border-cyan-400/70 disabled:opacity-50"
                required
              >
                <option value="">Choose your role</option>
                <option value="reader">👤 Reader</option>
                <option value="writer">⚙️ Writer</option>
              </select>
            </motion.div>

            {/* Name & Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <label className="block text-lg font-semibold text-zinc-200 mb-4 flex items-center gap-3">
                  <UserIcon className="w-6 h-6 text-emerald-400" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full px-6 py-5 bg-zinc-800/60 backdrop-blur-xl border border-zinc-600/50 rounded-3xl text-zinc-100 placeholder-zinc-400 focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all duration-400 text-lg font-semibold hover:border-emerald-400/70 disabled:opacity-50"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <label className="block text-lg font-semibold text-zinc-200 mb-4 flex items-center gap-3">
                  <EnvelopeIcon className="w-6 h-6 text-blue-400" />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full px-6 py-5 bg-zinc-800/60 backdrop-blur-xl border border-zinc-600/50 rounded-3xl text-zinc-100 placeholder-zinc-400 focus:ring-4 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-400 text-lg font-semibold hover:border-blue-400/70 disabled:opacity-50"
                  required
                />
              </motion.div>
            </div>

            {/* Phone & Password Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <label className="block text-lg font-semibold text-zinc-200 mb-4 flex items-center gap-3">
                  <PhoneIcon className="w-6 h-6 text-purple-400" />
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full px-6 py-5 bg-zinc-800/60 backdrop-blur-xl border border-zinc-600/50 rounded-3xl text-zinc-100 placeholder-zinc-400 focus:ring-4 focus:ring-purple-500/30 focus:border-purple-400 transition-all duration-400 text-lg font-semibold hover:border-purple-400/70 disabled:opacity-50"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <label className="block text-lg font-semibold text-zinc-200 mb-4 flex items-center gap-3">
                  <LockClosedIcon className="w-6 h-6 text-orange-400" />
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full px-6 py-5 bg-zinc-800/60 backdrop-blur-xl border border-zinc-600/50 rounded-3xl text-zinc-100 placeholder-zinc-400 focus:ring-4 focus:ring-orange-500/30 focus:border-orange-400 transition-all duration-400 text-lg font-semibold hover:border-orange-400/70 disabled:opacity-50"
                  required
                />
              </motion.div>
            </div>

            {/* Education & Photo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <label className="block text-lg font-semibold text-zinc-200 mb-4 flex items-center gap-3">
                  <AcademicCapIcon className="w-6 h-6 text-pink-400" />
                  Education
                </label>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full px-6 py-5 bg-zinc-800/60 backdrop-blur-xl border border-zinc-600/50 rounded-3xl text-zinc-100 placeholder-zinc-400 focus:ring-4 focus:ring-pink-500/30 focus:border-pink-400 transition-all duration-400 text-lg font-semibold hover:border-pink-400/70 disabled:opacity-50"
                >
                  <option value="">Select Education</option>
                  <option value="BCA">BCA</option>
                  <option value="BSc CS">BSc Computer Science</option>
                  <option value="MCA">MCA</option>
                  <option value="BTech">BTech</option>
                  <option value="MTech">MTech</option>
                  <option value="Other">Other</option>
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <label className="block text-lg font-semibold text-zinc-200 mb-4 flex items-center gap-3">
                  <CameraIcon className="w-6 h-6 text-indigo-400" />
                  Profile Photo
                </label>
                <div className="space-y-3">
                  <div className="group relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={changePhotoHandler}
                      disabled={loading}
                      className="w-full px-6 py-5 bg-zinc-800/60 backdrop-blur-xl border-2 border-dashed border-zinc-600/50 rounded-3xl text-zinc-100 cursor-pointer file:hidden hover:border-indigo-400/70 focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all duration-400 disabled:opacity-50"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <CameraIcon className="w-8 h-8 text-indigo-400" />
                    </div>
                  </div>
                  <AnimatePresence>
                    {photoPreview && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="w-full h-32 rounded-3xl overflow-hidden border-4 border-emerald-400/50 shadow-2xl bg-gradient-to-br from-zinc-800 to-zinc-900"
                      >
                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-center pt-8 border-t border-zinc-700/50"
            >
              <p className="text-zinc-400 text-lg mb-4">Already have an account?</p>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold text-xl group"
              >
                <Link to="/login" className="flex items-center gap-2">
                  Sign in here
                  <ArrowLeftIcon className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.03 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              className="w-full py-7 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-black text-xl rounded-4xl shadow-3xl hover:shadow-4xl hover:shadow-cyan-500/50 focus:ring-8 focus:ring-cyan-500/40 border border-transparent hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-400 flex items-center justify-center gap-4 group relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating Account...</span>
                  </motion.div>
                ) : (
                  <motion.span
                    key="text"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="group-hover:translate-x-2 transition-transform duration-300"
                  >
                    🚀 Create Account
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
