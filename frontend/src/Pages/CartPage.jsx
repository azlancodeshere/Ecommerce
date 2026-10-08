import React, { useContext, useEffect } from "react";
import {
    FiMinus,
    FiPlus,
    FiTrash2,
    FiShoppingCart
} from "react-icons/fi";

import UserNavbar from "../Components/Navbar/UserNavbar";
import { CartContext } from "../context/CartContext";
import api from "../api/api.js";

const CartPage = () => {

    const { cart, getCart } = useContext(CartContext);

    useEffect(() => {
        getCart();
    }, []);

    const cartItems = cart?.items || [];

    
    const updateQuantity = async (productId, newQuantity) => {
        try {

            const response = await api.patch("/cart/update", {
                productId,
                quantity: newQuantity,
            });

            console.log("UPDATED CART:", response.data);

           
            await getCart();

        } catch (error) {

            console.log("UPDATE QUANTITY ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Unable to update quantity"
            );
        }
    };

    return (
        <>
            <UserNavbar />

            <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 py-10">

                <div className="max-w-7xl mx-auto px-4">

                   
                    <div className="mb-10">

                        <p className="text-sm uppercase tracking-[3px] text-rose-500 font-black">
                            Shopping Bag
                        </p>

                        <h1 className="text-3xl sm:text-4xl font-black text-rose-950 mt-2">
                            Your Cart
                        </h1>

                        <p className="text-rose-500/70 mt-2">
                            {cart?.totalItems || 0} items in your cart
                        </p>

                    </div>

                   
                    {cartItems.length === 0 ? (

                        <div className="bg-white/80 rounded-3xl border border-rose-100 shadow-lg p-12 text-center">

                            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white">
                                <FiShoppingCart className="text-3xl" />
                            </div>

                            <h2 className="text-2xl font-black text-rose-950 mt-5">
                                Your cart is empty
                            </h2>

                            <p className="text-rose-400 mt-2">
                                Add some products to see them here.
                            </p>

                        </div>

                    ) : (

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                           
                            <div className="lg:col-span-2 space-y-4">

                                {cartItems.map((item) => {

                                    const product = item.product;
                                    const productId = product._id;

                                    return (
                                        <div
                                            key={productId}
                                            className="bg-white/80 backdrop-blur-md rounded-2xl border border-rose-100 p-5 shadow-sm"
                                        >

                                            <div className="flex flex-col sm:flex-row gap-5">

                                               
                                                <div className="w-full sm:w-32 h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-rose-50 to-orange-50 shrink-0">

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

                                                
                                                <div className="flex-1">

                                                    <p className="text-xs uppercase tracking-wider text-rose-400 font-bold">
                                                        {product.category}
                                                    </p>

                                                    <h2 className="text-lg font-black text-rose-950 mt-1">
                                                        {product.productname}
                                                    </h2>

                                                    <p className="text-orange-600 font-black text-xl mt-2">
                                                        ₹{Number(
                                                            product.price
                                                        ).toLocaleString("en-IN")}
                                                    </p>

                                                   
                                                    <div className="flex items-center gap-3 mt-4">

                                                       
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    productId,
                                                                    Math.max(
                                                                        1,
                                                                        item.quantity - 1
                                                                    )
                                                                )
                                                            }
                                                            disabled={item.quantity <= 1}
                                                            className="w-9 h-9 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center hover:bg-rose-200 transition disabled:opacity-40"
                                                        >
                                                            <FiMinus />
                                                        </button>

                                                     
                                                        <span className="font-black text-rose-950 min-w-[30px] text-center">
                                                            {item.quantity}
                                                        </span>

                                                       
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    productId,
                                                                    Math.min(
                                                                        product.quantity,
                                                                        item.quantity + 1
                                                                    )
                                                                )
                                                            }
                                                            disabled={
                                                                item.quantity >=
                                                                product.quantity
                                                            }
                                                            className="w-9 h-9 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center hover:bg-orange-200 transition disabled:opacity-40"
                                                        >
                                                            <FiPlus />
                                                        </button>

                                                    </div>

                                                    <p className="text-xs text-emerald-600 font-semibold mt-2">
                                                        Available stock: {product.quantity}
                                                    </p>

                                                </div>

                                                
                                                <button
                                                    type="button"
                                                    className="self-start text-rose-400 hover:text-red-500 transition"
                                                >
                                                    <FiTrash2 />
                                                </button>

                                            </div>

                                        </div>
                                    );
                                })}

                            </div>

                           
                            <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-rose-100 p-6 h-fit shadow-lg">

                                <h2 className="text-xl font-black text-rose-950">
                                    Cart Summary
                                </h2>

                                <div className="flex justify-between mt-6 text-rose-700">
                                    <span>Total Items</span>

                                    <span className="font-bold">
                                        {cart?.totalItems || 0}
                                    </span>
                                </div>

                                <div className="flex justify-between mt-4">

                                    <span className="text-rose-700">
                                        Total Amount
                                    </span>

                                    <span className="text-2xl font-black text-orange-600">
                                        ₹{Number(
                                            cart?.totalAmount || 0
                                        ).toLocaleString("en-IN")}
                                    </span>

                                </div>

                                <button
                                    type="button"
                                    className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-black hover:from-rose-600 hover:to-orange-600 transition"
                                >
                                    Proceed to Checkout
                                </button>

                            </div>

                        </div>
                    )}

                </div>

            </div>
        </>
    );
};

export default CartPage;