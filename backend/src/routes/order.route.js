import {authMiddleware} from "../middleware/Auth.middleware.js"
import { placeOrder } from "../controllers/order.controller.js"
import { Router } from "express";

const router = Router();

router.route("/").post(authMiddleware,
    placeOrder
)

export default router;
