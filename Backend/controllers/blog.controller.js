import mongoose from "mongoose";
import Blog from "../models/blog.model.js";
import { v2 as cloudinary } from 'cloudinary';

export const createBlog = async (req, res) => {
    try {
        if (!req.files || !req.files.blogImage) {
            return res.status(400).json({ message: "Blog image is required" });
        }

        const blogImage = req.files.blogImage;

        const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedMimeTypes.includes(blogImage.mimetype)) {
            return res.status(400).json({ message: "Only jpg, jpeg and png files are allowed" });
        }

        const { title, category, about } = req.body;

        if (!title || !category || !about) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const adminName = req?.user?.name;
        const adminPhoto = req?.user?.photo.url;
        const createdBy = req?.user?._id;

        const cloudinaryResponse = await cloudinary.uploader.upload(blogImage.tempFilePath);

        if (!cloudinaryResponse || cloudinaryResponse.error) {
            return res.status(500).json({ message: "Image upload failed" });
        }

        const blogData={
            title,
            category,
            about,
            adminName,
            adminPhoto,
            createdBy,
            blogImage: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url
            }
        };
        const blog = new Blog(blogData);
        await blog.save();

        return res.status(201).json({
            success: true,
            message: "Blog created successfully",
            blog
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteBlog = async(req,res)=>{
    const {id} = req.params;
    const blog = await Blog.findById(id);
    if(!blog){
        res.status(404).json({
            message:"Blog not found"
        })
    }
    await blog.deleteOne();
    res.status(200).json({
        message:"Blog delete successfully"
    });
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: blogs.length,
            blogs
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getSingleBlog = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            message:"Invalid Blog id"
        });
    }
    const blog = await Blog.findById(id);
    if(!blog){
        return res.status(404).json({
            message:"Blog not found"
        });
    }
    res.status(200).json(blog);
}

export const myBlogs = async(req,res)=>{
    const createdBy = req.user._id;
    const myBlogs = await Blog.find({createdBy});

    res.status(200).json(myBlogs);
};

export const updateBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        // console.log("Blog ID = ", req.params.id);
        // console.log(blogId)

        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            req.body,
            {
                new: true,       // updated document return
                runValidators: true
            }
        );
        // console.log("updatedBlog: ",updatedBlog);

        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            blog: updatedBlog
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

