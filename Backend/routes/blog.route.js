import express from 'express';
import { createBlog, deleteBlog, getAllBlogs, getSingleBlog, myBlogs, updateBlog} from '../controllers/blog.controller.js';
import { isAdmin, isAuthenticated } from '../middlewares/authUser.js';

const router = express.Router();

router.post('/create', isAuthenticated, isAdmin('writer','admin'),createBlog);
router.delete('/delete/:id', isAuthenticated,isAdmin('writer','admin'),deleteBlog);
router.get('/all-blogs',getAllBlogs);
router.get('/single-blog/:id',getSingleBlog);

router.get('/my-blog',isAuthenticated,myBlogs);
// router.put('/update-blog/:id',isAuthenticated,isAdmin('admin'),updateBlog);
router.put("/update/:id", isAuthenticated, isAdmin("writer",'admin'), updateBlog);

export default router;