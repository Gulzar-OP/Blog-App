import User from '../models/user.model.js';
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from 'bcryptjs';
import { generateAuthToken } from '../jwt/authToken.js';
import fs from 'fs'; // Add for temp file cleanup

// ================= REGISTER =================
export const register = async (req, res) => {
    try {
        // File validation
        if (!req.files || !req.files.photo) {
            return res.status(400).json({ message: "Photo is required" });
        }

        const photo = req.files.photo;
        const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        
        if (!allowedMimeTypes.includes(photo.mimetype)) {
            return res.status(400).json({ message: "Only jpg, jpeg and png files are allowed" });
        }

        // File size validation (5MB limit)
        if (photo.size > 5 * 1024 * 1024) {
            fs.unlinkSync(photo.tempFilePath); // Clean up temp file
            return res.status(400).json({ message: "File size must be less than 5MB" });
        }

        const { name, email, phone, education, password, role } = req.body;

        // Input validation
        if (!name || !email || !phone || !education || !password || !role) {
          // File valid size ki ho sakti hai
          // Lekin user ne form incomplete bheja
          // File ko rakhna bekaar hai → delete
            fs.unlinkSync(photo.tempFilePath); // Clean up temp file
            return res.status(400).json({ message: "All fields are required" });
        }

        // Email and phone validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            fs.unlinkSync(photo.tempFilePath);
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Check user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            fs.unlinkSync(photo.tempFilePath);
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Cloudinary upload
        const cloudinaryResponse = await cloudinary.uploader.upload(
            photo.tempFilePath,    //Ye server ke temp folder me stored image ka path hai
            { folder: "Blog_user_photos" }   //Cloudinary ke dashboard me image iss folder ke andar save hogi
        );

        // Clean up temp file
        fs.unlinkSync(photo.tempFilePath);   //Server se temp image delete
        //Jab bhi request fail ho → temp file delete
        // Jab request success ho → tab bhi temp file delete
        const hashedPassword = await bcrypt.hash(password, 10); // Increased salt rounds

        const newUser = new User({
            name,
            email,
            phone,
            education,
            password: hashedPassword,
            role,
            photo: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url
            }
        });

        await newUser.save();

        // Generate JWT token
        const token = await generateAuthToken(newUser._id.toString(), res);

        // Return user without password
        const userResponse = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            education: newUser.education,
            role: newUser.role,
            photo: newUser.photo
        };

        return res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            user: userResponse,
            token
        });

    } catch (err) {
        console.error('Register error:', err);
        // Clean up temp file if exists
        if (req.files?.photo?.tempFilePath) {
            fs.unlink(req.files.photo.tempFilePath, () => {});
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// ================= LOGIN =================
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: "Email, password, and role are required" });
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (user.role !== role) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        // const token = await generateAuthToken(user._id.toString(), res);
        const token = await generateAuthToken(user, res);
        const userResponse = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            photo: user.photo
        };

        return res.status(200).json({
            success: true,
            message: "User Logged In Successfully",
            user: userResponse,
            token
        });

    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// ================= LOGOUT =================
export const logout = (req, res) => {
    try {
        res.clearCookie("authToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax"
        });
        return res.status(200).json({ message: "User Logged Out Successfully" });
    } catch (err) {
        console.error('Logout error:', err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// ================= MY PROFILE =================
export const myProfile = async (req, res) => {
    try {
        // req.user should be populated by auth middleware
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (err) {
        console.error('Profile error:', err);
        return res.status(500).json({ message: "Server Error" });
    }
};

// ================= GET ADMIN USERS =================
export const getAdmin = async (req, res) => {
    try {
        // Ensure only admins can access this
        // if (req.user.role !== 'admin') {
        //     return res.status(403).json({ message: "Access denied" });
        // }

        const admins = await User.find({role:"admin" })
            // .select('-password')
            // .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            admins,
            count: admins.length
        });
    } catch (err) {
        console.error('Get admins error:', err);
        return res.status(500).json({ message: err.message });
    }
};
