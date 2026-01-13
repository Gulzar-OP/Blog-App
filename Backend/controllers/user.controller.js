import mongoose from "mongoose";
import User from "../models/user.model.js";
import Blog from "../models/blog.model.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import { generateAuthToken } from "../jwt/authToken.js";
import fs from "fs";

/* ================= REGISTER ================= */
export const register = async (req, res) => {
  try {
    if (!req.files?.photo) {
      return res.status(400).json({ message: "Photo is required" });
    }

    const photo = req.files.photo;
    const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (!allowedMimeTypes.includes(photo.mimetype)) {
      fs.unlinkSync(photo.tempFilePath);
      return res.status(400).json({ message: "Only jpg, jpeg, png allowed" });
    }

    if (photo.size > 5 * 1024 * 1024) {
      fs.unlinkSync(photo.tempFilePath);
      return res.status(400).json({ message: "Image size must be < 5MB" });
    }

    const { name, email, phone, education, password, role } = req.body;

    if (!name || !email || !phone || !education || !password || !role) {
      fs.unlinkSync(photo.tempFilePath);
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      fs.unlinkSync(photo.tempFilePath);
      return res.status(400).json({ message: "Email already registered" });
    }

    const uploadResult = await cloudinary.uploader.upload(photo.tempFilePath, {
      folder: "Blog_user_photos",
    });

    fs.unlinkSync(photo.tempFilePath);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      education,
      password: hashedPassword,
      role,
      photo: {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      },
    });

    // const token = await generateAuthToken(user._id.toString(), res);
    const token = generateAuthToken(user._id.toString(), res);

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photo: user.photo,
      },
      token,
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    const { email, password} = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // const token = await generateAuthToken(user._id.toString(), res);
    const token = generateAuthToken(user._id.toString(), res);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photo: user.photo,
      },
      token,
    });
  } catch (err) {
    // console.error("Login error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ================= LOGOUT ================= */
export const logout = (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  });

  return res.status(200).json({ message: "Logged out successfully" });
};

/* ================= MY PROFILE ================= */
export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error("Profile error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

/* ================= GET ALL WRITERS ================= */
export const getWriter = async (req, res) => {
  try {
    const writers = await User.find({ role: "writer" }).select("-password");

    return res.status(200).json({
      success: true,
      count: writers.length,
      writers,
    });
  } catch (err) {
    console.error("Get writer error:", err);
    return res.status(500).json({ message: err.message });
  }
};

/* ================= GET WRITER DETAILS ================= */
export const getWriterDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid writer id" });
    }

    const writer = await User.findById(id).select("-password");
    if (!writer) {
      return res.status(404).json({ message: "Writer not found" });
    }

    return res.status(200).json({
      success: true,
      writer,
    });
  } catch (err) {
    console.error("Writer details error:", err);
    return res.status(500).json({ message: err.message });
  }
};

/* ================= GET WRITER POSTS ================= */
export const getAllPostsByWriter = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid writer id" });
    }

    const posts = await Blog.find({ createdBy: id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (err) {
    console.error("Get all posts error:", err);
    return res.status(500).json({ message: err.message });
  }
};
