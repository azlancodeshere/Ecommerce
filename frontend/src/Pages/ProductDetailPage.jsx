import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ProductConext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";

import {
    FiShoppingCart,
    FiArrowLeft,
    FiHeart,
} from "react-icons/fi";

import UserNavbar from "../Components/Navbar/UserNavbar";
import api from "../api/api.js";

const ProductDetailPage = () => {
    const [quantity, setQuantity] = useState(1);

    const { id } = useParams();
    const navigate = useNavigate();

    const { products } = useContext(ProductConext);
    const { getCart } = useContext(CartContext);

    const product = products.find(
        (item) => item._id === id
    );

    const handleToCart = async () => {
        try {
            const response = await api.post("/cart/add", {
                productId: product._id,
                quantity: quantity,
            });

            console.log(
                "PRODUCT ADDED TO CART:",
                response.data
            );

           
            await getCart();

            alert("Product added to cart successfully");

        } catch (error) {
            console.log("ADD TO CART ERROR:", error);

            console.log(
                "ERROR RESPONSE:",
                error.response?.data
            );

            alert(
                error.response?.data?.message ||
                "Failed to add product to cart"
            );
        }
    };

    if (!product) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center">
                <div className="text-center bg-white/80 backdrop-blur-md p-10 rounded-3xl border border-rose-100 shadow-xl">

                    <h1 className="text-2xl font-black text-rose-950">
                        Product not found
                    </h1>

                    <button
                        onClick={() => navigate(-1)}
                        className="mt-5 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold hover:scale-105 transition"
                    >
                        Go Back
                    </button>

                </div>
            </div>
        );
    }

    const similarProducts = products
        .filter((item) => item._id !== product._id)
        .filter(
            (item) =>
                item.category?.toLowerCase() ===
                product.category?.toLowerCase()
        )
        .sort((a, b) => {

            const priceDifferenceA =
                Math.abs(
                    Number(a.price) -
                    Number(product.price)
                );

            const priceDifferenceB =
                Math.abs(
                    Number(b.price) -
                    Number(product.price)
                );

            return priceDifferenceA - priceDifferenceB;
        })
        .slice(0, 8);

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 py-10">

            <UserNavbar />

            <div className="max-w-7xl mx-auto px-4">
                {/* Back */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-rose-600 hover:text-orange-500 font-bold mb-8 transition"
                >
                    <FiArrowLeft />
                    Back
                </button>

               
                <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-rose-100 shadow-xl shadow-rose-100/50 overflow-hidden">

                    <div className="grid grid-cols-1 lg:grid-cols-2">

                       
                        <div className="h-[500px] bg-gradient-to-br from-rose-100 via-pink-100 to-orange-100 overflow-hidden">

                            {product.images?.[0] ? (
                                <img
                                    src={`http://localhost:5000/${product.images[0].replace(
                                        /^\/+/,
                                        ""
                                    )}`}
                                    alt={product.productname}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-rose-400">
                                    No Image
                                </div>
                            )}

                        </div>

                       
                        <div className="p-8 lg:p-12">

                            <p className="text-sm uppercase tracking-[3px] text-rose-500 font-black">
                                {product.category}
                            </p>

                            <h1 className="text-3xl lg:text-4xl font-black text-rose-950 mt-3">
                                {product.productname}
                            </h1>

                            <p className="text-3xl font-black text-orange-600 mt-6">
                                ₹{Number(product.price).toLocaleString("en-IN")}
                            </p>

                            <p className="text-rose-700/70 mt-6 leading-7">
                                {product.description}
                            </p>

                           
                            <div className="mt-6">

                                {product.quantity === 0 ? (
                                    <span className="inline-flex px-4 py-2 rounded-full bg-red-100 text-red-600 font-bold">
                                        Out of Stock
                                    </span>
                                ) : (
                                    <span className="inline-flex px-4 py-2 rounded-full bg-emerald-100 text-emerald-600 font-bold">
                                        Stock: {product.quantity}
                                    </span>
                                )}

                            </div>

                           
                            <div className="mt-6">

                                <p className="font-bold text-rose-950 mb-2">
                                    Quantity
                                </p>

                                <div className="flex items-center gap-4">

                                    
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setQuantity((prev) =>
                                                Math.max(1, prev - 1)
                                            )
                                        }
                                        className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 font-bold hover:bg-rose-200 transition"
                                    >
                                        -
                                    </button>

                                   
                                    <span className="font-black text-rose-950 min-w-[20px] text-center">
                                        {quantity}
                                    </span>

                                   
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setQuantity((prev) =>
                                                Math.min(
                                                    product.quantity,
                                                    prev + 1
                                                )
                                            )
                                        }
                                        disabled={
                                            quantity >= product.quantity
                                        }
                                        className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 font-bold hover:bg-orange-200 transition disabled:opacity-50"
                                    >
                                        +
                                    </button>

                                </div>

                            </div>

                           
                            <div className="flex gap-4 mt-8">

                                
                                <button
                                    type="button"
                                    onClick={handleToCart}
                                    disabled={product.quantity === 0}
                                    className="flex-1 py-4 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-black flex items-center justify-center gap-2 shadow-lg shadow-rose-200 hover:from-rose-600 hover:to-orange-600 transition disabled:opacity-50"
                                >
                                    <FiShoppingCart />
                                    Add to Cart
                                </button>

                               
                                <button
                                    type="button"
                                    className="w-14 rounded-xl bg-pink-100 text-rose-500 border border-pink-200 flex items-center justify-center hover:bg-rose-100 hover:scale-105 transition"
                                >
                                    <FiHeart />
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

               
                <div className="mt-16">

                    <p className="text-sm uppercase tracking-[3px] text-rose-500 font-black">
                        You May Also Like
                    </p>

                    <h2 className="text-3xl font-black text-rose-950 mt-2 mb-8">
                        Similar Products
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {similarProducts.map((item) => (

                            <div
                                key={item._id}
                                onClick={() =>
                                    navigate(`/product/${item._id}`)
                                }
                                className="bg-white/80 backdrop-blur-md rounded-2xl border border-rose-100 overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-rose-100/60 hover:-translate-y-1 transition-all duration-300"
                            >

                                
                                <div className="h-64 bg-gradient-to-br from-rose-50 to-orange-50 overflow-hidden">

                                    {item.images?.[0] ? (
                                        <img
                                            src={`http://localhost:5000/${item.images[0].replace(
                                                /^\/+/,
                                                ""
                                            )}`}
                                            alt={item.productname}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-rose-400">
                                            No Image
                                        </div>
                                    )}

                                </div>

                               
                                <div className="p-5">

                                    <p className="text-xs text-rose-400 uppercase font-bold">
                                        {item.category}
                                    </p>

                                    <h3 className="font-bold text-rose-950 mt-2 line-clamp-2">
                                        {item.productname}
                                    </h3>

                                    <div className="flex justify-between items-center mt-4">

                                        <p className="text-xl font-black text-orange-600">
                                            ₹{Number(item.price).toLocaleString("en-IN")}
                                        </p>

                                        <p className="text-sm text-emerald-600 font-bold">
                                            Stock: {item.quantity}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ProductDetailPage;