import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function About() {
  const [stats, setStats] = useState({
    visitors: 0,
    blogs: 0,
    creators: 0,
    years: 0
  });

  const statsData = [
    { number: 5000, label: "Monthly Visitors", key: "visitors" },
    { number: 250, label: "Blogs Published", key: "blogs" },
    { number: 20, label: "Active Creators", key: "creators" },
    { number: 3, label: "Years Building", key: "years" },
  ];

  useEffect(() => {
    const counters = statsData.map(stat => ({
      ...stat,
      timer: setInterval(() => {
        setStats(prev => ({
          ...prev,
          [stat.key]: prev[stat.key] < stat.number 
            ? prev[stat.key] + Math.ceil(stat.number / 50)
            : stat.number
        }));
      }, 20)
    }));

    return () => counters.forEach(({ timer }) => clearInterval(timer));
  }, []);

  const teamMembers = [
    {
      name: "Gulzar Hussain",
      role: "Founder & Full-Stack Developer",
      img: "default_blog.png",
      social: { github: "#", linkedin: "#" }
    },
    {
      name: "Aisha Khan", 
      role: "UI/UX Designer",
      img: "default_blog.png",
      social: { dribbble: "#", behance: "#" }
    },
    {
      name: "Ravi Sharma",
      role: "Content Strategist",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      social: { twitter: "#", linkedin: "#" }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950/90 to-zinc-900/80 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-r from-purple-500/8 via-emerald-500/8 to-pink-500/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-b from-pink-500/8 to-orange-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-3/4 left-1/4 w-72 h-72 bg-gradient-to-r from-emerald-500/6 to-purple-500/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.5s'}} />
      </div>

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="min-h-[80vh] flex items-center justify-center text-center px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-6xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
            className="inline-flex items-center gap-4 px-10 py-6 bg-gradient-to-r from-purple-600/30 via-emerald-600/30 to-pink-600/30 backdrop-blur-3xl rounded-4xl border border-white/20 shadow-2xl shadow-purple-500/30 mb-12 mx-auto"
          >
            <div className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-purple-400 rounded-full animate-ping" />
            <span className="text-2xl font-black text-white tracking-widest drop-shadow-lg">OUR STORY</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-6xl text-white md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-zinc-100 via-white to-zinc-200 bg-clip-text drop-shadow-2xl mb-8 leading-[0.85] tracking-[-0.05em]"
          >
            About<span className="block text-transparent bg-gradient-to-r from-purple-400 via-emerald-400 to-pink-400 bg-clip-text drop-shadow-2xl">GulBlog</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-2xl md:text-3xl text-zinc-300 max-w-4xl mx-auto leading-relaxed backdrop-blur-xl bg-black/40 px-12 py-10 rounded-4xl border border-zinc-700/50 shadow-2xl"
          >
            Building India's premier blogging platform where creators thrive, ideas flourish, 
            and stories connect millions. Crafted with ❤️ from Narnaund, Haryana.
          </motion.p>
        </motion.div>
      </section>

      {/* ---------------- STATS SECTION ---------------- */}
      <section className="py-32 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center"
          >
            {statsData.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, scale: 0.8, y: 60 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                className="group relative p-12 lg:p-16 bg-gradient-to-br from-zinc-900/80 via-black/50 to-zinc-900/80 backdrop-blur-3xl rounded-4xl border border-zinc-700/50 shadow-2xl hover:shadow-purple-500/40 hover:border-purple-500/70 transition-all duration-700 overflow-hidden cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-emerald-500/20 -inset-2 blur opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse-slow" />
                <div className="relative z-10">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="text-5xl lg:text-6xl xl:text-7xl font-black text-transparent bg-gradient-to-r from-purple-400 via-emerald-400 to-pink-400 bg-clip-text drop-shadow-2xl mb-6 leading-none tracking-tight"
                  >
                    {stats[item.key].toLocaleString()}
                    <span className="text-3xl lg:text-4xl xl:text-5xl">{'+'}</span>
                  </motion.div>
                  <p className="text-xl lg:text-2xl font-black text-zinc-300 tracking-wider uppercase mb-8 group-hover:text-white transition-colors">{item.label}</p>
                  <div className="w-28 h-1 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-lg transform group-hover:scale-110" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------- MISSION SECTION ---------------- */}
      <section className="py-32 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring" }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600/30 via-emerald-600/30 to-pink-600/30 backdrop-blur-3xl rounded-4xl border border-purple-500/40 text-xl font-black text-white shadow-2xl mb-12"
            >
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-purple-400 rounded-full animate-ping" />
              Our Mission
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-6xl lg:text-7xl xl:text-8xl font-black bg-gradient-to-r from-zinc-100 via-white to-zinc-200 bg-clip-text drop-shadow-2xl mb-12 leading-[0.9] tracking-[-0.03em]"
            >
              Ideas become<span className="block text-transparent bg-gradient-to-r from-purple-400 via-emerald-400 to-pink-400 bg-clip-text drop-shadow-2xl">stories</span>.<br/>
              Stories<span className="text-transparent bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text drop-shadow-2xl">inspire</span> people.
            </motion.h2>
            <div className="space-y-8 text-xl lg:text-2xl text-zinc-300 leading-relaxed backdrop-blur-xl bg-black/40 p-12 lg:p-16 rounded-4xl border border-zinc-700/50 shadow-2xl">
              <p>
                We craft a powerful blogging platform with pixel-perfect simplicity, 
                buttery-smooth UI, and creator-first experience from Narnaund, Haryana.
              </p>
              <p>
                Every keystroke feels magical. Every publish feels epic. 
                Performance, accessibility, and scalability are our non-negotiables.
              </p>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, type: "spring" }}
              className="mt-16 flex gap-4"
            >
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-purple-400 rounded-full shadow-lg"
              />
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg"
              />
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                className="w-4 h-4 bg-gradient-to-r from-pink-400 to-emerald-400 rounded-full shadow-lg"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative order-first lg:order-last"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative w-full h-[600px] rounded-4xl overflow-hidden shadow-2xl bg-gradient-to-br from-zinc-900/50 to-black/30 backdrop-blur-3xl border border-white/20"
            >
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                className="w-full h-full object-cover rounded-4xl hover:scale-105 transition-transform duration-1000 absolute inset-0"
                alt="Mission"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent backdrop-blur-sm rounded-4xl" />
              <div className="absolute bottom-12 left-12 right-12">
                <motion.h3 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl lg:text-5xl font-black text-white mb-4 drop-shadow-2xl leading-tight"
                >
                  Creator-First Platform
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl text-emerald-100 drop-shadow-xl"
                >
                  Built for writers who dream<span className="block text-purple-200">big</span>
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- TEAM SECTION ---------------- */}
      <section className="py-32 px-6 bg-gradient-to-b from-zinc-950/50 to-black/30 max-w-7xl mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-3 px-10 py-6 bg-gradient-to-r from-emerald-600/30 via-purple-600/30 to-pink-600/30 backdrop-blur-3xl rounded-4xl border border-emerald-500/40 text-2xl font-black text-white shadow-2xl shadow-emerald-500/30 mb-12"
          >
            <div className="w-4 h-4 bg-gradient-to-r from-white to-emerald-300 rounded-full animate-ping" />
            Core Team
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-6xl lg:text-8xl font-black bg-gradient-to-r from-zinc-100 via-white to-zinc-200 bg-clip-text drop-shadow-2xl tracking-tight leading-[0.85]"
          >
            People behind the<span className="text-transparent bg-gradient-to-r from-emerald-400 via-purple-400 to-pink-400 bg-clip-text drop-shadow-2xl block">magic</span>
          </motion.h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              whileHover={{ 
                y: -25, 
                scale: 1.05,
                transition: { duration: 0.4 }
              }}
              className="group relative bg-gradient-to-br from-zinc-900/90 via-black/60 to-zinc-900/90 backdrop-blur-4xl rounded-4xl p-12 shadow-2xl border border-zinc-700/50 hover:border-emerald-500/70 hover:shadow-emerald-500/40 transition-all duration-700 overflow-hidden cursor-default"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-purple-500/10 to-pink-500/10 -translate-y-full group-hover:translate-y-0 transition-transform duration-1000" />
              
              <div className="relative z-20">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-36 h-36 lg:w-44 lg:h-44 mx-auto mb-12 relative overflow-hidden rounded-4xl ring-8 ring-white/10 shadow-2xl"
                >
                  <motion.img
                    src={member.img || "default_blog.png"}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-4xl group-hover:scale-110 transition-transform duration-700"
                    whileHover={{ scale: 1.15 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 rounded-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm" />
                </motion.div>
                
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ color: "#10b981" }}
                  className="text-3xl lg:text-4xl font-black text-center text-zinc-100 mb-6 drop-shadow-2xl group-hover:text-emerald-300 transition-all duration-500 leading-tight tracking-tight"
                >
                  {member.name}
                </motion.h3>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-xl lg:text-2xl text-zinc-300 text-center mb-12 font-black opacity-90 leading-relaxed px-4"
                >
                  {member.role}
                </motion.p>
                
                <motion.div 
                  className="flex justify-center space-x-6 opacity-0 group-hover:opacity-100 transition-all duration-700"
                  initial={{ y: 20 }}
                  whileHover={{ y: 0 }}
                >
                  {Object.entries(member.social).map(([platform, link]) => (
                    <motion.a
                      key={platform}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ 
                        scale: 1.3, 
                        y: -4,
                        rotate: [0, -15, 15, 0]
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="group/social w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-emerald-600 via-purple-600 to-pink-600 rounded-4xl flex items-center justify-center shadow-2xl hover:shadow-emerald-500/50 border border-white/20 backdrop-blur-xl transition-all duration-500 overflow-hidden relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -rotate-45 -translate-x-1/2 -translate-y-1/2 group-hover/social:translate-x-0 group-hover/social:translate-y-0 transition-all duration-500 -z-10" />
                      <span className="sr-only capitalize">{platform}</span>
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------- CONTACT CTA ---------------- */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/95 via-purple-600/95 to-pink-600/95" />
        <div className="relative max-w-5xl mx-auto text-center px-6 z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-4 px-12 py-6 bg-white/20 backdrop-blur-3xl rounded-4xl border border-white/40 mb-16 shadow-2xl shadow-white/20"
            >
              <div className="w-4 h-4 bg-white rounded-full animate-ping" />
              <span className="text-2xl font-black text-white drop-shadow-lg">Join 5K+ Creators Today</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-12 leading-[0.85] drop-shadow-2xl tracking-tight"
            >
              Ready to<span className="text-transparent bg-gradient-to-r from-emerald-300 via-yellow-300 to-orange-300 bg-clip-text drop-shadow-2xl block">create</span>together?
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-2xl lg:text-3xl text-white/90 mb-16 max-w-4xl mx-auto leading-relaxed drop-shadow-xl px-8 py-8 bg-white/10 backdrop-blur-xl rounded-4xl border border-white/30"
            >
              Open to creators, developers, writers, and designers from Narnaund & beyond who want to build something extraordinary.
            </motion.p>
            
            <motion.a
              href="/contact"
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                boxShadow: "0 0 60px rgba(255,255,255,0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
              className="group relative inline-flex items-center px-16 py-8 lg:px-20 lg:py-10 bg-white text-gradient-to-r from-emerald-700 via-purple-700 to-pink-700 font-black text-2xl lg:text-3xl rounded-4xl shadow-2xl backdrop-blur-xl border border-white/30 transition-all duration-700 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-4">
                Start Collaboration
                <svg className="w-8 h-8 group-hover:translate-x-4 transition-transform duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/90 via-purple-400/90 to-pink-400/90 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 blur-sm" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
