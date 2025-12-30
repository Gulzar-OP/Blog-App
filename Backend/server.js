import express from 'express';
import dotenv from 'dotenv';
import { ConnectDB } from './Database/DB.js';
import userRoutes from './routes/user.route.js';
import blogRoutes from './routes/blog.route.js';
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ================= SECURITY MIDDLEWARE =================
app.use(helmet()); // Security headers

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: { message: 'Too many requests from this IP' }
});
app.use(limiter);

// ================= CORS =================
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// ================= BODY PARSERS =================
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ================= FILE UPLOAD =================
// Fixed for your controllers expecting req.files (user) and req.file (blog)
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './tmp/',
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    abortOnLimit: true,
    preserveExtension: true,
    safeFileNames: true
}));

// Ensure tmp directory exists
import fs from 'fs';
if (!fs.existsSync('./tmp/')) {
    fs.mkdirSync('./tmp/', { recursive: true });
}

// ================= CLOUDINARY =================
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// ================= ROUTES =================
app.get('/', (req, res) => {
    res.json({ message: 'Blog API Server Running!' });
});

app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);

// ================= ERROR HANDLING =================
app.use((err, req, res, next) => {
    console.error('Global error:', err);
    
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File too large. Max 5MB' });
    }
    
    res.status(500).json({ message: 'Something went wrong!' });
});

// ================= 404 HANDLER =================
app.get((req, res) => {
  res.status(404).json({ message: "Route not found" });
});


const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await ConnectDB();
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📱 Frontend: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    process.exit(0);
});
