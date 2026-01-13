import React from "react";
import { useAuth } from "../contextAPI/AuthProvider";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Games() {
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

  // ✅ Filter only Game blogs
  const gameBlogs = blogs?.filter((blog) => 
    blog.category?.toLowerCase() === "game" || 
    blog.category?.toLowerCase() === "games"
  ) || [];

  return (
    <div className="min-h-screen py-20 px-4 md:px-8 lg:px-16 ">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-emerald-400/10 via-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Hero Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-xl rounded-3xl border border-yellow-400/40 mb-8">
            <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-ping" />
            <span className="text-lg font-bold text-yellow-300 tracking-wider uppercase">Gaming Zone</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-2xl mb-6 leading-tight">
            Games
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto leading-relaxed backdrop-blur-sm px-8 py-6 bg-black/40 rounded-3xl border border-zinc-700/50 shadow-2xl">
            Game is life, and life is a game. Level up your gaming knowledge! 🎮
          </p>
        </motion.div>

        {/* Blogs Grid */}
        {!gameBlogs || gameBlogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32"
          >
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-zinc-800 to-black/50 rounded-3xl flex items-center justify-center backdrop-blur-xl border-4 border-yellow-500/20 shadow-2xl">
              <svg className="w-20 h-20 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L3 15.428m8.016-7.428l4.298 4.3m0 0L14.537 20l1.047-.616a2 2 0 011.587-.653l3.238-.614a2 2 0 011.587-.653l.653-.653a2 2 0 00.653-1.587L21.537 9z" />
              </svg>
            </div>
            <h3 className="text-4xl font-black text-zinc-400 mb-4 bg-gradient-to-r from-zinc-500 to-zinc-400 bg-clip-text">
              No Game Blogs Yet
            </h3>
            <p className="text-xl text-zinc-500 max-w-md mx-auto leading-relaxed">
              Be the first to discover gaming adventures. Check back soon!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-8">
            {gameBlogs.slice(0, 8).map((element, index) => (
              <motion.div
                key={element._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <Link
                  to={`/blog/${element._id}`}
                  className="group relative block h-full bg-gradient-to-br from-white/90 via-white/80 to-zinc-100/90 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl hover:shadow-yellow-500/30 border border-white/60 hover:border-yellow-300/50 overflow-hidden transform transition-all duration-700 ease-out hover:shadow-2xl"
                >
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  {/* Ranking Badge */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-2xl border-4 border-white/50 flex items-center justify-center z-20 backdrop-blur-xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <span className="text-2xl font-black text-white drop-shadow-lg">
                      #{1 + index}
                    </span>
                  </motion.div>

                  {/* Image Section */}
                  <div className="relative mb-8 overflow-hidden rounded-2xl h-56">
                    <img
                      src={element?.blogImage?.url || "/api/placeholder/400/300"}
                      alt={element.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 rounded-2xl shadow-xl"
                      // onError={(e) => {
                      //   e.target.src = "/api/placeholder/400/300?text=No+Image";
                      // }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Category Badge */}
                    <span className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500/90 to-orange-500/90 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm border border-yellow-400/50">
                      🎮 GAME
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-black text-gray-900 mb-6 leading-tight line-clamp-2 group-hover:text-yellow-600 transition-all duration-500 drop-shadow-lg">
                      {element.title}
                    </h3>

                    <div className="flex items-center space-x-4 mb-8 opacity-90 group-hover:opacity-100 transition-all duration-500">
                      <div className="w-14 h-14 bg-gradient-to-br from-yellow-400/90 to-orange-500/90 rounded-2xl p-1 shadow-2xl">
                        <img
                          src={element.writerPhoto || "/api/placeholder/56/56"}
                          alt={element.writerName}
                          className="w-full h-full rounded-xl object-cover shadow-lg border-2 border-white/50"
                          // onError={(e) => {
                          //   e.target.src = `/api/placeholder/56/56?text=${element.adminName?.charAt(0) || 'A'}`;
                          // }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-bold text-gray-900 truncate group-hover:text-yellow-700">
                          {element.writerName || "Anonymous"}
                        </p>
                        <p className="text-sm text-zinc-600 font-medium">
                          {formatDate(element.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* Read More CTA */}
                    <div className="flex items-center group-hover:gap-3 transition-all duration-500 opacity-90 group-hover:opacity-100">
                      <span className="text-lg font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent drop-shadow-lg">
                        Read Full Story
                      </span>
                      <motion.div
                        className="flex items-center"
                        initial={{ x: 0 }}
                        whileHover={{ x: 8 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <svg className="w-6 h-6 text-yellow-600 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Show More Button (if more blogs) */}
        {gameBlogs.length > 8 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-16"
          >
            <Link
              to="/blog?category=game"
              className="group inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-yellow-500/50 backdrop-blur-xl border border-yellow-400/50 transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]"
            >
              <span>Load More Games</span>
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
