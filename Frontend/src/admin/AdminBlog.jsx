import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  PhotoIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import socket from "../socket";

// const API_URL = "http://localhost:3000";
// const API_URL="http://blog-app-back-nine.vercel.app"
const API_URL = import.meta.env.VITE_API_URL;

export default function AdminBlog() {
  const [blogs, setBlogs] = useState([]);
  const [notifications, setNotifications] = useState([]); 
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    about: "",
    adminName: "",
    adminPhoto: "",
    blogImage: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  // Top inside component - Socket notifications
  const createPostNotification = (blog) => {
    socket.emit("new-post", {
      id: blog._id,
      title: blog.title,
    });
  };

  const deletePostNotification = (blog) => {
    socket.emit("delete-post", {
      id: blog._id,
      title: blog.title,
    });
  };

  // ✅ Fixed socket notification listener
  useEffect(() => {
    socket.on("new-notification", (data) => {
      console.log("🔔 Notification:", data);
      setNotifications((prev) => [...prev, { ...data, isRead: false }]);
      toast.success(data.message || "New notification received!");
    });

    return () => socket.off("new-notification");
  }, []);

  // ✅ Fetch blogs
  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/blogs/all-blogs`);
      setBlogs(res.data.blogs || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ✅ Cleanup image preview
  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // ✅ Input handler
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "blogImage" && files?.[0]) {
      const file = files[0];
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size must be less than 5MB');
        return;
      }
      setFormData((prev) => ({ ...prev, blogImage: file }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Reset form
  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      category: "",
      about: "",
      adminName: "",
      adminPhoto: "",
      blogImage: null,
    });
    setImagePreview(null);
    setShowForm(false);
  };

  // ✅ Create blog
  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) fd.append(key, value);
      });

      const res = await axios.post(
        `${API_URL}/api/blogs/create`,
        fd,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const createdBlog = res.data.blog;
      toast.success("Blog created successfully");

      // ✅ Real-time notification
      createPostNotification(createdBlog);

      resetForm();
      fetchBlogs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Edit blog
  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      category: blog.category,
      about: blog.about,
      adminName: blog.adminName,
      adminPhoto: blog.adminPhoto || "",
      blogImage: null,
    });
    setImagePreview(blog.blogImage?.url || null);
    setEditingId(blog._id);
    setShowForm(true);
  };

  // ✅ Update blog
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) fd.append(key, value);
      });

      await axios.put(
        `${API_URL}/api/blogs/update/${editingId}`,
        fd,
        { 
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      toast.success("Blog updated successfully");
      resetForm();
      fetchBlogs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete blog
  const handleDelete = async (id) => {
    try {
      const blogToDelete = blogs.find((b) => b._id === id);

      await axios.delete(
        `${API_URL}/api/blogs/delete/${id}`,
        { withCredentials: true }
      );

      toast.success("Blog deleted successfully");

      if (blogToDelete) {
        deletePostNotification(blogToDelete);
      }

      fetchBlogs();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // ✅ Filter blogs
  const filteredBlogs = blogs.filter((b) => {
    const matchSearch =
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.adminName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchCategory =
      selectedCategory === "All" || b.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  const categories = ["All", ...new Set(blogs.map((b) => b.category))];

  // ✅ Unread notifications count
  // const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-black via-zinc-950/90 to-zinc-900/80 relative overflow-hidden">
      {/* <Notification /> */}
      
      {/* Notification Badge - ✅ Fixed */}
      {/* <div className="fixed top-24 right-12 z-50">
        <div className="relative">
          <IoIosNotificationsOutline size={28} className="text-zinc-400 hover:text-white cursor-pointer transition-colors" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          )}
        </div>
      </div> */}

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-b from-emerald-500/5 to-orange-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-3/4 left-1/4 w-72 h-72 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.5s'}} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600/20 via-emerald-600/20 to-orange-600/20 backdrop-blur-2xl rounded-3xl border border-purple-500/40 shadow-2xl shadow-purple-500/30 mb-8"
          >
            <PlusIcon className="w-8 h-8 text-emerald-300" />
            <span className="text-2xl font-black text-white tracking-wider">ADMIN DASHBOARD</span>
          </motion.div>
          <h1 className="text-white text-6xl md:text-8xl font-black bg-gradient-to-r from-zinc-200 via-white to-zinc-300 bg-clip-text drop-shadow-2xl mb-6 tracking-tight">
            Blog Control
          </h1>
          <p className="text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed backdrop-blur-sm px-12 py-6 bg-black/40 rounded-4xl border border-zinc-700/50 shadow-2xl">
            Manage, create, and organize your blog posts with precision
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="group bg-gradient-to-br from-zinc-900/70 via-black/50 to-zinc-900/70 backdrop-blur-3xl rounded-4xl p-8 border border-zinc-700/50 shadow-2xl hover:shadow-purple-500/30 hover:border-purple-500/60 transition-all duration-500 text-center"
          >
            <div className="text-4xl font-black text-emerald-400 mb-2 group-hover:text-emerald-300">{blogs.length}</div>
            <div className="text-zinc-400 font-mono text-sm tracking-wider uppercase">Total Blogs</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="group bg-gradient-to-br from-zinc-900/70 via-black/50 to-zinc-900/70 backdrop-blur-3xl rounded-4xl p-8 border border-zinc-700/50 shadow-2xl hover:shadow-emerald-500/30 hover:border-emerald-500/60 transition-all duration-500 text-center"
          >
            <div className="text-4xl font-black text-purple-400 mb-2 group-hover:text-purple-300">{filteredBlogs.length}</div>
            <div className="text-zinc-400 font-mono text-sm tracking-wider uppercase">Filtered</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="group bg-gradient-to-br from-zinc-900/70 via-black/50 to-zinc-900/70 backdrop-blur-3xl rounded-4xl p-8 border border-zinc-700/50 shadow-2xl hover:shadow-orange-500/30 hover:border-orange-500/60 transition-all duration-500 text-center"
          >
            <div className="text-4xl font-black text-orange-400 mb-2 group-hover:text-orange-300">{categories.length - 1}</div>
            <div className="text-zinc-400 font-mono text-sm tracking-wider uppercase">Categories</div>
          </motion.div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/60 backdrop-blur-3xl shadow-2xl rounded-4xl p-8 border border-zinc-700/50 mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-end lg:items-center">
            <div className="relative flex-1 max-w-md group">
              <MagnifyingGlassIcon className="w-6 h-6 absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-purple-400 transition-colors" />
              <input
                type="text"
                placeholder="Search by title, category or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-5 bg-zinc-900/70 backdrop-blur-xl border-2 border-zinc-700/50 rounded-3xl text-xl font-semibold text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-4 focus:ring-purple-500/40 focus:border-purple-500/70 transition-all duration-500"
              />
            </div>
            
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="font-black text-zinc-300">Filter:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-zinc-900/70 backdrop-blur-xl border border-zinc-600/50 rounded-2xl px-4 py-3 text-lg font-semibold text-zinc-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/70 transition-all duration-300"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-zinc-900 text-zinc-200">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(!showForm)}
                className="group relative flex items-center gap-3 bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white px-10 py-5 rounded-3xl shadow-2xl hover:shadow-purple-500/50 backdrop-blur-xl border border-purple-500/50 font-black text-xl transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 to-emerald-500/50 blur -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <PlusIcon className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" />
                <span>{showForm ? "Close Form" : "Create Blog"}</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Form Modal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showForm ? 1 : 0, y: showForm ? 0 : 30 }}
          transition={{ duration: 0.4 }}
        >
          {showForm && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-black/70 backdrop-blur-3xl shadow-2xl rounded-4xl border border-zinc-700/50 overflow-hidden mb-12 max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-r from-purple-600/95 via-emerald-600/95 to-orange-600/95 p-10 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                <div className="relative z-10 flex items-center justify-between">
                  <h2 className="text-4xl font-black flex items-center gap-4">
                    <PencilIcon className="w-10 h-10" />
                    {editingId ? "Edit Blog Post" : "Create New Blog"}
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetForm}
                    className="p-3 rounded-3xl bg-white/20 backdrop-blur-xl hover:bg-white/30 shadow-2xl hover:shadow-white/20 transition-all duration-300"
                  >
                    <XMarkIcon className="w-8 h-8" />
                  </motion.button>
                </div>
              </div>

              <form
                onSubmit={editingId ? handleUpdate : handleCreate}
                className="p-12 lg:p-16 space-y-10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="block text-xl font-black text-zinc-200 flex items-center gap-3">
                      Blog Title
                    </label>
                    <input
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-8 py-6 border-2 border-zinc-700/50 rounded-4xl bg-zinc-900/70 backdrop-blur-xl text-2xl font-bold text-zinc-200 focus:outline-none focus:ring-4 focus:ring-purple-500/40 focus:border-purple-500/70 transition-all duration-500 placeholder-zinc-500"
                      placeholder="Enter an engaging blog title"
                      required
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <label className="block text-xl font-black text-zinc-200 flex items-center gap-3">
                      Category
                    </label>
                    <input
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-8 py-6 border-2 border-zinc-700/50 rounded-4xl bg-zinc-900/70 backdrop-blur-xl text-2xl font-bold text-zinc-200 focus:outline-none focus:ring-4 focus:ring-purple-500/40 focus:border-purple-500/70 transition-all duration-500 placeholder-zinc-500"
                      placeholder="Technology, Gaming, Lifestyle..."
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-xl font-black text-zinc-200 flex items-center gap-3">
                    Content Preview
                  </label>
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-8 py-6 border-2 border-zinc-700/50 rounded-4xl bg-zinc-900/70 backdrop-blur-xl text-xl font-semibold text-zinc-200 focus:outline-none focus:ring-4 focus:ring-purple-500/40 focus:border-purple-500/70 transition-all duration-500 resize-vertical placeholder-zinc-500"
                    placeholder="Write a brief summary or preview of your blog post..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Image Upload */}
                  <div className="space-y-6">
                    <label className="block text-xl font-black text-zinc-200 flex items-center gap-3">
                      <PhotoIcon className="w-8 h-8 text-emerald-400" />
                      Featured Image
                    </label>
                    <div className="space-y-4">
                      <input
                        type="file"
                        name="blogImage"
                        ref={fileInputRef}
                        onChange={handleInputChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center justify-center gap-3 px-10 py-6 bg-gradient-to-r from-emerald-600/90 to-green-600/90 hover:from-emerald-700 hover:to-green-700 text-white rounded-4xl shadow-2xl hover:shadow-emerald-500/50 backdrop-blur-xl border border-emerald-500/50 font-black text-xl transition-all duration-500"
                      >
                        <PhotoIcon className="w-7 h-7" />
                        {imagePreview ? "Change Featured Image" : "Upload Featured Image"}
                      </motion.button>
                      {imagePreview && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="w-full h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-500/30 bg-gradient-to-br from-zinc-900/50 to-black/20"
                        >
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col lg:flex-row gap-6 pt-12"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="flex-1 group bg-gradient-to-r from-emerald-600/95 to-green-600/95 hover:from-emerald-700 hover:to-green-700 text-white py-8 px-12 rounded-4xl shadow-2xl hover:shadow-emerald-500/60 backdrop-blur-xl border border-emerald-500/50 font-black text-2xl flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 overflow-hidden relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/50 to-green-500/50 -inset-1 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {loading ? (
                      <>
                        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : editingId ? (
                      <>
                        <CheckIcon className="w-8 h-8" />
                        Update Blog
                      </>
                    ) : (
                      <>
                        <CheckIcon className="w-8 h-8" />
                        Create Blog
                      </>
                    )}
                  </motion.button>
                  
                  {!editingId && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={resetForm}
                      className="px-16 py-8 border-2 border-zinc-700/50 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/50 hover:border-purple-500/60 backdrop-blur-xl rounded-4xl shadow-xl hover:shadow-purple-500/30 transition-all duration-500 font-black text-xl"
                    >
                      Cancel
                    </motion.button>
                  )}
                </motion.div>
              </form>
            </motion.div>
          )}
        </motion.div>

        {/* Blogs Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-8"
        >
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ 
                  y: -15, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group relative bg-gradient-to-br from-zinc-900/80 via-black/40 to-zinc-900/80 backdrop-blur-3xl rounded-4xl border border-zinc-700/50 hover:border-purple-500/70 shadow-2xl hover:shadow-purple-500/40 overflow-hidden h-full flex flex-col transition-all duration-700"
              >
                {/* Image */}
                {blog.blogImage?.url ? (
                  <div className="relative h-64 overflow-hidden rounded-3xl flex-shrink-0">
                    <motion.img
                      src={blog.blogImage.url}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="h-64 bg-gradient-to-br from-zinc-800 to-black rounded-3xl flex items-center justify-center flex-shrink-0">
                    <PhotoIcon className="w-24 h-24 text-zinc-500" />
                  </div>
                )}

                {/* Content */}
                <div className="p-10 flex-1 flex flex-col">
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="inline-block bg-gradient-to-r from-purple-500/90 to-emerald-500/90 text-white px-6 py-3 rounded-3xl font-black text-lg shadow-2xl mb-6 backdrop-blur-xl border border-white/30 uppercase tracking-wider"
                  >
                    {blog.category}
                  </motion.span>
                  
                  <h3 className="text-2xl font-black text-zinc-100 mb-6 leading-tight line-clamp-2 group-hover:text-purple-300 transition-all duration-500 drop-shadow-xl">
                    {blog.title}
                  </h3>
                  
                  <p className="text-zinc-400 text-lg line-clamp-3 mb-8 leading-relaxed flex-1">
                    {blog.about}
                  </p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-zinc-700/50">
                    <span className="text-xl font-black text-zinc-300 bg-zinc-800/50 px-6 py-3 rounded-2xl backdrop-blur-xl">
                      {blog.adminName || "Admin"}
                    </span>
                    
                    <motion.div 
                      className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      initial={{ x: 20 }}
                      whileHover={{ x: 0 }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEdit(blog)}
                        className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-3xl shadow-2xl hover:shadow-purple-500/50 backdrop-blur-xl border border-purple-500/50 transition-all duration-300"
                        title="Edit"
                      >
                        <PencilIcon className="w-6 h-6" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(blog._id)}
                        className="p-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-3xl shadow-2xl hover:shadow-red-500/50 backdrop-blur-xl border border-red-500/50 transition-all duration-300"
                        title="Delete"
                      >
                        <TrashIcon className="w-6 h-6" />
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="col-span-full text-center py-32"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.05, 0.95, 1.05, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-32 h-32 mx-auto mb-12 bg-gradient-to-br from-zinc-900/70 to-black/50 rounded-4xl backdrop-blur-3xl border-4 border-purple-500/30 shadow-2xl flex items-center justify-center p-8"
              >
                <MagnifyingGlassIcon className="w-20 h-20 text-zinc-500" />
              </motion.div>
              <h3 className="text-5xl font-black text-zinc-500 mb-6 bg-gradient-to-r from-zinc-400 to-zinc-300 bg-clip-text drop-shadow-xl">
                No Blogs Found
              </h3>
              <p className="text-2xl text-zinc-600 max-w-2xl mx-auto leading-relaxed backdrop-blur-sm px-12 py-8 bg-zinc-900/50 rounded-4xl border border-zinc-700/50">
                Try adjusting your search terms or filters to find what you're looking for
              </p>
            </motion.div>
          )}
        </motion.div>

        {filteredBlogs.length === 0 && searchTerm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white px-12 py-6 rounded-4xl shadow-2xl hover:shadow-purple-500/50 backdrop-blur-xl border border-purple-500/50 font-black text-xl transition-all duration-500"
            >
              <MagnifyingGlassIcon className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
              Clear All Filters
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
