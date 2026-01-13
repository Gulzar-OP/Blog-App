import React from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeftIcon, 
  LifebuoyIcon,
  HomeIcon 
} from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-12 bg-gradient-to-br from-black via-zinc-950/90 to-zinc-900/80 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-indigo-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-b from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-zinc-800/5 to-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        
        {/* Error Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-grid-error" />
        </div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotateX: 90 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="mb-8"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, -2, 2, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="inline-flex items-center"
          >
            <div className="text-[12rem] md:text-[18rem] lg:text-[24rem] font-black bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-2xl leading-none tracking-[-0.1em] relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-pink-400/30 blur-xl -inset-4 rounded-full opacity-75 animate-pulse" />
              404
            </div>
          </motion.div>

          {/* Animated Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="h-1 w-24 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"
          />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-zinc-200 via-white to-zinc-300 bg-clip-text drop-shadow-2xl mb-6 tracking-tight"
        >
          Page Not Found
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed backdrop-blur-sm px-8 py-6 bg-black/40 rounded-3xl border border-zinc-800/50"
        >
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </motion.p>

        {/* Animated Error Robot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-16 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/50 to-black/30 rounded-3xl backdrop-blur-2xl border-4 border-purple-500/20 shadow-2xl shadow-purple-500/10 animate-float-slow" />
          <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mb-4 shadow-2xl shadow-purple-500/30">
              <svg className="w-12 h-12 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full shadow-xl mb-4 animate-bounce-slow" />
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}} />
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center gap-6 justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600/90 via-pink-600/90 to-indigo-600/90 text-white font-black text-xl rounded-3xl shadow-2xl shadow-purple-500/40 hover:shadow-purple-500/60 backdrop-blur-xl border border-purple-500/50 transition-all duration-500 overflow-hidden hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 to-pink-500/50 -inset-1 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              <HomeIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              <span>Return Home</span>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-black/60 backdrop-blur-2xl border-2 border-zinc-700/70 hover:border-purple-500/60 text-zinc-300 hover:text-purple-300 font-semibold text-xl rounded-3xl shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 -inset-2 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-3xl" />
              <LifebuoyIcon className="w-6 h-6 group-hover:rotate-12 transition-transform duration-500" />
              <span>Contact Support</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Additional Info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-zinc-500 text-sm mt-12 backdrop-blur-sm px-6 py-4 bg-zinc-900/50 rounded-2xl border border-zinc-800/50 font-mono tracking-wider"
        >
          Error 404 | Page not found in the digital universe 🚀
        </motion.p>
      </div>


    </div>
  );
}
