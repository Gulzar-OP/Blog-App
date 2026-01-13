import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
// const API_URL="http://blog-app-back-nine.vercel.app"
const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_URL}/api/blogs/all-blogs`);
        setBlogs(data.blogs);
      } catch (error) {
        console.log("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-20 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl mb-6 shadow-xl">
          <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
          <span className="font-semibold">Fresh Posts</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 bg-clip-text text-transparent">
          Latest <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">Blogs</span>
        </h1>
      </motion.div>

      {blogs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-3xl flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332-.477-4.5-1.253" />
            </svg>
          </div>
          <p className="text-2xl font-semibold text-gray-600 mb-2">No blogs yet</p>
          <p className="text-gray-500">Check back soon for fresh content!</p>
        </motion.div>
      ) : (
        <div className=" max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <Link
                to={`/blog/${blog._id}`}      //frontend rouute
                className="block bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl hover:bg-white transition-all duration-500 border border-gray-100 hover:border-blue-200 overflow-hidden h-full"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  <div className="relative h-60">
                    <img
                      src={blog?.blogImage?.url || "/default_blog.png"}
                      alt={blog.about}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      loading="lazy"
                    />
                    {/* Dynamic Gradient Overlay */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-t ${
                        hoveredId === blog._id 
                          ? 'from-black/80 via-black/20 to-transparent' 
                          : 'from-black/50 via-black/10 to-transparent'
                      } transition-all duration-500`}
                    />
                    
                    {/* Category Badge */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-2xl border border-white/50 font-bold text-sm text-gray-900"
                    >
                      {blog.category}
                    </motion.div>

                    {/* Date Badge */}
                    <motion.div
                      initial={{ scale: 0, rotate: 180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 10 }}
                      className="absolute top-4 right-4 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-xl shadow-2xl font-semibold text-xs"
                    >
                      {formatDate(blog.createdAt).split(',')[0]}
                    </motion.div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8">
                    {/* Author Avatar */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <img
                          src={blog.adminPhoto}
                          alt="Author"
                          className="w-14 h-14 rounded-2xl object-cover border-4 border-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 shadow-xl ring-4 ring-white/50 hover:ring-blue-200 transition-all duration-300"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-3 border-white rounded-full flex items-center justify-center shadow-lg">
                          <div className="w-1 h-1 bg-white rounded-full animate-ping"></div>
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {blog.about}
                        </p>
                        <p className="text-xs text-gray-500 font-medium mt-1">
                          {formatDate(blog.createdAt).split(',')[1]}
                        </p>
                      </div>
                    </div>

                    {/* Read Time & Stats */}
                    <div className="flex items-center justify-between mb-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
                          </svg>
                          <span>5 min read</span>
                        </div>
                      </div>
                      <div className="w-px h-5 bg-gray-300"></div>
                      <div className="text-xs text-gray-400 font-medium">New</div>
                    </div>

                    {/* Hover Action Button */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="opacity-80 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 mt-4"
                    >
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm font-semibold text-blue-600 hover:text-blue-700">Read Story</span>
                      <svg className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>
                </div>

                {/* Hover State Overlay */}
                <motion.div
                  initial={false}
                  animate={{ opacity: hoveredId === blog._id ? 1 : 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-blue-600/95 to-transparent z-30 flex items-end p-8 pointer-events-none"
                  onHoverStart={() => setHoveredId(blog._id)}
                  onHoverEnd={() => setHoveredId(null)}
                >
                  <div className="text-white w-full">
                    <h3 className="text-2xl font-black mb-2 drop-shadow-2xl">{blog.about}</h3>
                    <p className="text-blue-100 font-semibold drop-shadow-lg">Tap to dive in →</p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
