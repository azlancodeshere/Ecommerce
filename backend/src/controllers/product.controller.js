import { Product } from "../models/product.model.js";
import fs from "fs/promises";
import path from "path";
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"

const createProduct = async (req,res) =>{

    try {

        const {productname, description, price, quantity, category, sku, lowStockThreshold} =req.body;

        const files = req.files;

        if(!productname || 
             price === undefined || 
              quantity === undefined ||
               !category || !sku ||
            !files ||
            files.length === 0
        ){
                throw new ApiError(
                    400,
                    "Productname, price, quantity, category and sku are required"
                );

               }

               const existingProduct = await Product.findOne(
                {admin:req.user._id,
                    $or:[
                        {productname},
                        {sku}
                    ]
                }
               )

               if(existingProduct){
                throw new ApiError(
                    409,
                    "product name or Sku is already exists"
                )
               }
        
               const imageUrls = files.map(
                (file) =>`/uploads/products/${file.filename}`
               )

               const product = await Product.create({
                productname,
                description,
                price,
                quantity,
                category,
                sku,
                lowStockThreshold,
                images:imageUrls,
                admin:req.user._id
               });


               return res.status(201).json(
                new ApiResponse(
                    201,
                    "Product created successfully",
                    product
                )
               )

        
    } catch (error) {

        return res.status(
            error.statusCode || 500
        ).json(
            new ApiError(
                error.statusCode || 500,
                error.message || "Something went wrong"
            )
        )
        
    }
}

const getSingleProduct = async (req,res) =>{

    try {

        //const { productId } = req.params;
        const product = await Product.findOne({
            _id:req.params.id, //_id: productId,
            admin:req.user._id
        })

        if(!product){
            throw new ApiError(
                404,
                "product is not found"
            )
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                "product fetched successfully",
                product
            )
        )
        
    } catch (error) {
         return res.status(
            error.statusCode || 500
        ).json(
            new ApiError(
                error.statusCode || 500,
                error.message || "Something went wrong"
            )
        )
    }
}

const getAllProducts = async (req,res) =>{
    try {
        // acces of all-products for all usrs and admin
        const products = await Product.find({}).sort({
            createdAt: -1
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                "products fetched successfully",
                products
            )
        )
        
    } catch (error) {
        return res.status(
            error.statusCode || 500,
            error.message || "something went wrong"
        )
        
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            _id: req.params.id,
            admin: req.user._id
        });

        if (!product) {
            throw new ApiError(
                404,
                "Product not found"
            );
        }

        console.log("PRODUCT IMAGES:", product.images);

        // Delete product images from uploads/products
        for (const image of product.images || []) {
            try {
                const filename = path.basename(image);

                const imagePath = path.join(
                    process.cwd(),
                    "uploads",
                    "products",
                    filename
                );


                await fs.unlink(imagePath);

            
            } catch (imageError) {
                console.log(
                    "Image delete error:",
                    imageError.message
                );

                // Image already missing hai to ignore karo
                if (imageError.code !== "ENOENT") {
                    throw imageError;
                }
            }
        }

        // Delete product from MongoDB
        await Product.deleteOne({
            _id: product._id
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                "Product and images deleted successfully",
                product
            )
        );

    } catch (error) {
        console.log("DELETE PRODUCT ERROR:", error);

        return res.status(
            error.statusCode || 500
        ).json(
            new ApiError(
                error.statusCode || 500,
                error.message || "Something went wrong"
            )
        );
    }
};

const updateProduct = async (req, res) => {
    try {
        ;

        const {
            productname,
            description,
            price,
            quantity,
            category,
            sku,
            lowStockThreshold,
            existingImages
        } = req.body;

        // Existing images that user wants to keep
        let keptImages = existingImages || [];

        // If only one image comes, convert it into array
        if (!Array.isArray(keptImages)) {
            keptImages = [keptImages];
        }

        // New uploaded images
        const newImages = (req.files || []).map(
            (file) => `/uploads/products/${file.filename}`
        );

        // Final images = old kept images + new images
        const finalImages = [
            ...keptImages,
            ...newImages
        ];

        const product = await Product.findOneAndUpdate(
            {
                _id: req.params.id,
                admin: req.user._id,
            },
            {
                $set: {
                    productname,
                    description,
                    price,
                    quantity,
                    category,
                    sku,
                    lowStockThreshold,
                    images: finalImages,
                },
            },
            {
                returnDocument: "after",
                runValidators: true,
            }
        );

        console.log("UPDATED PRODUCT:", product);

        if (!product) {
            throw new ApiError(
                404,
                "Product not found"
            );
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                "Product updated successfully",
                product
            )
        );

    } catch (error) {

        console.log(
            "UPDATE PRODUCT ERROR:",
            error
        );

        return res.status(
            error.statusCode || 500
        ).json(
            new ApiError(
                error.statusCode || 500,
                error.message || "Something went wrong"
            )
        );
    }
};


export {
    createProduct,
    getSingleProduct,
    getAllProducts,
    deleteProduct,
    updateProduct

}