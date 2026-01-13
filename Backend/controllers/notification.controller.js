import notificationModel from "../models/notification.model.js";
import User from "../models/user.model.js"; // Import User model
import { getIO } from "../socket.js";
// ✅ Admin create → ALL users ko notification
export const createNotification = async (req, res) => {
  try {
    const { title, message, type = "general" } = req.body;
    const creatorId = req.user._id; // creator ID

    if (!title || !message) {
      return res.status(400).json({
        success: false,
        message: "Title and message are required"
      });
    }

    const users = await User.find({
      _id: { $ne: req.user._id }       // jo send kar raha hai usko exclude
    }).select("_id");

    const notifications = [];
    
    for (const user of users) {
      const notification = await notificationModel.create({
        Noti_Creater: creatorId,
        title,
        message,
        type,
        readers: [] // Empty readers array
      });
      
      notifications.push(notification);
      
      // ✅ Real-time socket to specific user
      req.io.to(user._id.toString()).emit("new-notification", notification);
    }

    res.status(201).json({
      success: true,
      notifications,
      totalSent: notifications.length
    });
  } catch (error) {
    console.error("Create notification error:", error);
    res.status(500).json({
      success: false,
      message: "Notification create failed",
    });
  }
};

// ✅ Get notifications for current user (sirf unread)
export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const notifications = await notificationModel
      .find({
        // ✅ User ne abhi tak read nahi kiya
        readers: { $ne: userId }, // userId readers array me nahi hai
        Noti_Creater: { $ne: userId } // Apne notifications mat dikhao
      })
      .sort({ createdAt: -1 })
      .limit(50)
      .populate('Noti_Creater', 'name avatar')
      .lean();

    const unreadCount = await notificationModel.countDocuments({
      readers: { $ne: userId },
      Noti_Creater: { $ne: userId }
    });

    res.status(200).json({
      success: true,
      notifications,
      unreadCount
    });
  } catch (error) {
    console.error("Get notifications error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
    });
  }
};

// ✅ FIXED: Mark as read → reader array me add kar do
export const markAsRead = async (req, res) => {
  try {
    const userId = req.user._id;
    const notificationId = req.params.id;

    // ✅ Check if user already read it
    const notification = await notificationModel.findById(notificationId);
    
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found"
      });
    }

    // ✅ Already read check
    if (notification.readers.includes(userId)) {
      return res.status(200).json({
        success: true,
        message: "Already read",
        notification
      });
    }

    // ✅ Add user to readers array
    const updatedNotification = await notificationModel.findByIdAndUpdate(
      notificationId,
      { 
        $addToSet: { readers: userId } // ✅ Duplicate avoid karega
      },
      { new: true }
    ).populate('Noti_Creater', 'name avatar');

    res.status(200).json({
      success: true,
      notification: updatedNotification,
      message: "Marked as read"
    });
  } catch (error) {
    console.error("Mark as read error:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to update notification"
    });
  }
};

// ✅ Mark ALL unread as read
export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // ✅ Sare unread notifications me user ko readers me add kar do
    const result = await notificationModel.updateMany(
      { 
        readers: { $ne: userId } // Jo unread hai
      },
      { 
        $addToSet: { readers: userId }
      }
    );

    res.status(200).json({
      success: true,
      message: `${result.modifiedCount} notifications marked as read`,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error("Mark all as read error:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to update notifications"
    });
  }
};

export const sendNotification = async (req, res) => {
  const { userId, message } = req.body;

  const io = getIO();

  io.to(userId).emit("notification", {
    message,
    time: new Date(),
  });

  res.status(200).json({
    success: true,
    message: "Notification sent",
  });
};
