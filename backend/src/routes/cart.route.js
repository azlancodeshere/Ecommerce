import {Router} from "express"

import {authMiddleware} from "../middleware/Auth.middleware.js"
import {addToCart,getCart, updateCartQuantity} from "../controllers/cart.controller.js"


const router = Router()


router.route("/add").post(
   authMiddleware,
   addToCart
)

router.route("/").get(
    authMiddleware,
    getCart
);


router.route("/update").patch(
    authMiddleware,
    updateCartQuantity
);

export default router;
