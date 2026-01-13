import mongoose from "mongoose";
import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
import notificationModel from "../models/notification.model.js";
import { v2 as cloudinary } from "cloudinary";
import { getIO } from "../socket.js";
import fs from "fs";

/* ================= CREATE BLOG ================= */
export const createBlog = async (req, res) => {
  try {
    const { title, category, about } = req.body;

    if (!title || !category || !about) {
      return res.status(400).json({ message: "Title, category and about are required" });
    }

    const writerId = req.user?.id || req.user?._id;
    if (!writerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const writer = await User.findById(writerId);
    if (!writer) {
      return res.status(404).json({ message: "Writer not found" });
    }

    let blogImage = null;

    /* ---------- IMAGE UPLOAD ---------- */
    if (req.files?.blogImage) {
      const file = req.files.blogImage;
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

      if (!allowedTypes.includes(file.mimetype)) {
        fs.unlinkSync(file.tempFilePath);
        return res.status(400).json({ message: "Only jpg, jpeg, png allowed" });
      }

      const uploadResult = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "blog/blogs",
        transformation: [{ width: 800, height: 500, crop: "fill" }],
      });

      fs.unlinkSync(file.tempFilePath);

      blogImage = {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      };
    }
    await User.findByIdAndUpdate(
      writerId,
      { $inc: { no_ofBlogs: 1 } }
    );




    const newBlog = await Blog.create({
      title,
      category,
      about,
      blogImage,
      writerName: writer.name,
      writerhoto: writer.photo?.url,
      createdBy: writerId,
      no_ofBlogs: writer.no_ofBlogs,
    });

    /* ---------- SOCKET NOTIFICATION ---------- */
    const io = getIO();
    const notification = await notificationModel.create({
      Noti_Creater: writerId,
      title: newBlog.title,
      message: "Blog created",
    });

    io.emit("blog-notification", notification);

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Create blog error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/* ================= DELETE BLOG ================= */
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const io = getIO();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid blog id" });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // 🔥 delete image from cloudinary
    if (blog.blogImage?.public_id) {
      await cloudinary.uploader.destroy(blog.blogImage.public_id);
    }

    await blog.deleteOne();

    io.emit("blog-notification", {
      action: "delete",
      id: blog._id,
      title: blog.title,
      message: `🗑 Blog Deleted: ${blog.title}`,
    });

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Delete blog error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET ALL BLOGS ================= */
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.error("Get all blogs error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/* ================= GET SINGLE BLOG ================= */
export const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid blog id" });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error("Get single blog error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/* ================= MY BLOGS ================= */
export const myBlogs = async (req, res) => {
  try {
    const createdBy = req.user?.id || req.user?._id;
    if (!createdBy) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const blogs = await Blog.find({ createdBy }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.error("My blogs error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/* ================= UPDATE BLOG ================= */
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const io = getIO();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid blog id" });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    let blogImage = blog.blogImage;

    if (req.files?.blogImage) {
      const file = req.files.blogImage;
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

      if (!allowedTypes.includes(file.mimetype)) {
        fs.unlinkSync(file.tempFilePath);
        return res.status(400).json({ message: "Only jpg, jpeg, png allowed" });
      }

      if (blog.blogImage?.public_id) {
        await cloudinary.uploader.destroy(blog.blogImage.public_id);
      }

      const uploadResult = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "blog/blogs",
        transformation: [{ width: 800, height: 500, crop: "fill" }],
      });

      fs.unlinkSync(file.tempFilePath);

      blogImage = {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      };
    }

    blog.title = req.body.title || blog.title;
    blog.category = req.body.category || blog.category;
    blog.about = req.body.about || blog.about;
    blog.blogImage = blogImage;

    const updatedBlog = await blog.save();

    io.emit("blog-notification", {
      action: "update",
      id: updatedBlog._id,
      title: updatedBlog.title,
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
/* ================= LIKE BLOG ================= */
export const likeBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid blog id" });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.like += 1;
    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog liked successfully",
      likes: blog.like,
    });
  } catch (error) {
    console.error("Like blog error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};