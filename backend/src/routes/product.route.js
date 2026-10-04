import {Router} from "express"

import { createProduct, getAllProducts,getSingleProduct,updateProduct,deleteProduct } from "../controllers/product.controller.js"
import { authMiddleware} from "../middleware/Auth.middleware.js"
import { adminMiddleware } from "../middleware/admin.middleware.js";

const router = Router();

router.route("/create-product").post(
    authMiddleware,
    adminMiddleware,
    createProduct)

 
router.route("/single-product/:id").post(
    authMiddleware,
    adminMiddleware,
    getSingleProduct
)


router.route("/all-product").get(
    authMiddleware,
    adminMiddleware,
    getAllProducts
)

router.route("/update-product/:id").patch(
    authMiddleware,
    adminMiddleware,
    updateProduct

)

router.route("/delete-product/:id").delete(
    authMiddleware,
    adminMiddleware,
    deleteProduct
)

export default router