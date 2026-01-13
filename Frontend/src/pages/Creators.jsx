import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { BsEnvelope } from "react-icons/bs";
import toast from "react-hot-toast";
import { useAuth } from "../contextAPI/AuthProvider";

export default function Creators() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { writers } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(()=>{
    if(writers.length>0){
      setLoading(false);
    }
  })
// console.log("Writers from context:", writers);
  return (
    <div className="min-h-screen py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-black via-zinc-950/90 to-zinc-900/80 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-emerald-500/8 via-purple-500/8 to-pink-500/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-b from-pink-500/8 to-orange-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-zinc-800/8 to-emerald-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.5s'}} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ✨ Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-4 px-10 py-6 bg-gradient-to-r from-emerald-600/30 via-purple-600/30 to-pink-600/30 backdrop-blur-3xl rounded-4xl border border-emerald-500/40 shadow-2xl shadow-emerald-500/30 mb-12 mx-auto"
          >
            <div className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-purple-400 rounded-full animate-ping" />
            <span className="text-2xl font-black text-white tracking-wider drop-shadow-lg">CREATOR SPOTLIGHT</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-white text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-zinc-100 via-white to-zinc-200 bg-clip-text drop-shadow-2xl mb-8 tracking-[-0.05em] leading-[0.85]"
          >
            Our<span className="text-transparent bg-gradient-to-r from-emerald-400 via-purple-400 to-pink-400 bg-clip-text drop-shadow-2xl block">Creators</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="w-32 h-1 bg-gradient-to-r from-emerald-500 via-purple-500 to-pink-500 mx-auto rounded-full shadow-lg transform scale-x-0 animate-pulse"
            style={{ animationDelay: '0.8s', animationDuration: '1s' }}
          />
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-2xl lg:text-3xl text-zinc-400 max-w-4xl mx-auto leading-relaxed backdrop-blur-xl bg-black/40 px-12 py-8 rounded-4xl border border-zinc-700/50 shadow-2xl"
          >
            Meet the talented creators shaping content from Katihar, Kishanganj and beyond
          </motion.p>
        </motion.div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full mx-auto mb-12 shadow-2xl"
            />
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-black text-zinc-400 mb-4"
            >
              Loading Creators...
            </motion.p>
            <motion.p className="text-xl text-zinc-500 backdrop-blur-sm px-8 py-4 bg-zinc-900/50 rounded-3xl border border-zinc-700/50 inline-block">
              Fetching brilliant minds from our network
            </motion.p>
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32 max-w-2xl mx-auto"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.05, 0.95, 1.05, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-32 h-32 mx-auto mb-12 bg-gradient-to-br from-zinc-900/70 to-black/50 rounded-4xl backdrop-blur-3xl border-4 border-red-500/30 shadow-2xl flex items-center justify-center p-8"
            >
              <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.div>
            <motion.h3 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-black text-zinc-400 mb-8 bg-gradient-to-r from-zinc-500 to-zinc-300 bg-clip-text drop-shadow-xl"
            >
              {error.includes("login") ? "Access Required" : "Connection Error"}
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl text-zinc-500 mb-12 backdrop-blur-sm px-12 py-8 bg-zinc-900/50 rounded-4xl border border-zinc-700/50 max-w-2xl mx-auto leading-relaxed"
            >
              {error.includes("login") 
                ? "Please login to view our amazing creators" 
                : "Failed to load creators. Let's try again."
              }
            </motion.p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()} 
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-purple-600 hover:from-emerald-700 hover:to-purple-700 text-white px-16 py-8 rounded-4xl font-black text-2xl shadow-2xl hover:shadow-emerald-500/50 backdrop-blur-xl border border-emerald-500/50 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/50 to-purple-500/50 blur -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-3">
                🔄 Retry Loading
                <svg className="w-8 h-8 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </span>
            </motion.button>
          </motion.div>
        ) : writers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-40"
          >
            <motion.div
              animate={{ 
                rotate: [0, 15, -15, 15, 0],
                scale: [1, 1.1, 0.9, 1.1, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-36 h-36 mx-auto mb-16 bg-gradient-to-br from-zinc-900/80 to-black/60 rounded-4xl backdrop-blur-3xl border-4 border-emerald-500/30 shadow-2xl flex items-center justify-center p-12 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-purple-500/20 rounded-4xl blur-xl animate-pulse" />
              <svg className="w-20 h-20 text-zinc-500 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.586a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </motion.div>
            <motion.h3 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl font-black text-zinc-500 mb-8 bg-gradient-to-r from-zinc-400 to-zinc-300 bg-clip-text drop-shadow-xl"
            >
              No Creators Yet
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl text-zinc-600 max-w-3xl mx-auto leading-relaxed backdrop-blur-sm px-16 py-12 bg-zinc-900/60 rounded-4xl border border-zinc-700/50 shadow-2xl"
            >
              Our creator network is growing fast. Stay tuned for amazing talent from Bihar and beyond!
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-10 lg:gap-12"
          >
            {writers.map((writer, index) => (
              <motion.div
                key={writer._id}
                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ 
                  y: -20, 
                  scale: 1.05,
                  transition: { duration: 0.4 }
                }}
                className="group relative bg-gradient-to-br from-zinc-900/90 via-black/60 to-zinc-900/90 backdrop-blur-4xl rounded-4xl p-12 shadow-2xl border border-zinc-700/50 hover:border-emerald-500/70 hover:shadow-emerald-500/40 transition-all duration-700 overflow-hidden cursor-default h-full flex flex-col"
              >
                {/* ✨ Gradient Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="absolute top-8 right-8 w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-emerald-500 via-purple-500 to-pink-500 rounded-4xl flex items-center justify-center shadow-2xl shadow-emerald-500/50 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20"
                >
                  <span className="text-white text-2xl lg:text-3xl font-black drop-shadow-lg">★</span>
                </motion.div>
                
                {/* Profile Image with Glow */}
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="relative mx-auto mb-10 w-40 h-40 lg:w-52 lg:h-52 flex-shrink-0"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-emerald-500/20 via-purple-500/20 to-pink-500/20 rounded-4xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 animate-pulse-slow" />
                  <div className="relative z-10 w-full h-full rounded-4xl overflow-hidden ring-8 ring-white/10 shadow-2xl border-4 border-transparent group-hover:border-emerald-400/50 transition-all duration-700">
                    <img
                      src={writer.photo?.url || "/default_blog.png"}
                      alt={writer.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 group-hover:brightness-110"
                      onError={(e) => {
                        e.target.src = "/default_blog.png";
                      }}
                    />
                  </div>
                  {/* Online Status Indicator */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -bottom-2 -right-2 w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-3xl ring-4 ring-white/50 shadow-2xl shadow-emerald-500/50 flex items-center justify-center z-30"
                  >
                    <div className="w-4 h-4 lg:w-5 lg:h-5 bg-white rounded-full animate-ping" />
                  </motion.div>
                </motion.div>

                {/* Name with Gradient */}
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-white text-3xl lg:text-4xl font-black text-center mb-6 bg-gradient-to-r from-zinc-100 via-white to-zinc-200 bg-clip-text drop-shadow-2xl leading-tight tracking-tight group-hover:from-emerald-300 group-hover:to-purple-300 transition-all duration-500"
                >
                  {writer.name}
                </motion.h2>
                
                {/* Role Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600/90 via-purple-600/90 to-pink-600/90 text-white font-black text-xl rounded-4xl backdrop-blur-xl shadow-2xl border border-white/30 mx-auto mb-8 uppercase tracking-wider"
                >
                 {writer.role}
                </motion.div>
                
                {/* Email with Copy Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className="group/email relative bg-zinc-900/70 backdrop-blur-2xl rounded-4xl p-6 border border-zinc-700/50 hover:border-emerald-500/60 hover:shadow-emerald-500/30 transition-all duration-500 mb-8 flex items-center justify-center cursor-pointer"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    navigator.clipboard.writeText(writer.email);
                    toast.success("Email copied!");
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-purple-500/10 blur rounded-4xl opacity-0 group-hover/email:opacity-100 transition-opacity duration-500 -z-10" />
                  <div className="relative z-10 flex items-center gap-4 truncate max-w-full">
                    <BsEnvelope className="w-8 h-8 text-zinc-400 group-hover/email:text-emerald-400 transition-colors flex-shrink-0" />
                    <span className="text-xl font-mono text-zinc-300 truncate font-semibold">{writer.email}</span>
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center ml-2 opacity-0 group-hover/email:opacity-100 transition-all duration-300 flex-shrink-0"
                    >
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Creator Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 gap-6 mt-auto pt-8 border-t border-zinc-700/50"
                >
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="group relative text-center p-6 bg-gradient-to-br from-zinc-900/70 to-black/40 rounded-3xl backdrop-blur-xl border border-zinc-700/50 hover:border-purple-500/60 hover:shadow-purple-500/30 transition-all duration-500 cursor-default"
                  >
                    <div className="text-4xl font-black text-emerald-400 mb-2 group-hover:text-emerald-300">127</div>
                    <div className="text-lg font-black text-zinc-400 uppercase tracking-wider">Posts</div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="group relative text-center p-6 bg-gradient-to-br from-zinc-900/70 to-black/40 rounded-3xl backdrop-blur-xl border border-zinc-700/50 hover:border-orange-500/60 hover:shadow-orange-500/30 transition-all duration-500 cursor-default"
                  >
                    <div className="text-4xl font-black text-orange-400 mb-2 group-hover:text-orange-300">2.8K</div>
                    <div className="text-lg font-black text-zinc-400 uppercase tracking-wider">Readers</div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

    </div>
  );
}
