import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "../Home/Hero";
import Trending from "../Home/Trending";
import Creators from "../Home/Creators";
import Code from "../Home/Code";
import Loader from "../components/Loader";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showHero, setShowHero] = useState(false);
  const [showSections, setShowSections] = useState(false);

  useEffect(() => {
    // Staggered loading sequence
    const timer1 = setTimeout(() => {
      setLoading(false);
    }, 1500);

    const timer2 = setTimeout(() => {
      setShowHero(true);
    }, 1800);

    const timer3 = setTimeout(() => {
      setShowSections(true);
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black/95 to-zinc-900 overflow-hidden relative">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-10 w-64 h-64 bg-gradient-to-r from-emerald-400/3 to-cyan-400/3 rounded-full blur-2xl animate-pulse delay-500" />
        <div className="absolute bottom-1/2 right-20 w-72 h-72 bg-gradient-to-b from-orange-500/3 to-red-500/3 rounded-full blur-3xl animate-pulse delay-1500" />
      </div>

      {/* Enhanced Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-zinc-950 to-black"
          >
            <Loader />
            {/* Progress Ring */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute w-32 h-32 border-4 border-zinc-800/50 border-t-gradient-to-r border-t-from-cyan-400 border-t-to-purple-500 rounded-full animate-spin"
            />
            {/* Floating Logo */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-center absolute bottom-20"
            >
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-zinc-600 to-zinc-400 bg-clip-text text-transparent text-4xl font-black tracking-tight mb-4">
                Blog<span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl">Sphere</span>
              </div>
              <div className="text-xl text-zinc-500 font-mono tracking-wider">
                Please wait, blogs loading…
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-40 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 shadow-lg origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: showSections ? 1 : 0 }}
        transition={{ duration: 2, delay: 2.5 }}
      />

      {/* Main Content */}
      <div className="relative z-10 pt-0">
        {/* Hero Section */}
        <AnimatePresence>
          {showHero && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
            >
              <Hero />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Sections */}
        <AnimatePresence>
          {showSections && (
            <>
              <motion.div
                key="trending"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Trending />
              </motion.div>
              
              
              
              <motion.div
                key="code"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <Code />
              </motion.div>
              
              <motion.div
                key="creators"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <Creators />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

     
    </div>
  );
}
