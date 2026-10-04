import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productname: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        quantity: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        sku: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true,
        },

        lowStockThreshold: {
            type: Number,
            default: 10,
            min: 0,
        },

        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        images:
            {
            type:[String],
            required:true
        }
    
    },
    {
        timestamps: true,
    }
);

export const Product = mongoose.model("Product", productSchema);