import User from '../models/user.model.js';
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from 'bcryptjs';
import { generateAuthToken } from '../jwt/authToken.js';


// ================= REGISTER =================
export const register = async (req, res) => {
    try {
        // File check
        if (!req.files || !req.files.photo) {
            return res.status(400).json({ message: "Photo is required" });
        }

        const photo = req.files.photo;

        const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedMimeTypes.includes(photo.mimetype)) {
            return res.status(400).json({ message: "Only jpg, jpeg and png files are allowed" });
        }

        const { name, email, phone, education, password, role } = req.body;

        if (!name || !email || !phone || !education || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Cloudinary upload
        const cloudinaryResponse = await cloudinary.uploader.upload(
            photo.tempFilePath,
            { folder: "user_photos" }
        );

        const hashedPassword = await bcrypt.hash(password, 10);

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

        // JWT token generate
        const token = await generateAuthToken(newUser, res);

        return res.status(200).json({
            success: true,
            message: "User Registered Successfully",
            user: newUser,
            token
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



// ================= LOGIN =================
export const login = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        if (!email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.role !== role) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate Auth Token
        const token = await generateAuthToken(user, res);

        return res.status(200).json({
            success: true,
            message: "User Logged In Successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        });

    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



// ================= LOGOUT =================
export const logout = (req, res) => {
    try {
        res.clearCookie("authToken");
        return res.status(200).json({ message: "User Logged Out Successfully" });

    } catch (e) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const myProfile = async(req,res)=>{
    const user=await req.user;
    res.status(200).json(user);
};


export const getAdmin = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" });
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
