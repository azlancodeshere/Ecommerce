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