import mongoose from "mongoose";

import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { Order } from "../models/order.model.js";

import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const placeOrder = async (req, res) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const {
            shippingAddress,
            paymentMethod = "COD",
        } = req.body;

       
        const requiredFields = [
            "fullName",
            "phone",
            "address",
            "city",
            "state",
            "pincode",
        ];

        if (
            !shippingAddress ||
            !requiredFields.every(
                (field) =>
                    typeof shippingAddress[field] === "string" &&
                    shippingAddress[field].trim().length > 0
            )
        ) {
            throw new ApiError(
                400,
                "Please provide complete shipping address"
            );
        }

       
        if (paymentMethod !== "COD") {
            throw new ApiError(
                400,
                "Invalid payment method"
            );
        }

       // find logged-in user cart
        const cart = await Cart.findOne({
            user: req.user._id,
        }).session(session);

        if (!cart || cart.items.length === 0) {
            throw new ApiError(400, "Your cart is empty");
        }

        
        const productIds = cart.items.map(
            (item) => item.product
        );

        const products = await Product.find({
            _id: { $in: productIds }, // find products whose id are in the form of productId
        }).session(session);

        const productMap = new Map(
            products.map((product) => [
                product._id.toString(),
                product,
            ])
        );

        
        let totalAmount = 0;
        const orderItems = [];

        for (const item of cart.items) {
            const product = productMap.get(
                item.product.toString()
            );

            if (!product) {
                throw new ApiError(
                    404,
                    "A product in your cart no longer exists"
                );
            }

            if (
                !Number.isInteger(item.quantity) ||
                item.quantity < 1
            ) {
                throw new ApiError(
                    400,
                    "Invalid product quantity"
                );
            }

            if (product.quantity < item.quantity) {
                throw new ApiError(
                    400,
                    `Insufficient stock for ${product.productname}. Available: ${product.quantity}`
                );
            }

            const price = Number(product.price);

            totalAmount += price * item.quantity;

           
            orderItems.push({
                product: product._id,
                productname: product.productname,
                price,
                quantity: item.quantity,
                image: product.images?.[0] || "",
            });
        }

        
        const [order] = await Order.create(
            [
                {
                    user: req.user._id,
                    items: orderItems,
                    shippingAddress,
                    paymentMethod: "COD",
                    paymentStatus: "Pending",
                    orderStatus: "Placed",
                    totalAmount,
                },
            ],
            { session }
        );
 
        for (const item of cart.items) {
            const updatedProduct =
                await Product.findOneAndUpdate(
                    {
                        _id: item.product,
                        quantity: { $gte: item.quantity },
                    },
                    {
                        $inc: {
                            quantity: -item.quantity,
                        },
                    },
                    {
                        new: true,
                        session,
                        runValidators: true,
                    }
                );

            if (!updatedProduct) {
                throw new ApiError(
                    409,
                    "Stock changed while placing your order. Please try again."
                );
            }
        }

        
        cart.items = [];
        cart.totalAmount = 0;

        await cart.save({ session });

        
        await session.commitTransaction();

        
        return res.status(201).json(
            new ApiResponse(
                201,
                "Order placed successfully",
                {
                    order,
                }
            )
        );

    } catch (error) {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }

        console.log("PLACE ORDER ERROR:", error);

        const statusCode = error.statusCode || 500;

        return res.status(statusCode).json(
            new ApiError(
                statusCode,
                error.message || "Unable to place order"
            )
        );

    } finally {
        await session.endSession();
    }
};

export { placeOrder };