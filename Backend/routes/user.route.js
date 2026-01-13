import express from 'express';
import {
  register,
  login,
  logout,
  myProfile,
  getWriter,
  getWriterDetails,
  getAllPostsByWriter
} from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/authUser.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', isAuthenticated, logout);

router.get('/my-profile', isAuthenticated, myProfile);
router.get('/getWriter', getWriter);
router.get('/getAllPostsByWriter/:id',getAllPostsByWriter)
// ✅ static route FIRST
router.get('/verify', isAuthenticated, async (req, res) => {
  try {
    const userResponse = {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      photo: req.user.photo,
    };

    return res.status(200).json({
      success: true,
      user: userResponse,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

// ✅ dynamic route LAST
router.get('/:id', getWriterDetails);

export default router;
