import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['reader', 'writer','admin'], default: 'reader' },
  education: { type: String },
  photo: {
    url: { 
      type: String, 
      // required: false  ← COMMENTED OUT / REMOVED
      default: '' 
    },
    public_id: { 
      type: String, 
      // required: false  ← COMMENTED OUT / REMOVED  
      default: ''
    }
  },
  no_ofBlogs: { type: Number, default: 0 }
}, { timestamps: true });

export const User =  mongoose.model('User', userSchema);
export default User;