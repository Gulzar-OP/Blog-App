import mongoose from "mongoose";
import Blog from "../models/blog.model.js";
import { v2 as cloudinary } from 'cloudinary';
import User from "../models/user.model.js";
import { io } from "../server.js";
import { getIO } from "../socket.js";
import notificationModel from "../models/notification.model.js";
// export const createBlog = async (req, res) => {
//   try {
//     const { title, category, about } = req.body;

//     if (!title || !category || !about) {
//       return res
//         .status(400)
//         .json({ message: "Title, category and about are required" });
//     }

//     const userId = req.user?.id || req.user?._id;
//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     let blogImage = null;
//     if (req.file) {
//       const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
//       if (!allowedMimeTypes.includes(req.file.mimetype)) {
//         return res
//           .status(400)
//           .json({ message: "Only jpg, jpeg and png files are allowed" });
//       }

//       const uploadResult = await cloudinary.uploader.upload(req.file.path, {
//         folder: "blog/blogs",
//         transformation: [{ width: 800, height: 500, crop: "fill" }],
//       });

//       blogImage = {
//         public_id: uploadResult.public_id,
//         url: uploadResult.secure_url,
//       };
//     }

//     const newBlog = new Blog({
//       title,
//       category,
//       about,
//       blogImage,
//       adminName: user.name,
//       adminPhoto: user.photo?.url,
//       createdBy: userId,
//     });

// const io = getIO();

// const notification = await notificationModel.create({
//   user: userId,
//   title: "New Blog",
//   message: newBlog.title,
// });

// io.to(userId.toString()).emit("blog-notification", notification);

//     return res.status(201).json({
//       success: true,
//       message: "Blog created successfully",
//       blog: newBlog,
//     });
//   } catch (error) {
//     console.error("❌ Create blog error:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };




// ================= DELETE BLOG =================


export const createBlog = async (req, res) => {
  try {
    const { title, category, about } = req.body;

    if (!title || !category || !about) {
      return res
        .status(400)
        .json({ message: "Title, category and about are required" });
    }

    const userId = req.user?.id || req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let blogImage = " ";

    if (req.file) {
      const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedMimeTypes.includes(req.file.mimetype)) {
        fs.unlinkSync(req.file.path);
        return res
          .status(400)
          .json({ message: "Only jpg, jpeg and png files are allowed" });
      }

      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "blog/blogs",
        transformation: [{ width: 800, height: 500, crop: "fill" }],
      });

      fs.unlinkSync(req.file.path);

      blogImage = {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      };
    }

    // ✅ SAVE BLOG
    const newBlog = await Blog.create({
      title,
      category,
      about,
      blogImage,
      adminName: user.name,
      adminPhoto: user.photo?.url,
      createdBy: userId,
    });

    // 🔔 NOTIFICATION
    const io = getIO();

    // Example: sab users ko notification
    const notification = await notificationModel.create({
      Noti_Creater: userId,
      title: "🆕 New Blog Posted",
      message: newBlog.title,
    });

    io.emit("blog-notification", notification);

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error("❌ Create blog error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Blog id" });
    }

    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    io.emit("blog-notification", {
      action: "delete",
      title: blog.title,
      id: blog._id,
      message: `❌ Blog Deleted: ${blog.title}`,
    });

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Delete blog error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};


// ================= GET ALL BLOGS =================
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs
    });
  } catch (error) {
    console.error("Get all blogs error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ================= GET SINGLE BLOG =================
export const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Blog id" });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json(blog);
  } catch (error) {
    console.error("Get single blog error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ================= MY BLOGS =================
export const myBlogs = async (req, res) => {
  try {
    const createdBy = req.user?.id || req.user?._id;
    if (!createdBy) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const myBlogs = await Blog.find({ createdBy }).sort({ createdAt: -1 });
    return res.status(200).json(myBlogs);
  } catch (error) {
    console.error("My blogs error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ================= UPDATE BLOG =================
export const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ message: "Invalid Blog id" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    io.emit("blog-notification", {
      action: "update",
      title: updatedBlog.title,
      id: updatedBlog._id,
      message: `✏️ Blog Updated: ${updatedBlog.title}`,
    });

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Update blog error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


