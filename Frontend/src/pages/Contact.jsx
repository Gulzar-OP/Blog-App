import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  EnvelopeIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: "c470d355-0012-48c2-bb9e-54fc002838f1",
      name: data.username,
      email: data.email,
      message: data.message,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Message sent successfully! We'll get back to you soon 🚀");
        reset();
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen py-24 px-6 md:px-12 lg:px-24 flex items-center justify-center bg-gradient-to-br from-black via-zinc-950/90 to-zinc-900/80 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-500/8 via-pink-500/8 to-emerald-500/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-b from-emerald-500/8 to-orange-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-indigo-500/6 to-purple-500/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.5s'}} />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
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
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600/20 via-emerald-600/20 to-pink-600/20 backdrop-blur-2xl rounded-4xl border border-purple-500/40 shadow-2xl shadow-purple-500/30 mb-8"
          >
            <EnvelopeIcon className="w-8 h-8 text-emerald-300" />
            <span className="text-2xl font-black text-white tracking-wider">GET IN TOUCH</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white text-6xl md:text-8xl font-black bg-gradient-to-r from-zinc-200 via-white to-zinc-300 bg-clip-text drop-shadow-2xl mb-6 tracking-tight leading-tight"
          >
            Contact<span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">Us</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed backdrop-blur-sm px-12 py-8 bg-black/40 rounded-4xl border border-zinc-700/50 shadow-2xl"
          >
            Have a question or project idea? We'd love to hear from you. Drop us a message and we'll respond within 24 hours.
          </motion.p>
        </motion.div>

        {/* Main Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/60 backdrop-blur-3xl shadow-2xl rounded-4xl border border-zinc-700/50 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12 p-12 lg:p-20">
            {/* Contact Form */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-8 lg:pr-12"
            >
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-black text-zinc-200 mb-2 flex items-center gap-4"
              >
                <EnvelopeIcon className="w-12 h-12 text-purple-400" />
                Send Message
              </motion.h3>
              
              <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                {/* Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="group relative"
                >
                  <label className="block text-xl font-black text-zinc-300 mb-4 flex items-center gap-3">
                    <UserIcon className="w-7 h-7 text-purple-400 group-focus-within:text-purple-300 transition-colors" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="What's your name?"
                    {...register("username", { 
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters"
                      }
                    })}
                    className="w-full px-8 py-6 bg-zinc-900/70 backdrop-blur-xl border-2 border-zinc-700/50 rounded-4xl text-xl font-semibold text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-4 focus:ring-purple-500/40 focus:border-purple-500/70 transition-all duration-500 shadow-xl hover:shadow-purple-500/20"
                  />
                  {errors.username && (
                    <motion.p 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-2 font-medium"
                    >
                      <span className="w-4 h-4 bg-red-400 rounded-full flex items-center justify-center font-bold text-white text-xs">!</span>
                      {errors.username.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="group relative"
                >
                  <label className="block text-xl font-black text-zinc-300 mb-4 flex items-center gap-3">
                    <EnvelopeIcon className="w-7 h-7 text-emerald-400 group-focus-within:text-emerald-300 transition-colors" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    className="w-full px-8 py-6 bg-zinc-900/70 backdrop-blur-xl border-2 border-zinc-700/50 rounded-4xl text-xl font-semibold text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/40 focus:border-emerald-500/70 transition-all duration-500 shadow-xl hover:shadow-emerald-500/20"
                  />
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-2 font-medium"
                    >
                      <span className="w-4 h-4 bg-red-400 rounded-full flex items-center justify-center font-bold text-white text-xs">!</span>
                      {errors.email.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="group relative"
                >
                  <label className="block text-xl font-black text-zinc-300 mb-4 flex items-center gap-3">
                    <svg className="w-7 h-7 text-orange-400 group-focus-within:text-orange-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    Your Message
                  </label>
                  <textarea
                    rows="6"
                    placeholder="Tell us about your project or question..."
                    {...register("message", { 
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters"
                      }
                    })}
                    className="w-full px-8 py-6 bg-zinc-900/70 backdrop-blur-xl border-2 border-zinc-700/50 rounded-4xl text-xl font-semibold text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-4 focus:ring-orange-500/40 focus:border-orange-500/70 transition-all duration-500 shadow-xl hover:shadow-orange-500/20 resize-vertical"
                  />
                  {errors.message && (
                    <motion.p 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-2 font-medium"
                    >
                      <span className="w-4 h-4 bg-red-400 rounded-full flex items-center justify-center font-bold text-white text-xs">!</span>
                      {errors.message.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  type="submit"
                  className="group relative w-full bg-gradient-to-r from-purple-600/95 via-emerald-600/95 to-pink-600/95 hover:from-purple-700 hover:via-emerald-700 hover:to-pink-700 text-white py-8 px-12 rounded-4xl shadow-2xl hover:shadow-purple-500/60 backdrop-blur-xl border border-purple-500/50 font-black text-2xl flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 via-emerald-500/50 to-pink-500/50 blur -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <span className="relative z-10 flex items-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRightIcon className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-500" />
                      </>
                    )}
                  </span>
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="space-y-8 lg:pl-12 pt-8 lg:pt-0"
            >
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-black text-zinc-200 mb-12 flex items-center gap-4"
              >
                <MapPinIcon className="w-12 h-12 text-emerald-400" />
                Visit Us
              </motion.h3>

              {/* Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ delay: 1.1 }}
                className="group relative p-10 bg-gradient-to-br from-zinc-900/70 via-black/40 to-zinc-900/70 backdrop-blur-3xl rounded-4xl border border-zinc-700/50 shadow-2xl hover:shadow-emerald-500/30 hover:border-emerald-500/60 transition-all duration-500 cursor-default overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-purple-500/10 blur opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-3xl flex items-center justify-center shadow-2xl flex-shrink-0 mt-1">
                    <MapPinIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-zinc-100 mb-3">katihar, Bihar</h4>
                    <p className="text-xl text-zinc-400 leading-relaxed">India's Premier Blog Platform<br/>Serving content creators nationwide</p>
                  </div>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ delay: 1.2 }}
                className="group relative p-10 bg-gradient-to-br from-zinc-900/70 via-black/40 to-zinc-900/70 backdrop-blur-3xl rounded-4xl border border-zinc-700/50 shadow-2xl hover:shadow-purple-500/30 hover:border-purple-500/60 transition-all duration-500 cursor-default overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-emerald-500/10 blur opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-3xl flex items-center justify-center shadow-2xl flex-shrink-0 mt-1">
                    <PhoneIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-zinc-100 mb-3">+91 9661720780</h4>
                    <p className="text-xl text-zinc-400 leading-relaxed">Available 24/7 for support</p>
                  </div>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ delay: 1.3 }}
                className="group relative p-10 bg-gradient-to-br from-zinc-900/70 via-black/40 to-zinc-900/70 backdrop-blur-3xl rounded-4xl border border-zinc-700/50 shadow-2xl hover:shadow-orange-500/30 hover:border-orange-500/60 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10 blur opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl flex-shrink-0 mt-1">
                    <EnvelopeIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-zinc-100 mb-3">gulzarhu80@gmail.com</h4>
                    <p className="text-xl text-zinc-400 leading-relaxed">Fastest response time</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
