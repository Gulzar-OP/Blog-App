import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  AcademicCapIcon,
  CameraIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL;

export default function MyProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    education: '',
    photo: null
  });
  const [imagePreview, setImagePreview] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Fetch user profile with proper error handling
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/users/my-profile`, {
        withCredentials: true
      });
      
      // Handle both response structures
      const userData = res.data.user || res.data.adminUser || res.data;
      setUser(userData);
      
      setFormData({
        name: userData.name || '',
        phone: userData.phone || '',
        education: userData.education || '',
        photo: null
      });
      setImagePreview(userData.photo?.url || '');
    } catch (err) {
      console.error('Profile fetch error:', err);
      
      // Check if it's an auth error (401/403)
      if (err.response?.status === 401 || err.response?.status === 403) {
        toast.error('Please log in to view your profile');
        navigate('/login', { replace: true });
        return;
      }
      
      toast.error('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'photo' && files?.[0]) {
      const file = files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5 MB');
        return;
      }
      setFormData(prev => ({ ...prev, photo: file }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEditToggle = () => {
    if (editing) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        education: user.education || '',
        photo: null
      });
      setImagePreview(user.photo?.url || '');
    }
    setEditing(!editing);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaveLoading(true);

    try {
      const fd = new FormData();
      fd.append('name', formData.name);
      if (formData.phone) fd.append('phone', formData.phone);
      if (formData.education) fd.append('education', formData.education);
      if (formData.photo) fd.append('photo', formData.photo);

      const res = await axios.put(
        `${API_URL}/api/users/update/${user._id}`,
        fd,
        { 
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      const updatedUser = res.data.user || res.data.adminUser || res.data;
      setUser(updatedUser);
      setEditing(false);
      toast.success('Profile updated successfully!');
      
      setTimeout(() => fetchProfile(), 500);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        toast.error('Session expired. Please log in again.');
        navigate('/login', { replace: true });
        return;
      }
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSaveLoading(false);
    }
  };

  const defaultImage = '/default_blog.png';
  const profileImage = editing
    ? imagePreview || user?.photo?.url || defaultImage
    : user?.photo?.url || defaultImage;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-black via-zinc-950/90 to-zinc-900/80">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full"
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-black via-zinc-950/90 to-zinc-900/80">
        <div className="text-center py-32">
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-3xl backdrop-blur-xl border-2 border-zinc-700/50 flex items-center justify-center shadow-2xl">
            <span className="text-4xl">👤</span>
          </div>
          <h3 className="text-4xl font-black text-zinc-400 mb-6">Please Log In</h3>
          <p className="text-xl text-zinc-500 max-w-lg mx-auto">
            You need to be logged in to view your profile.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="mt-8 px-12 py-6 text-white font-black text-xl rounded-4xl shadow-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-purple-500/50 transition-all duration-400"
          >
            Go to Login
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-black via-zinc-950/90 to-zinc-900/80 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-b from-blue-500/5 to-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 backdrop-blur-2xl rounded-3xl border border-purple-500/40 shadow-2xl mb-8"
          >
            <UserIcon className="w-7 h-7 text-purple-300" />
            <span className="text-xl font-black text-white tracking-wider">MY PROFILE</span>
          </motion.div>
   
          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed backdrop-blur-sm px-8 py-4 bg-black/40 rounded-3xl border border-zinc-800/50">
            Manage your account information and profile picture
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/60 backdrop-blur-3xl shadow-2xl rounded-4xl border border-zinc-700/50 overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-purple-600/90 via-pink-600/90 to-blue-600/90 p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 text-center lg:text-left">
              <div className="relative group">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-4xl overflow-hidden ring-4 ring-white/30 shadow-2xl relative z-10">
                  <motion.img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    whileHover={{ scale: 1.05 }}
                  />
                </div>
                {editing && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-3 -right-3 bg-gradient-to-r from-emerald-500 to-green-500 p-3 rounded-3xl shadow-2xl ring-4 ring-white/50 hover:shadow-emerald-500/50 transition-all duration-300 z-20"
                    title="Change photo"
                  >
                    <CameraIcon className="w-6 h-6 text-white" />
                  </motion.button>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-black drop-shadow-lg">{user?.name || 'User'}</h2>
                <motion.p 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-purple-100 text-xl md:text-2xl font-semibold opacity-90 bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm inline-block"
                >
                  {user?.role === 'writer' ? ' ADMINISTRATOR' : ' MEMBER'}
                </motion.p>
              </div>
              <motion.div 
                className="flex gap-3 flex-col sm:flex-row"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEditToggle}
                  className="group flex items-center gap-3 bg-white/20 backdrop-blur-xl px-8 py-4 rounded-3xl border border-white/30 hover:bg-white/30 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 font-black text-lg"
                >
                  {editing ? (
                    <>
                      <XMarkIcon className="w-6 h-6" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <PencilIcon className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                      Edit Profile
                    </>
                  )}
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8 lg:p-16">
            <form onSubmit={handleSave} className="space-y-10">
              {/* Email - Read only */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10"
              >
                <div className="group">
                  <label className="block text-lg font-black text-zinc-200 mb-4 flex items-center gap-3">
                    <EnvelopeIcon className="w-6 h-6 text-purple-400" />
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full px-6 py-6 bg-black/50 backdrop-blur-xl border-2 border-zinc-700/50 rounded-3xl text-xl font-semibold text-zinc-200 pr-14 disabled:cursor-default focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500/60 transition-all duration-500"
                    />
                    <EnvelopeIcon className="w-6 h-6 text-zinc-500 absolute right-5 top-1/2 -translate-y-1/2 group-hover:text-purple-400 transition-colors duration-300" />
                  </div>
                </div>

                {/* Name */}
                <div className="group">
                  <label className="block text-lg font-black text-zinc-200 mb-4 flex items-center gap-3">
                    <UserIcon className="w-6 h-6 text-purple-400" />
                    Full Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className="w-full px-6 py-6 border-2 border-zinc-700/50 rounded-3xl text-xl font-semibold bg-black/50 backdrop-blur-xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500/60 transition-all duration-500 disabled:bg-zinc-900/70 disabled:cursor-not-allowed disabled:opacity-75 text-zinc-200"
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10"
              >
                {/* Phone */}
                <div className="group">
                  <label className="block text-lg font-black text-zinc-200 mb-4 flex items-center gap-3">
                    <PhoneIcon className="w-6 h-6 text-purple-400" />
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className="w-full px-6 py-6 border-2 border-zinc-700/50 rounded-3xl text-xl font-semibold bg-black/50 backdrop-blur-xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500/60 transition-all duration-500 disabled:bg-zinc-900/70 disabled:cursor-not-allowed disabled:opacity-75 text-zinc-200"
                  />
                </div>

                {/* Education */}
                <div className="group">
                  <label className="block text-lg font-black text-zinc-200 mb-4 flex items-center gap-3">
                    <AcademicCapIcon className="w-6 h-6 text-purple-400" />
                    Education
                  </label>
                  <input
                    name="education"
                    type="text"
                    value={formData.education}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className="w-full px-6 py-6 border-2 border-zinc-700/50 rounded-3xl text-xl font-semibold bg-black/50 backdrop-blur-xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500/60 transition-all duration-500 disabled:bg-zinc-900/70 disabled:cursor-not-allowed disabled:opacity-75 text-zinc-200"
                    placeholder="e.g. B.Tech Computer Science"
                  />
                </div>
              </motion.div>

              {/* Photo Upload - Hidden file input */}
              <input
                ref={fileInputRef}
                name="photo"
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="hidden"
              />

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {editing && (
                  <div className="flex flex-col sm:flex-row gap-6 pt-8">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={saveLoading}
                      className="flex-1 group bg-gradient-to-r from-emerald-600/90 to-green-600/90 hover:from-emerald-700 hover:to-green-700 text-white py-6 px-12 rounded-3xl shadow-2xl hover:shadow-emerald-500/50 backdrop-blur-xl border border-emerald-500/50 transition-all duration-500 font-black text-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/50 to-green-500/50 -inset-1 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                      {saveLoading ? (
                        <>
                          <div className="w-7 h-7 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <CheckIcon className="w-7 h-7" />
                          Save Changes
                        </>
                      )}
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleEditToggle}
                      className="px-12 py-6 border-2 border-zinc-700/50 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/50 hover:border-purple-500/60 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-purple-500/30 transition-all duration-500 font-black text-xl"
                    >
                      Cancel
                    </motion.button>
                  </div>
                )}
              </motion.div>
            </form>

            {/* Account Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-20 pt-16 border-t-2 border-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-3xl p-8 bg-black/30 backdrop-blur-xl"
            >
              <h3 className="text-3xl font-black text-zinc-200 mb-10 flex items-center gap-4">
                <ArrowLeftIcon className="w-10 h-10 text-purple-400" />
                Account Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group bg-gradient-to-r from-zinc-900/50 to-black/30 p-8 rounded-3xl border border-zinc-700/50 hover:border-purple-500/50 backdrop-blur-xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 cursor-default"
                >
                  <div className="text-sm font-black text-purple-400 uppercase tracking-wider mb-4 group-hover:text-purple-300 transition-colors">Member Since</div>
                  <div className="text-3xl font-black text-zinc-100">
                    {new Date(user?.createdAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group bg-gradient-to-r from-zinc-900/50 to-black/30 p-8 rounded-3xl border border-zinc-700/50 hover:border-purple-500/50 backdrop-blur-xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 cursor-default"
                >
                  <div className="text-sm font-black text-purple-400 uppercase tracking-wider mb-4 group-hover:text-purple-300 transition-colors">Account ID</div>
                  <div className="text-xl font-mono bg-black/60 px-6 py-3 rounded-2xl text-zinc-300 backdrop-blur-xl border border-zinc-600/50">
                    {user?._id?.slice(-8) || 'N/A'}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
