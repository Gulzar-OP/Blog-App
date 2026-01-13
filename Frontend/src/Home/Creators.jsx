import React, { useEffect, useState } from 'react';
import { useAuth } from '../contextAPI/AuthProvider'
import { motion } from "framer-motion";
import { UserIcon, CodeBracketIcon, AcademicCapIcon } from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom';

export default function Creators() {
  const [loading, setLoading] = useState(true);
  const [writersData, setWritersData] = useState([]);
  const { writers } = useAuth();

  useEffect(() => {
    if (writers && Array.isArray(writers) && writers.length > 0) {
      setWritersData(writers);
      setLoading(false);
      console.log("Writers from context:", writers);
    } else {
      setLoading(false);
    }
  }, [writers]);

  const getRoleIcon = (role) => {
    switch (role?.toLowerCase()) {
      case 'writer': return <CodeBracketIcon className="w-8 h-8 text-emerald-400" />;
      case 'reader': return <UserIcon className="w-8 h-8 text-cyan-400" />;
      case 'student': return <AcademicCapIcon className="w-8 h-8 text-purple-400" />;
      default: return <UserIcon className="w-8 h-8 text-zinc-400" />;
    }
  };

  const getEducationIcon = (education) => {
    const icons = {
      'BCA': '🎓', 'BTech': '🚀', 'MCA': '💻', 
      'MTech': '🔬', 'BSc CS': '📊', 'Other': '✨'
    };
    return icons[education] || '👤';
  };

  return (
    <div className="min-h-screen py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-zinc-950 via-black/90 to-zinc-900 relative overflow-hidden">
      {/* Background Decorations */}
      {/* <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-emerald-500/3 to-cyan-500/3 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-b from-purple-500/3 to-pink-500/3 rounded-full blur-3xl animate-pulse delay-1000" />
      </div> */}

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Hero Section */}
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
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-purple-500/20 backdrop-blur-xl rounded-full border border-emerald-400/30 font-mono text-lg tracking-widest text-emerald-300 shadow-2xl mb-8"
          >
             Top Creators
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-zinc-100 via-emerald-100 to-cyan-200 bg-clip-text text-transparent drop-shadow-2xl leading-tight"
          >
            Masterminds
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mt-8"
          >
            Meet the brilliant creators behind your favorite Programming & Technology content
          </motion.p>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { delay: i * 0.1 }
                }}
                className="group relative bg-zinc-900/60 backdrop-blur-xl border border-zinc-700/50 rounded-4xl p-8 shadow-2xl animate-pulse hover:shadow-emerald-500/20 transition-all duration-500"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-3xl" />
                <div className="h-8 bg-zinc-800/50 rounded-2xl mx-auto mb-3 w-3/4" />
                <div className="h-6 bg-zinc-800/30 rounded-xl mx-auto w-1/2" />
                <div className="h-4 bg-zinc-800/20 rounded-full mx-auto w-1/3 mt-4" />
              </motion.div>
            ))}
          </motion.div>
        ) : writersData.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center py-32"
          >
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-3xl backdrop-blur-xl border-2 border-zinc-700/50 flex items-center justify-center shadow-2xl">
              <span className="text-4xl">👥</span>
            </div>
            <h3 className="text-4xl font-black text-zinc-400 mb-6">No Creators Yet</h3>
            <p className="text-xl text-zinc-500 max-w-lg mx-auto">
              The creative community is growing. Stay tuned for amazing creators!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-8">
            {writersData.map((user, index) => (
              <Link 
                key={user._id}
                to={`/creators/${user._id}`}
                className="block h-full"
              >
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  whileHover={{ 
                    y: -15, 
                    scale: 1.05, 
                    shadow: "0 35px 60px rgba(6, 182, 212, 0.4)",
                    transition: { duration: 0.4 }
                  }}
                  className="group relative bg-zinc-900/80 backdrop-blur-3xl border border-zinc-700/50 rounded-4xl p-8 shadow-2xl hover:shadow-3xl hover:shadow-emerald-500/25 hover:border-emerald-400/50 transition-all duration-500 overflow-hidden h-full"
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/5 to-cyan-500/0 group-hover:from-emerald-500/20 group-hover:to-cyan-500/20 transition-all duration-500 -z-10" />
                  
                  {/* Profile Image */}
                  <motion.div
                    whileHover={{ rotate: [0, 5, -5, 0], scale: 1.1 }}
                    className="relative mx-auto mb-6 w-28 h-28"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-3xl backdrop-blur-xl -z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-500" />
                    <img 
                      src={user.photo?.url || 'https://via.placeholder.com/112x112/1a1a1a/6b7280?text=👤'} 
                      alt={user.name}
                      className="w-full h-full rounded-3xl object-cover border-4 border-white/20 shadow-2xl group-hover:border-emerald-400/60 transition-all duration-500"
                    />
                    {/* Status Ring */}
                    <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-purple-500/20 blur opacity-75 animate-spin-slow" />
                  </motion.div>

                  {/* Name */}
                  <motion.h3 
                    initial={{ y: 20 }}
                    whileHover={{ y: -8 }}
                    className="text-2xl font-black text-zinc-100 text-center mb-6 bg-gradient-to-r from-zinc-100 to-zinc-200 bg-clip-text group-hover:from-emerald-400 group-hover:to-cyan-400 transition-all duration-500 leading-tight"
                  >
                    {user.name}
                  </motion.h3>

                  {/* Role Icon */}
                  <div className="flex justify-center mb-6">
                    {getRoleIcon(user.role)}
                  </div>

                  {/* Education */}
                  {user.education && (
                    <motion.div
                      whileHover={{ opacity: 1 }}
                      className="flex items-center justify-center gap-2 mb-6 p-2 bg-gradient-to-r from-zinc-800/30 to-zinc-900/30 backdrop-blur-sm rounded-xl mx-6 border border-zinc-700/50"
                    >
                      <span className="text-lg">{getEducationIcon(user.education)}</span>
                      <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                        {user.education}
                      </span>
                    </motion.div>
                  )}

                  {/* Stats */}
                  <motion.div 
                    className="flex items-center justify-between mx-6 pt-6 border-t border-zinc-700/50"
                  >
                    <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono bg-zinc-800/50 px-3 py-1.5 rounded-xl backdrop-blur-sm border border-zinc-700/50">
                      <span>⭐</span>
                      <span>{user.rating || '12.4k'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-zinc-500 font-mono bg-zinc-800/50 px-3 py-1.5 rounded-xl backdrop-blur-sm border border-zinc-700/50">
                      <span>📝</span>
                      <span>{user.posts?.length || 47}</span>
                    </div>
                  </motion.div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
