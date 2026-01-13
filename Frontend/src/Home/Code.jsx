import React from 'react';
import { useAuth } from '../contextAPI/AuthProvider';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Code() {
  const { blogs } = useAuth();

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

  // Filter Programming & Technology blogs
  const codeBlogs = blogs?.filter(blog => blog.category === "coding" || blog.category === "technology" || blog.category === "programming");

  return (
    <div className="min-h-screen py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-zinc-950 to-black/90 relative overflow-hidden">
      {/* Background Decorations */}
      {/* <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl -translate-x-1/2 animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-gradient-to-b from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div> */}

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Enhanced Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-full border border-cyan-400/30 font-mono text-sm tracking-widest text-cyan-300 shadow-2xl mb-6"
          >
            💻 Programming & Technology
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-zinc-100 via-white to-zinc-200 bg-clip-text text-transparent drop-shadow-2xl leading-tight"
          >
            Code Universe
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mt-6"
          >
            Explore cutting-edge programming tutorials, tech insights, and developer stories
          </motion.p>
        </motion.div>

        {/* No Blogs State */}
        {!codeBlogs || codeBlogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center py-32"
          >
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-3xl backdrop-blur-xl border-2 border-zinc-700/50 flex items-center justify-center shadow-2xl">
              <span className="text-4xl">💻</span>
            </div>
            <h3 className="text-3xl font-bold text-zinc-400 mb-4">No Code Blogs Yet</h3>
            <p className="text-xl text-zinc-500 max-w-md mx-auto">
              Be the first to share your programming journey. Amazing content coming soon!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-8 ">
            {codeBlogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={`/blog/${blog._id}`}
                  className=" group relative backdrop-blur-xl shadow-2xl hover:shadow-3xl hover:shadow-cyan-500/20 hover:-translate-y-3 transition-all duration-500 overflow-hidden "
                >
                  {/* Animated Background Gradient */}
                  {/* <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/10 to-blue-500/0 group-hover:bg-gradient-to-br group-hover:from-cyan-500/20 group-hover:to-blue-500/20 transition-all duration-500 -z-10" /> */}
                  
                  {/* Image Container */}
                  {blog.blogImage?.url ? (
                    <div className="relative mb-6 overflow-hidden rounded-3xl h-64">
                      <img
                        src={blog.blogImage.url}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Dynamic Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Category Badge */}
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        className="absolute top-6 left-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-2xl font-mono text-sm font-semibold shadow-2xl backdrop-blur-sm border border-white/20"
                      >
                        {blog.category}
                      </motion.span>
                    </div>
                  ) : (
                    <div className="w-full h-64 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-3xl mb-6 flex items-center justify-center">
                      <span className="text-4xl opacity-50">💻</span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative">
                    <motion.h3 
                      initial={{y: 20 }}
                      whileHover={{ y: -5 }}
                      className="text-2xl font-bold text-zinc-100 mb-4 leading-tight line-clamp-2 group-hover:text-white transition-colors duration-300"
                    >
                      {blog.title}
                    </motion.h3>

                    {/* Tech Stack Preview (if available) */}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {blog.tags.slice(0, 3).map((tag, i) => (
                          <motion.span
                            key={i}
                            initial={{ scale: 0.8 }}
                            whileHover={{ scale: 1.05 }}
                            className="px-3 py-1 bg-zinc-800/50 backdrop-blur-sm text-xs font-mono text-cyan-300 rounded-full border border-cyan-500/30 hover:bg-cyan-500/20 transition-all duration-300"
                          >
                            #{tag}
                          </motion.span>
                        ))}
                      </div>
                    )}

                    {/* Author Card */}
                    <motion.div 
                      className="flex items-center gap-4 pt-4 border-t border-zinc-700/50"
                      
                    >
                      {blog.writerPhoto ? (
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="w-14 h-14 rounded-2xl overflow-hidden border-4 border-gradient-to-r border-from-cyan-400 border-to-blue-500 shadow-2xl flex-shrink-0"
                        >
                          <img
                            src={blog.writerPhoto}
                            alt={blog.writerName}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      ) : (
                        <div className="w-14 h-14 bg-gradient-to-r from-zinc-700 to-zinc-600 rounded-2xl flex items-center justify-center text-xl font-bold text-zinc-400 flex-shrink-0">
                          {blog.writerName?.charAt(0)?.toUpperCase()}
                        </div>
                      )}
                      
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-zinc-200 text-lg truncate group-hover:text-white transition-colors">
                          {blog.writerName}
                        </p>
                        <p className="text-sm text-zinc-500 font-mono">
                          {formatDate(blog.createdAt)}
                        </p>
                      </div>

                      {/* Read Time / Views */}
                      <div
                        className="flex items-center gap-1 text-xs text-zinc-500 font-mono bg-zinc-800/50 px-3 py-1 rounded-xl backdrop-blur-sm border border-zinc-700/50"
                      >
                        <span>⭐</span>
                        <span>{Math.floor(Math.random() * 100) + 50}k</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Hover Arrow */}
                  <motion.div
                    initial={{ x: 10, opacity: 0 }}
                    whileHover={{ x: 15, opacity: 1 }}
                    className="absolute top-6 right-6 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl"
                  >
                    →
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
