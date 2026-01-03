import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  Noti_Creater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  message: {
    type: String,
    required: true
  },
  isRead: {
    type: Boolean,
    default: false // Backward compatibility
  },
  readers: [  // ✅ Fixed: 'reader' → 'readers' (plural)
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// ✅ Index for better performance
notificationSchema.index({ Noti_Creater: 1 });
notificationSchema.index({ readers: 1 });
notificationSchema.index({ createdAt: -1 });

export default mongoose.model("Notification", notificationSchema);
