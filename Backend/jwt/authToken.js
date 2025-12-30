import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const generateAuthToken = async (user, res) => {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });

    res.cookie("authToken", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        path: "/",
        maxAge: 1000 * 60 * 60, // 1 hour (matches JWT expiresIn)
        // OR expires: new Date(Date.now() + 1000 * 60 * 60)
    });


    // await User.findByIdAndUpdate(user._id, { token });
    await User.findByIdAndUpdate(user._id, { 
    lastLogin: new Date(),
    isActive: true 
});

    return token;
};

