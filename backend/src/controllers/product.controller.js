import { Product } from "../models/product.model.js";

import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"

const createProduct = async (req,res) =>{

    try {

        const {productname, description, price, quantity, category, sku, lowStockThreshold, images} =req.body;

        if(!productname || 
             price === undefined || 
              quantity === undefined ||
               !category || !sku ||
            !images ||
            images.length === 0
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


               const product = await Product.create({
                productname,
                description,
                price,
                quantity,
                category,
                sku,
                lowStockThreshold,
                images,
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
            _id:req.params._id, //_id: productId,
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
        const products = await Product.find({
            admin:req.user._id
        }).sort({
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

const deleteProduct = async (req,res) =>{
    try {
        const products = await Product.findOneAndDelete({
            _id:req.params._id,
            admin:req.user._id
        })

        if(!products){
            throw new ApiError(
                404,
                "Product not found"
            )
        }
       

        return res.status(200).json(
            new ApiResponse(
                200,
                "product deleted successfully"
            )
        )
        
    } catch (error) {

        return res.status(
            error.statusCode || 500
        ).json(
            new ApiError(
                error.statusCode || 500,
                error.message || "something went wrong"
            )
        )
        
    }
}

const updateProduct = async (req,res) =>{
    
    try {

        const {productId} = req.params;

        const product = await Product.findOneAndUpdate({

        
            _id:productId,
            admin:req.user._id
        },


       

//         product.price = price;
// product.quantity = quantity;
// product.category = category;

        req.body,

        {
     new :true,
     runValidators:true
        }

        );

        if(!product){
            throw new ApiError(
                404,
                "product not found"
            )
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                "producted updated sucessfully",
                product
            )
        )
        
    } catch (error) {

        return res.status(error.statusCode || 500).json(
            new ApiError(
                 error.statusCode || 500,
                error.message || "Something went wrong"
            )
        )
        
    }

}



export {
    createProduct,
    getSingleProduct,
    getAllProducts,
    deleteProduct,
    updateProduct

}