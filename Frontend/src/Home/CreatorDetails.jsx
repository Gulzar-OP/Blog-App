import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  CodeBracketIcon, 
  UserIcon, 
  AcademicCapIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon 
} from '@heroicons/react/24/outline';


export default function CreatorDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(
          `${API_URL}/api/users/${id}`,
          { withCredentials: true }
        );
        setUser(data.writer || data);
        console.log('Fetched user data:', data);
      } catch (err) {
        // console.error('Error fetching user:', err);
        setError('Failed to load creator profile');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  const getRoleIcon = (role) => {
    switch (role?.toLowerCase()) {
      case 'writer': return <CodeBracketIcon className="w-10 h-10 text-emerald-400" />;
      case 'reader': return <UserIcon className="w-10 h-10 text-cyan-400" />;
      default: return <UserIcon className="w-10 h-10 text-zinc-400" />;
    }
  };

  const getEducationIcon = (education) => {
    
    const icons = {
      'BCA': '🎓', 'BTech': '🚀', 'MCA': '💻', 
      'MTech': '🔬', 'BSc CS': '📊', 'Other': '✨'
    };
    return icons[education] || '👤';
  };

  if (loading) {
    return (
      <div className="min-h-screen py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-zinc-950 via-black/90 to-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-3xl animate-pulse" />
          <div className="h-12 bg-zinc-800/50 rounded-2xl mx-auto w-64 mb-6 animate-pulse" />
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-zinc-800/30 rounded-full mx-auto w-48 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-zinc-950 via-black/90 to-zinc-900 flex items-center justify-center">
        <div className="text-center py-32">
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-3xl backdrop-blur-xl border-2 border-zinc-700/50 flex items-center justify-center shadow-2xl">
            <span className="text-4xl">👤</span>
          </div>
          <h3 className="text-4xl font-black text-zinc-400 mb-6">{error || 'Creator Not Found'}</h3>
          <p className="text-xl text-zinc-500 max-w-lg mx-auto">
            The creator profile could not be loaded. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-zinc-950 via-black/90 to-zinc-900 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-b from-purple-500/5 to-emerald-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Hero Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative mx-auto mb-8 w-48 h-48 md:w-64 md:h-64"
          >
            <img
                src={user?.photo?.url || 'default_blog.png'}
                alt={user?.name || 'User profile'}
                className="w-full h-full rounded-4xl object-cover border-8 border-white/20 shadow-2xl"
                onError={(e) => {
                    e.currentTarget.src = '/default_blog.png';
                }}
            />

            <div className="absolute inset-0 rounded-4xl bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 blur opacity-70 animate-pulse" />
          </motion.div>

          {/* Name & Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-zinc-100 via-emerald-100 to-cyan-200 bg-clip-text text-transparent drop-shadow-2xl leading-tight">
              {user.name}
            </h1>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-3 mt-6 px-8 py-4 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-purple-500/20 backdrop-blur-xl rounded-full border border-emerald-400/30 font-mono text-lg tracking-widest text-emerald-300 shadow-2xl"
            >
              {getRoleIcon(user.role)}
              <span>{user.role}</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Details Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
        >
          {/* Left Column - Contact Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="group p-8 bg-zinc-900/80 backdrop-blur-3xl border border-zinc-700/50 rounded-4xl hover:shadow-emerald-500/25 transition-all duration-500"
            >
              <h3 className="text-2xl font-black text-emerald-400 mb-6 flex items-center gap-3">
                📧 Contact
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-2xl backdrop-blur-sm border border-zinc-700/50 group-hover:border-emerald-400/50 transition-all">
                  <EnvelopeIcon className="w-6 h-6 text-zinc-400" />
                  <span className="text-zinc-300 font-mono">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-2xl backdrop-blur-sm border border-zinc-700/50 group-hover:border-emerald-400/50 transition-all">
                  <PhoneIcon className="w-6 h-6 text-zinc-400" />
                  <span className="text-zinc-300 font-mono">{user.phone}</span>
                </div>
              </div>
            </motion.div>

            {user.education && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="p-8 bg-gradient-to-r from-zinc-900/80 to-zinc-800/50 backdrop-blur-3xl border border-zinc-700/50 rounded-4xl"
              >
                <h3 className="text-2xl font-black text-purple-400 mb-6 flex items-center gap-3">
                  🎓 Education
                </h3>
                <div className="flex items-center justify-center gap-4 p-6 bg-gradient-to-r from-purple-500/20 to-emerald-500/20 rounded-3xl backdrop-blur-sm border border-purple-400/30">
                  <span className="text-4xl">{getEducationIcon(user.education)}</span>
                  <span className="text-2xl font-bold text-zinc-100 uppercase tracking-wide">
                    {user.education}
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Activity */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="p-8 bg-zinc-900/80 backdrop-blur-3xl border border-zinc-700/50 rounded-4xl h-full"
            >
              <h3 className="text-2xl font-black text-cyan-400 mb-8 flex items-center gap-3">
                <CalendarIcon className="w-8 h-8" />
                Joined
              </h3>
              <div className="text-5xl md:text-6xl font-black text-zinc-100 mb-4">
                {new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long'
                })}
              </div>
              <div className="text-zinc-400 text-lg">
                Active member since {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-8 p-8 bg-zinc-900/60 backdrop-blur-xl rounded-4xl border border-zinc-700/50">
            <div className="text-center">
              <div className="text-4xl font-black text-emerald-400 mb-2">12.4k</div>
              <div className="text-zinc-400 font-mono text-sm uppercase tracking-wider">Followers</div>
            </div>
            <div className="w-px h-12 bg-zinc-700/50" />
            <div className="text-center">
              <div className="text-4xl font-black text-cyan-400 mb-2">47</div>
              <div className="text-zinc-400 font-mono text-sm uppercase tracking-wider">Posts</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
