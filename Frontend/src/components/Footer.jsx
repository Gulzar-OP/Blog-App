import React from "react";
import { motion } from "framer-motion";
import { 
  FaInstagram, 
  FaLinkedin, 
  FaGithub, 
  FaEnvelope, 
  FaRss 
} from "react-icons/fa";
import { 
  ChevronDownIcon 
} from "@heroicons/react/24/outline";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-black pt-24 pb-12 px-6 md:px-12 lg:px-24 border-t-4 border-gradient-to-r from-purple-500/30 to-pink-500/30">
      

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.03, 1],
                rotate: [0, 0.5, -0.5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="inline-flex items-center gap-3 mb-6"
            >
             
              <div>
                <h2 className="text-white text-3xl lg:text-4xl font-black bg-gradient-to-r from-zinc-200 via-white to-zinc-300 bg-clip-text drop-shadow-2xl">
                  Gul<span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-600 bg-clip-text drop-shadow-2xl text-blue-500">Blog</span>
                </h2>
                <p className="text-zinc-700 text-xl mt-3 leading-relaxed max-w-md backdrop-blur-sm">
                  Building modern web experiences with clean code and elegant UI/UX design.
                </p>
              </div>
            </motion.div>
            
            {/* Newsletter Signup */}
            <div className="mt-8 p-6 bg-black/60 backdrop-blur-2xl rounded-3xl border border-zinc-800/70 shadow-2xl shadow-black/50 hover:shadow-purple-500/20 transition-all duration-500">
              <h4 className="text-lg font-black text-zinc-200 mb-4 flex items-center gap-2">
                <FaRss className="w-5 h-5 text-orange-500 drop-shadow-lg" />
                Stay Updated
              </h4>
              <div className="flex flex-col sm:flex-col gap-3">
                <div>
                  <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full flex-1 px-5 py-4 bg-zinc-900/70 backdrop-blur-2xl border border-zinc-700/60 rounded-3xl text-sm text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/40 transition-all duration-400 font-medium"
                />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600/90 to-pink-600/90 hover:from-purple-700 hover:to-pink-700 text-white font-black rounded-3xl shadow-2xl shadow-purple-600/40 hover:shadow-purple-600/60 backdrop-blur-xl transition-all duration-400 whitespace-nowrap border border-purple-500/50"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-xl font-black text-zinc-200 mb-8 bg-gradient-to-r from-zinc-300 to-zinc-100 bg-clip-text drop-shadow-xl tracking-tight flex items-center gap-2">
              Quick Links
              <ChevronDownIcon className="w-5 h-5 text-purple-500 drop-shadow-lg" />
            </h3>
            <nav className="space-y-4">
              {[
                { name: "Home", href: "/" },
                { name: "All Blogs", href: "/blogs" },
                { name: "Creators", href: "/creators" },
                { name: "Games", href: "/games" },
                { name: "About", href: "/about" }
              ].map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ x: 12, scale: 1.02 }}
                  className="group relative block px-6 py-4 bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-zinc-800/50 hover:border-purple-500/60 hover:bg-zinc-800/30 text-zinc-400 hover:text-purple-300 text-lg font-semibold transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10  rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500 z-10" />
                  <span className="relative z-10 flex items-center gap-3">
                    <div className="w-2 h-2 bg-zinc-600/50 rounded-full group-hover:bg-purple-400 transition-all duration-300 group-hover:scale-150" />
                    {link.name}
                  </span>
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="text-xl font-black text-zinc-200 mb-8 bg-gradient-to-r from-zinc-300 to-zinc-100 bg-clip-text drop-shadow-xl tracking-tight flex items-center gap-2">
              Resources
              <ChevronDownIcon className="w-5 h-5 text-orange-500 drop-shadow-lg" />
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms & Conditions", href: "/terms" },
                { name: "Cookie Policy", href: "/cookies" },
                { name: "Support", href: "/support" },
                { name: "API Docs", href: "/api" }
              ].map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <a 
                    href={item.href}
                    className="group flex items-center gap-4 px-6 py-4 bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-zinc-800/50 hover:border-orange-500/60 hover:bg-zinc-800/30 text-zinc-400 hover:text-orange-300 text-lg font-semibold transition-all duration-500 hover:translate-x-4"
                  >
                    <div className="w-3 h-3 bg-zinc-600/50 rounded-full group-hover:bg-orange-400 group-hover:scale-125 transition-all duration-400" />
                    <span className="relative">{item.name}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <h3 className="text-xl font-black text-zinc-200 mb-8 bg-gradient-to-r from-zinc-300 to-zinc-100 bg-clip-text drop-shadow-xl tracking-tight">
              Connect With Us
            </h3>
            
            {/* Social Links */}
            <div className="space-y-4 mb-8">
              {[
                { icon: FaGithub, color: "from-zinc-700/90 to-zinc-600/90", hover: "from-zinc-600 to-zinc-400", href: "#" },
                { icon: FaLinkedin, color: "from-blue-700/90 to-blue-600/90", hover: "from-blue-500 to-blue-400", href: "#" },
                { icon: FaInstagram, color: "from-pink-600/90 to-rose-600/90", hover: "from-pink-500 to-rose-500", href: "#" },
                { icon: FaEnvelope, color: "from-orange-600/90 to-red-600/90", hover: "from-orange-500 to-red-500", href: "mailto:gulzarhu80@gmail.com" }
              ].map(({ icon: Icon, color, hover, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ 
                    scale: 1.15, 
                    y: -6,
                    rotate: 5,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.6)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative block p-5 bg-black/70 backdrop-blur-2xl rounded-3xl border border-zinc-800/70 hover:shadow-2xl hover:shadow-purple-600/30 transition-all duration-500 overflow-hidden hover:border-purple-500/60"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10 blur-sm`} />
                  <div className="relative z-10 flex items-center justify-center p-3">
                    <Icon className="w-9 h-9 text-zinc-400 group-hover:text-white transition-all duration-500 drop-shadow-lg" />
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                </motion.a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-4 pt-6 border-t border-zinc-800/60">
              <div className="flex items-center gap-3 text-zinc-500 text-sm backdrop-blur-sm p-3 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-800/30 transition-all duration-300">
                <FaEnvelope className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <a href="mailto:hello@gulblog.com" className="hover:text-orange-400 transition-colors duration-300">gulzarhu80@gmail.com</a>
              </div>
              <div className="flex items-center gap-3 text-zinc-500 text-sm backdrop-blur-sm p-3 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-800/30 transition-all duration-300">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Katihar, Bihar, India
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-zinc-800/60 pt-12 mt-20"
        >
          <div className="text-center text-sm">
            <motion.p 
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              className="text-zinc-600 mb-6 backdrop-blur-xl bg-black/70 rounded-3xl inline-flex items-center gap-3 px-8 py-5 border border-zinc-800/70 shadow-2xl shadow-black/50 hover:shadow-purple-500/20 transition-all duration-500 font-medium tracking-wide"
            >
              © {currentYear} <span className="text-purple-400 font-black">GulBlog</span> — 
              Crafted with ❤️ in Bihar, India. All Rights Reserved. | 
              <a href="/sitemap" className="text-purple-400 hover:text-purple-300 ml-3 font-semibold transition-all duration-300 hover:underline flex items-center gap-1">
                Sitemap
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
