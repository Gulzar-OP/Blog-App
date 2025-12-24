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
        secure: false,       // FIXED
        sameSite: "Lax",     // FIXED
        path: "/",           
    });

    await User.findByIdAndUpdate(user._id, { token });

    return token;
};

