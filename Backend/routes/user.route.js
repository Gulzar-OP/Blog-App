import express from 'express';
import { register,login,logout ,myProfile, getAdmin} from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/authUser.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout',isAuthenticated, logout);
router.get('/my-profile',isAuthenticated,myProfile)
router.get('/getAdmin',getAdmin);

export default router;