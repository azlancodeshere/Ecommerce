import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;

        
        if (!productId) {
            throw new ApiError(400, "Product ID is required");
        }

      
        if (quantity < 1) {
            throw new ApiError(400, "Quantity must be at least 1");
        }

        
        const product = await Product.findById(productId);

        if (!product) {
            throw new ApiError(404, "Product not found");
        }

       
        if (product.quantity < quantity) {
            throw new ApiError(
                400,
                `Only ${product.quantity} items available`
            );
        }

        // find current user cart
        let cart = await Cart.findOne({
            user: req.user._id
        });

        // if cart not available then new cart
        if (!cart) {
            cart = await Cart.create({
                user: req.user._id,
                items: [
                    {
                        product: productId,
                        quantity: quantity
                    }
                ]
            });
        } else {

           // checking product is in cart
            const existingItem = cart.items.find(
                (item) =>
                    item.product.toString() === productId.toString()
            );

            if (existingItem) {

                // Existing quantity + new quantity
                const newQuantity =
                    existingItem.quantity + quantity;

                // 8. Total stock se zyada na ho
                if (newQuantity > product.quantity) {
                    throw new ApiError(
                        400,
                        `Only ${product.quantity} items available`
                    );
                }

                existingItem.quantity = newQuantity;

            } else {

               //adding new product at cart
                cart.items.push({
                    product: productId,
                    quantity: quantity
                });
            }

            await cart.save();
        }

      
        await cart.populate("items.product");

        
        cart.totalAmount = cart.items.reduce(
            (total, item) => {
                return total + (
                    Number(item.product.price) *
                    item.quantity
                );
            },
            0
        );

        await cart.save();

        return res.status(200).json(
            new ApiResponse(
                200,
                "Product added to cart successfully",
                cart
            )
        );

    } catch (error) {

        console.log("ADD TO CART ERROR:", error);

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
    addToCart
};