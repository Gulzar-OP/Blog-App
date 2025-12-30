import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { 
  FaUser, 
  FaSignOutAlt, 
  FaCog,
  FaPlus 
} from "react-icons/fa";
import axios from "axios";

// const API_URL = "http://localhost:3000";
const API_URL="http://blog-app-back-nine.vercel.app"

export default function Navbar() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setShowProfileDropdown(false); // Close profile dropdown when toggling mobile menu
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  /* ---------------- FETCH PROFILE ---------------- */
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/users/my-profile`,
        { withCredentials: true }
      );
      setData(res.data);
      setLogin(true);
    } catch (err) {
      setLogin(false);
      setData(null);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  /* ---------------- LOGOUT ---------------- */
  const logout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/users/logout`,
        {},
        { withCredentials: true }
      );
    } catch (e) {}
    setLogin(false);
    setData(null);
    closeMobileMenu();
    setShowProfileDropdown(false);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const closeProfileDropdown = () => {
    setShowProfileDropdown(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl bg-zinc-900/95 border-b border-zinc-700/50 shadow-2xl shadow-zinc-900/50 py-4 px-6 md:px-12 lg:px-24">
      {/* Animated Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5 blur-xl animate-pulse" />
      
      <div className="relative max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
         
          <Link 
            to="/" 
            className="text-white text-2xl md:text-3xl font-black bg-gradient-to-r from-zinc-200 via-white to-zinc-300 bg-clip-text tracking-tight hover:from-purple-400 hover:to-pink-400 transition-all duration-500"
          >
            Gul<span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-500 bg-clip-text text-blue-500">Blog</span>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <motion.ul 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex items-center space-x-2 lg:space-x-8"
        >
          {[
            { path: "/", label: "HOME" },
            { path: "/blog", label: "BLOGS" },
            { path: "/creators", label: "CREATORS" },
            { path: "/games", label: "GAMES" },
            { path: "/about", label: "ABOUT" },
            { path: "/contact", label: "CONTACT" }
          ].map((item, i) => (
            <motion.li
              key={item.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Link
                to={item.path}
                className="relative px-4 py-3 text-lg font-semibold text-zinc-300 hover:text-white transition-all duration-300 group"
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500  group-hover:inset-0" />
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        {/* Right Section - Desktop */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {login ? (
            <>
              {/* Admin Link */}
              {data?.role === "admin" && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={()=>navigate("/admin-blog")}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-xl rounded-2xl border border-emerald-400/40 text-emerald-300 hover:text-emerald-100 font-semibold text-sm shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                >
                  <FaPlus className="w-4 h-4" />
                  Add Blog
                </motion.div>
              )}

              {/* Profile Dropdown - FIXED */}
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  onClick={toggleProfileDropdown}
                  className="w-12 h-12 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 p-1 shadow-2xl shadow-purple-500/30 cursor-pointer overflow-hidden"
                >
                  <div className="w-full h-full bg-zinc-900/90 backdrop-blur-xl rounded-2xl flex items-center justify-center text-lg font-bold text-white">
                    {data?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                </motion.div>

                {/* Profile Dropdown - WRAPPED IN AnimatePresence */}
                <AnimatePresence>
                  {showProfileDropdown && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-14 bg-zinc-900/95 backdrop-blur-3xl shadow-2xl rounded-3xl w-64 border border-zinc-700/50 overflow-hidden z-50"
                      onMouseEnter={() => setShowProfileDropdown(true)}
                      onMouseLeave={closeProfileDropdown}
                    >
                      <div className="p-6 border-b border-zinc-700/50">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-xl font-black text-white shadow-xl">
                            {data?.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-white text-lg">{data?.name}</p>
                            <p className="text-zinc-400 text-sm">{data?.role?.toUpperCase()}</p>
                          </div>
                        </div>
                      </div>
                      
                      <Link
                        to="/my-profile"
                        className="flex items-center gap-4 px-6 py-4 hover:bg-zinc-800/50 transition-all duration-300 border-b border-zinc-700/50 last:border-b-0"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <FaUser className="w-5 h-5 text-zinc-400" />
                        <span className="font-semibold text-zinc-300">Profile</span>
                      </Link>
                      
                      <button
                        onClick={logout}
                        className="text-white flex items-center gap-4 w-full px-6 py-4 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 text-left"
                      >
                        <FaSignOutAlt className="w-5 h-5" />
                        <span className="font-semibold">Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="flex gap-4">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/login"
                  className="px-6 py-3 bg-zinc-800/50 backdrop-blur-xl border border-zinc-600/50 text-zinc-300 hover:bg-zinc-700/70 hover:text-white font-semibold rounded-2xl shadow-lg hover:shadow-zinc-500/25 transition-all duration-300"
                >
                  Login
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/register"
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
                >
                  Register
                </Link>
              </motion.div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button 
          onClick={toggleMobileMenu}
          whileTap={{ scale: 0.95 }}
          className="md:hidden p-2 rounded-xl bg-zinc-800/50 backdrop-blur-xl border border-zinc-700/50 text-zinc-300 hover:bg-zinc-700/70 hover:text-white transition-all duration-300 shadow-lg"
        >
          {isMobileMenuOpen ? (
            <IoCloseSharp className="w-7 h-7" />
          ) : (
            <AiOutlineMenu className="w-7 h-7" />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-zinc-700/50 bg-zinc-900/95 backdrop-blur-3xl"
          >
            <div className="px-6 py-8 space-y-4">
              {/* Navigation Links */}
              {[
                { path: "/", label: "HOME" },
                { path: "/blog", label: "BLOGS" },
                { path: "/creators", label: "CREATORS" },
                { path: "/games", label: "GAMES" },
                { path: "/about", label: "ABOUT" },
                { path: "/contact", label: "CONTACT" }
              ].map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={closeMobileMenu}
                    className="block px-6 py-4 rounded-2xl bg-zinc-800/30 backdrop-blur-xl border border-zinc-700/50 hover:bg-zinc-700/50 hover:text-white text-lg font-semibold text-zinc-300 transition-all duration-300 flex items-center gap-4"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Auth Section */}
              {login ? (
                <>
                  {data?.role === "admin" && (
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <Link
                        to="/admin-blog"
                        onClick={closeMobileMenu}
                        className="cursor-pointer flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-xl rounded-2xl border border-emerald-400/40 text-emerald-300 hover:text-emerald-100 font-semibold shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 w-full"
                      >
                        <FaPlus className="w-5 h-5" />
                        Add Blog
                      </Link>
                      <Link
                        to="/my-profile"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 px-6 py-4 bg-zinc-800/60 rounded-2xl border border-zinc-600 text-zinc-200 hover:bg-zinc-700 w-full"
                      >
                        <FaUser className="w-5 h-5" />
                        My Profile
                      </Link>
                    </motion.div>
                  )}
                  
                  <div className="pt-6 border-t border-zinc-700/50">
                    <button
                      onClick={logout}
                      className="flex items-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-red-500/20 to-red-500/10 backdrop-blur-xl rounded-2xl border border-red-400/40 text-red-300 hover:text-red-100 hover:bg-red-500/30 font-semibold shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                    >
                      <FaSignOutAlt className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-3 pt-4">
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Link
                      to="/login"
                      onClick={closeMobileMenu}
                      className="block w-full px-6 py-4 bg-zinc-800/50 backdrop-blur-xl border border-zinc-600/50 text-zinc-300 hover:bg-zinc-700/70 hover:text-white font-semibold rounded-2xl shadow-lg hover:shadow-zinc-500/25 transition-all duration-300"
                    >
                      Login
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Link
                      to="/register"
                      onClick={closeMobileMenu}
                      className="block w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
                    >
                      Register
                    </Link>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
