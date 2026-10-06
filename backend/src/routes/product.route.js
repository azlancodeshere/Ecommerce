import {Router} from "express"

import { createProduct, getAllProducts,getSingleProduct,updateProduct,deleteProduct } from "../controllers/product.controller.js"
import { authMiddleware} from "../middleware/Auth.middleware.js"
import { adminMiddleware } from "../middleware/admin.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/create-product").post(
    authMiddleware,
    adminMiddleware,
    upload.array("images", 5),
    createProduct)

 
router.route("/single-product/:id").get(
    authMiddleware,
    adminMiddleware,
    getSingleProduct
)

router.route("/all-products").get(
    authMiddleware,
    adminMiddleware,
    getAllProducts
)

router.route("/update-product/:id").patch(
    authMiddleware,
    adminMiddleware,
    upload.array("images", 5),
    updateProduct

)

router.route("/delete-product/:id").delete(
    authMiddleware,
    adminMiddleware,
    deleteProduct
)

export default router