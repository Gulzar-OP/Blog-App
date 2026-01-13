import express from "express";
import {
  getNotifications,
  createNotification,
  markAsRead,
  markAllAsRead,
  // getAllNotifications,
  // getUnreadNotifications
} from "../controllers/notification.controller.js";
import { isAuthenticated } from "../middlewares/authUser.js";

const router = express.Router();

router.get("/", isAuthenticated, getNotifications);
// router.get("/unread", isAuthenticated, getUnreadNotifications);
// router.get("/all-notification", isAuthenticated, getAllNotifications);
router.post("/", isAuthenticated, createNotification);
router.patch("/mark-all-read", isAuthenticated, markAllAsRead);
router.patch("/:id/read", isAuthenticated, markAsRead);

export default router;
