import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { FaUser, FaSignOutAlt, FaPlus } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";
import socket from "../socket";
import { CheckIcon, SparklesIcon } from "@heroicons/react/24/outline";
const API_URL = import.meta.env.VITE_API_URL;
import { useAuth } from "../contextAPI/AuthContext";
const NAV_ITEMS = [
  { path: "/", label: "HOME" },
  { path: "/blog", label: "BLOGS" },
  { path: "/creators", label: "CREATORS" },
  { path: "/about", label: "ABOUT" },
  { path: "/contact", label: "CONTACT" },
];

export default function Navbar() {
  const [notifications, setNotifications] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [totalCount, setTotalCount] = useState();
  const {user} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
// useEffect(() => {
//   console.log("Login User in Navbar:", user);
// }, [user]);


  // Active path detection helper
  const isActive = useCallback((path) => {
    return location.pathname === path;
  }, [location.pathname]);
  // Memoized handlers
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
    setShowProfileDropdown(false);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleNotifications = useCallback(() => {
    setShowNotifications((prev) => !prev);
  }, []);

  const toggleProfileDropdown = useCallback(() => {
    setShowProfileDropdown((prev) => !prev);
  }, []);

  const closeProfileDropdown = useCallback(() => {
    setShowProfileDropdown(false);
  }, []);

  // ✅ Fixed: Fetch notifications from API
  const fetchNotifications = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/notifications`, {
        withCredentials: true,
      });
      setNotifications(response.data.notifications || []);
      setTotalCount(response?.data?.notifications?.length);
    } catch (error) {
      console.error("Notification fetch error:", error);
    }
  }, []);

  const markAsRead = async (id) => {
    try {
      await axios.patch(
        `${API_URL}/api/notifications/${id}/read`,
        {},
        { withCredentials: true }
      );

      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (error) {
      console.error("Mark read error:", error);
    }
  };

  const markAllRead = async () => {
    try {
      const res = await axios.patch(
        `${API_URL}/api/notifications/mark-all-read`,
        {},
        {
          withCredentials: true,
        }
      );

      setNotifications([]); // Clear local state
      toast.success("All notifications read! ✅");
    } catch (error) {
      toast.error("Failed to mark all as read");
    }
  };

  // ✅ Fixed: Single socket notification handler
  const handleBlogNotification = useCallback((data) => {
    setNotifications((prev) => [data, ...prev.slice(0, 9)]); // Keep last 10 max
    // toast.success(data.message || "New notification!");
  }, []);

  // ✅ Fixed: Socket listeners
  useEffect(() => {
    // Blog notifications
    socket.on("blog-notification", handleBlogNotification);

    // New post notifications (from admin panel)
    socket.on("new-post", (data) => {
      handleBlogNotification({
        message: `New blog post: "${data.title}"`,
        type: "new_post",
        blogId: data.id,
      });
    });

    // Delete post notifications
    socket.on("delete-post", (data) => {
      handleBlogNotification({
        message: `Blog "${data.title}" was deleted`,
        type: "delete_post",
        blogId: data.id,
      });
    });

    return () => {
      socket.off("blog-notification", handleBlogNotification);
      socket.off("new-post");
      socket.off("delete-post");
    };
  }, [handleBlogNotification]);

  // Socket room join
  useEffect(() => {
    if (user?._id) {
      
      socket.emit("join", user._id);
    }
  }, [user?._id]);

  // Profile fetch
  const fetchProfile = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/users/my-profile`, {
        withCredentials: true,
      });
      setUser(res.data);
      setIsLoggedIn(true);
      fetchNotifications(); // ✅ Fetch notifications on login
    } catch {
      setIsLoggedIn(false);
      setUser(null);
      setNotifications([]);
    }
  }, [fetchNotifications]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Logout
  const logout = useCallback(async () => {
    try {
      await axios.post(
        `${API_URL}/api/users/logout`,
        {},
        { withCredentials: true }
      );
    } catch {
      // Silent fail
    } finally {
      setIsLoggedIn(false);
      setUser(null);
      setNotifications([]);
      closeMobileMenu();
      closeProfileDropdown();
      setShowNotifications(false);
    }
  }, [closeMobileMenu, closeProfileDropdown]);
  // console.log("User Role:", user?.role);
  const isAdmin = user?.role === "admin" ;
  // console.log("Is Admin:", isAdmin);
  const isWriter = user?.role === "writer" ;
  // console.log("Is Writer:", isWriter);
  // console.log("Is Admin:", isAdmin);
  const userInitial = user?.name?.charAt(0)?.toUpperCase() || "U";
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  // console.log(unreadCount);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl bg-black-900/95  shadow-2xl shadow-zinc-900/50 py-4 px-6 md:px-12 lg:px-24">
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
            Blog
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-500 bg-clip-text text-transparent">
              Sphere
            </span>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <motion.ul
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex items-center space-x-2 lg:space-x-8"
        >
          {NAV_ITEMS.map((item, index) => (
            <motion.li
              key={item.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Link
                to={item.path}
                // className="relative px-4 py-3 text-lg font-semibold text-zinc-300 hover:text-white transition-all duration-300 group"
                 className={`
                  active relative px-4 py-3 text-lg font-semibold 
                  transition-all duration-300 group
                  ${isActive(item.path) 
                    ? 'text-white bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl shadow-lg shadow-purple-500/25 backdrop-blur-xl border border-purple-400/50' 
                    : 'text-zinc-300 hover:text-white'
                  }
                `}
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500 -inset-1" />
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {isLoggedIn ? (
            <>
              {isAdmin && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate("/admin-dashboard")}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-xl rounded-2xl border border-emerald-400/40 text-emerald-300 hover:text-emerald-100 font-semibold text-sm shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 cursor-pointer"
                >
                   Admin Deshboard 
                </motion.div>
              )}
              {isWriter && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate("/writer-dashboard")}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-xl rounded-2xl border border-emerald-400/40 text-emerald-300 hover:text-emerald-100 font-semibold text-sm shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 cursor-pointer"
                >
                   Writer Deshboard 
                </motion.div>
              )}
              {/* Notifications */}
              {/* Notification Icon with Badge */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                className="relative p-3 rounded-3xl bg-gradient-to-br from-zinc-900/80 via-zinc-950/90 to-black/80 backdrop-blur-3xl border border-zinc-700/50 shadow-2xl hover:shadow-cyan-500/20 hover:border-cyan-400/50 hover:bg-zinc-900/95 transition-all duration-400 cursor-pointer group"
                onClick={toggleNotifications}
              >
                <IoIosNotificationsOutline
                  size={26}
                  className="text-zinc-400 group-hover:text-cyan-300 transition-all duration-300"
                />

                {/* Dynamic Badge */}
                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 min-w-[20px] h-6 flex items-center justify-center text-xs font-bold bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-full shadow-lg border-2 border-white/30 drop-shadow-lg"
                  >
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </motion.span>
                )}
              </motion.div>

              {/* Notification Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: -12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -12 }}
                    transition={{
                      duration: 0.25,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="absolute right-0 top-16 w-96 bg-zinc-950/98 backdrop-blur-3xl shadow-2xl shadow-zinc-900/50 rounded-3xl border border-gradient-to-r border-from-zinc-700/60 border-to-zinc-800/60 overflow-hidden z-50 max-h-[500px] overflow-y-auto"
                  >
                    {/* Header */}
                    <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-zinc-800/50 bg-gradient-to-r from-zinc-950/100 via-zinc-900/95 to-zinc-950/100 backdrop-blur-xl">
                      {/* Left: Title + Counter */}
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl border border-cyan-400/40 shadow-lg">
                          <IoIosNotificationsOutline className="w-7 h-7 text-cyan-400 drop-shadow-lg" />
                        </div>
                        <div>
                          <h3 className="text-white text-2xl font-black bg-gradient-to-r from-white to-zinc-200 bg-clip-text tracking-tight">
                            Notifications
                          </h3>
                          <p className="text-lg text-zinc-400 font-medium">
                            {unreadCount} unread • {notifications.length} total
                          </p>
                        </div>
                      </div>

                      {/* Right: Mark All Read Button */}
                      {unreadCount > 0 && (
                        <motion.button
                          whileHover={{
                            scale: 1.05,
                            boxShadow: "0 8px 25px rgba(34, 197, 94, 0.4)",
                          }}
                          whileTap={{ scale: 0.98 }}
                          onClick={markAllRead}
                          className="group relative flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-emerald-500/90 to-green-500/90 hover:from-emerald-600 hover:to-green-600 text-white font-bold text-sm rounded-2xl shadow-lg hover:shadow-emerald-500/40 border border-emerald-400/50 backdrop-blur-xl transition-all duration-300 overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/50 to-green-400/50 blur opacity-0 group-hover:opacity-100 transition-opacity" />
                          <CheckIcon className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
                          <span className="relative z-10">
                            Mark All ({unreadCount})
                          </span>
                        </motion.button>
                      )}
                    </div>

                    {/* Empty State */}
                    {notifications.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-20 px-8 text-center"
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="w-20 h-20 p-4 bg-zinc-900/50 rounded-3xl backdrop-blur-xl shadow-2xl mb-6 flex items-center justify-center border border-zinc-700/50"
                        >
                          <IoIosNotificationsOutline className="w-12 h-12 text-zinc-600" />
                        </motion.div>
                        <h4 className="text-2xl font-bold text-zinc-400 mb-2">
                          All Clear!
                        </h4>
                        <p className="text-zinc-500 text-lg max-w-md leading-relaxed">
                          You're all caught up. New notifications will appear
                          here.
                        </p>
                      </motion.div>
                    ) : (
                      /* Notifications List */
                      <div className="divide-y divide-zinc-800/50">
                        {notifications.map((n, i) => (
                          <motion.div
                            key={n._id || i}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{
                              backgroundColor: "rgba(34, 197, 94, 0.1)",
                              scale: 1.02,
                              borderLeft: "4px solid rgb(34, 197, 94)",
                            }}
                            className="p-6 hover:bg-zinc-900/50 transition-all duration-300 border-l-4 border-transparent cursor-pointer group relative"
                            onClick={() => markAsRead(n._id)}
                          >
                            {/* New Dot Indicator */}
                            {!n.isRead && (
                              <motion.div
                                className="absolute -left-2 top-6 w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full shadow-lg animate-pulse"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                              />
                            )}

                            {/* Content */}
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl p-2.5 backdrop-blur-xl border border-cyan-400/30 flex items-center justify-center mt-0.5">
                                <SparklesIcon className="w-6 h-6 text-cyan-400 shadow-lg" />
                              </div>

                              <div className="flex-1 min-w-0">
                                <p className="text-lg font-semibold text-white leading-tight line-clamp-2 mb-2 group-hover:text-emerald-300 transition-colors">
                                  {n.message || n.title || "New notification"}
                                </p>
                                {n.createdAt && (
                                  <p className="text-sm text-zinc-500 font-mono tracking-wide flex items-center gap-2">
                                    {new Date(n.createdAt).toLocaleString()}
                                    {!n.isRead && (
                                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full font-bold">
                                        NEW
                                      </span>
                                    )}
                                  </p>
                                )}
                              </div>

                              {/* Hover Action */}
                              <motion.div
                                className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto flex-shrink-0"
                                initial={{ scale: 0 }}
                                whileHover={{ scale: 1.1 }}
                              >
                                <CheckIcon className="w-6 h-6 text-emerald-400 shadow-lg" />
                              </motion.div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Profile Dropdown */}
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  onClick={toggleProfileDropdown}
                  className="flex items-center gap-3 cursor-pointer p-2 rounded-2xl hover:bg-zinc-800/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 p-1 shadow-2xl shadow-purple-500/30 overflow-hidden">
                    <div className="w-full h-full bg-zinc-900/90 backdrop-blur-xl rounded-2xl flex items-center justify-center text-lg font-bold text-white">
                      {userInitial}
                    </div>
                  </div>
                </motion.div>

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
                          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-xl">
                            {userInitial}
                          </div>
                          <div>
                            <p className="font-bold text-white text-lg">
                              {user?.name}
                            </p>
                            <p className="text-zinc-400 text-sm">
                              {user?.role?.toUpperCase()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Link
                        to="/my-profile"
                        className="flex items-center gap-4 px-6 py-4 hover:bg-zinc-800/50 transition-all duration-300 border-b border-zinc-700/50"
                        onClick={closeProfileDropdown}
                      >
                        <FaUser className="w-5 h-5 text-zinc-400" />
                        <span className="font-semibold text-zinc-300">
                          Profile
                        </span>
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

        {/* Mobile Right Section */}
        {/* ✅ FIXED: Mobile Notifications - ONLY for logged-in users */}
{isLoggedIn && (
  <div className="md:hidden relative ml-4">
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-2 rounded-2xl bg-zinc-800/50 backdrop-blur-xl border border-zinc-600/50 hover:bg-zinc-700/70 transition-all duration-300 cursor-pointer relative group"
      onClick={toggleNotifications}
    >
      <IoIosNotificationsOutline
        size={24}
        className="text-zinc-300 group-hover:text-white transition-all duration-300"
      />

      {/* Dynamic Badge - Mobile */}
      {unreadCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 min-w-[18px] h-5 flex items-center justify-center text-xs font-bold bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-full shadow-lg border-2 border-white/30 drop-shadow-lg"
        >
          {unreadCount > 99 ? "99+" : unreadCount}
        </motion.span>
      )}
    </motion.div>
  </div>
)}


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

      {/* Mobile Notifications Dropdown */}
      <AnimatePresence>
        { showNotifications && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className=" md:hidden border-t border-zinc-700/50 bg-zinc-900/95 backdrop-blur-3xl"
          >
            <div className="px-6 py-4 max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="text-center py-8 text-zinc-400">
                  <IoIosNotificationsOutline
                    size={32}
                    className="mx-auto mb-4 opacity-50"
                  />
                  <p className="text-sm">No new notifications</p>
                </div>
              ) : (
                notifications.map((n, i) => (
                  <motion.div
                    key={n._id || i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{
                      backgroundColor: "rgba(34, 197, 94, 0.1)",
                      scale: 1.02,
                      borderLeft: "4px solid rgb(34, 197, 94)",
                    }}
                    className="p-6 hover:bg-zinc-900/50 transition-all duration-300 border-l-4 border-transparent cursor-pointer group relative"
                    onClick={() => markAsRead(n._id)}
                  >
                    {/* New Dot Indicator */}
                    {!n.isRead && (
                      <motion.div
                        className="absolute -left-2 top-6 w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full shadow-lg animate-pulse"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      />
                    )}

                    {/* Content */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl p-2.5 backdrop-blur-xl border border-cyan-400/30 flex items-center justify-center mt-0.5">
                        <SparklesIcon className="w-6 h-6 text-cyan-400 shadow-lg" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-semibold text-white leading-tight line-clamp-2 mb-2 group-hover:text-emerald-300 transition-colors">
                          {n.message || n.title || "New notification"}
                        </p>
                        {n.createdAt && (
                          <p className="text-sm text-zinc-500 font-mono tracking-wide flex items-center gap-2">
                            {new Date(n.createdAt).toLocaleString()}
                            {!n.isRead && (
                              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full font-bold">
                                NEW
                              </span>
                            )}
                          </p>
                        )}
                      </div>

                      {/* Hover Action */}
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto flex-shrink-0"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <CheckIcon className="w-6 h-6 text-emerald-400 shadow-lg" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={closeMobileMenu}
                    className="block px-6 py-4 rounded-2xl bg-zinc-800/30 backdrop-blur-xl border border-zinc-700/50 hover:bg-zinc-700/50 hover:text-white text-lg font-semibold text-zinc-300 transition-all duration-300"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {isLoggedIn ? (
                <>
                  {isAdmin && (
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <Link
                        to="/admin-blog"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-xl rounded-2xl border border-emerald-400/40 text-emerald-300 hover:text-emerald-100 font-semibold shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 w-full"
                      >
                        <FaPlus className="w-5 h-5" /> Add Blog
                      </Link>
                    </motion.div>
                  )}
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Link
                      to="/my-profile"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 px-6 py-4 bg-zinc-800/60 rounded-2xl border border-zinc-600 text-zinc-200 hover:bg-zinc-700 w-full"
                    >
                      <FaUser className="w-5 h-5" /> My Profile
                    </Link>
                  </motion.div>
                  <div className="pt-6 border-t border-zinc-700/50">
                    <button
                      onClick={logout}
                      className=" flex items-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-red-500/20 to-red-500/10 backdrop-blur-xl rounded-2xl border border-red-400/40 text-red-300 hover:text-red-100 hover:bg-red-500/30 font-semibold shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                    >
                      <FaSignOutAlt className="w-5 h-5" /> Logout
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
