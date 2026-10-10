import { Router } from "express";
import { getDashboardStats,getRevenueAnalytics,getRecentOrders, } from "../controllers/dashboard.controller.js";
import { authMiddleware } from "../middleware/Auth.middleware.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";

const router = Router();

router.get(
    "/stats",
    authMiddleware,
    adminMiddleware,
    getDashboardStats
);

router.get(
    "/revenue",
    authMiddleware,
    adminMiddleware,
    getRevenueAnalytics
);


router.get(
    "/recent-orders",
    authMiddleware,
    adminMiddleware,
    getRecentOrders
);

export default router;