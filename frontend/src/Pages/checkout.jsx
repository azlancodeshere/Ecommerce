import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMapPin, FiShoppingBag, FiCheckCircle } from "react-icons/fi";

import UserNavbar from "../Components/Navbar/UserNavbar";
import { CartContext } from "../context/CartContext";
import api from "../api/api.js";

const CheckoutPage = () => {
    const navigate = useNavigate();

    const { cart, getCart } = useContext(CartContext);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [placedOrder, setPlacedOrder] = useState(null);

    const [shippingAddress, setShippingAddress] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });

    useEffect(() => {
        getCart();
    }, []);

    const cartItems = cart?.items || [];

    const handleChange = (e) => {
        const { name, value } = e.target;

        setShippingAddress((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            setError("Your cart is empty.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await api.post("/orders", {
                shippingAddress,
                paymentMethod: "COD",
            });

            const responseData = response.data?.data;
            const order = responseData?.order ?? responseData;

            setPlacedOrder(order);

            // Navbar cart count refresh
            await getCart();

        } catch (err) {
            console.error("PLACE ORDER ERROR:", err);

            setError(
                err.response?.data?.message ||
                "Unable to place your order. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    // Order confirmation
    if (placedOrder) {
        return (
            <>
                <UserNavbar />

                <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">

                    <div className="max-w-lg w-full bg-white/90 rounded-3xl border border-rose-100 shadow-xl p-8 sm:p-12 text-center">

                        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white">
                            <FiCheckCircle className="text-4xl" />
                        </div>

                        <h1 className="text-3xl font-black text-rose-950 mt-6">
                            Order Placed!
                        </h1>

                        <p className="text-rose-600 mt-3">
                            Thank you for shopping with ShopCart.
                        </p>

                        <div className="mt-6 p-4 rounded-2xl bg-rose-50 text-left">
                            <p className="text-sm text-rose-500 font-semibold">
                                Order ID
                            </p>

                            <p className="font-bold text-rose-950 break-all mt-1">
                                {placedOrder._id}
                            </p>

                            <p className="text-sm text-rose-500 mt-4">
                                Payment Method
                            </p>

                            <p className="font-bold text-rose-950">
                                Cash on Delivery
                            </p>

                            <p className="text-sm text-rose-500 mt-4">
                                Order Total
                            </p>

                            <p className="text-2xl font-black text-orange-600">
                                ₹{Number(
                                    placedOrder.totalAmount
                                ).toLocaleString("en-IN")}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="w-full mt-7 py-4 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-black hover:from-rose-600 hover:to-orange-600 transition"
                        >
                            Continue Shopping
                        </button>

                    </div>

                </div>
            </>
        );
    }

    return (
        <>
            <UserNavbar />

            <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 py-10">

                <div className="max-w-7xl mx-auto px-4">

                    {/* Heading */}
                    <div className="mb-10">
                        <p className="text-sm uppercase tracking-[3px] text-rose-500 font-black">
                            Almost There
                        </p>

                        <h1 className="text-3xl sm:text-4xl font-black text-rose-950 mt-2">
                            Checkout
                        </h1>

                        <p className="text-rose-500/70 mt-2">
                            Enter your delivery details to place your order.
                        </p>
                    </div>

                    {cartItems.length === 0 ? (

                        <div className="bg-white/80 rounded-3xl border border-rose-100 shadow-lg p-10 text-center">

                            <FiShoppingBag className="text-5xl text-rose-400 mx-auto" />

                            <h2 className="text-2xl font-black text-rose-950 mt-5">
                                Your cart is empty
                            </h2>

                            <button
                                type="button"
                                onClick={() => navigate("/")}
                                className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold"
                            >
                                Continue Shopping
                            </button>

                        </div>

                    ) : (

                        <form
                            onSubmit={handlePlaceOrder}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                        >

                            {/* Delivery Address */}
                            <div className="lg:col-span-2 bg-white/85 rounded-3xl border border-rose-100 shadow-lg p-6 sm:p-8">

                                <div className="flex items-center gap-3 mb-7">

                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-400 flex items-center justify-center text-white">
                                        <FiMapPin className="text-xl" />
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-black text-rose-950">
                                            Delivery Address
                                        </h2>

                                        <p className="text-sm text-rose-400">
                                            Where should we deliver your order?
                                        </p>
                                    </div>

                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                                    {/* Full Name */}
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-bold text-rose-950 mb-2">
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            name="fullName"
                                            value={shippingAddress.fullName}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-rose-100 bg-rose-50/50 outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-bold text-rose-950 mb-2">
                                            Phone Number
                                        </label>

                                        <input
                                            type="tel"
                                            name="phone"
                                            value={shippingAddress.phone}
                                            onChange={handleChange}
                                            placeholder="10-digit mobile number"
                                            pattern="[0-9]{10}"
                                            maxLength={10}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-rose-100 bg-rose-50/50 outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                                        />
                                    </div>

                                    {/* PIN Code */}
                                    <div>
                                        <label className="block text-sm font-bold text-rose-950 mb-2">
                                            PIN Code
                                        </label>

                                        <input
                                            type="text"
                                            name="pincode"
                                            value={shippingAddress.pincode}
                                            onChange={handleChange}
                                            placeholder="6-digit PIN code"
                                            pattern="[0-9]{6}"
                                            maxLength={6}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-rose-100 bg-rose-50/50 outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                                        />
                                    </div>

                                    {/* Address */}
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-bold text-rose-950 mb-2">
                                            House / Street Address
                                        </label>

                                        <textarea
                                            name="address"
                                            value={shippingAddress.address}
                                            onChange={handleChange}
                                            placeholder="House number, street, area..."
                                            rows={3}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-rose-100 bg-rose-50/50 outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100 resize-y"
                                        />
                                    </div>

                                    {/* City */}
                                    <div>
                                        <label className="block text-sm font-bold text-rose-950 mb-2">
                                            City
                                        </label>

                                        <input
                                            type="text"
                                            name="city"
                                            value={shippingAddress.city}
                                            onChange={handleChange}
                                            placeholder="Enter city"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-rose-100 bg-rose-50/50 outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                                        />
                                    </div>

                                    {/* State */}
                                    <div>
                                        <label className="block text-sm font-bold text-rose-950 mb-2">
                                            State
                                        </label>

                                        <input
                                            type="text"
                                            name="state"
                                            value={shippingAddress.state}
                                            onChange={handleChange}
                                            placeholder="Enter state"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-rose-100 bg-rose-50/50 outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
                                        />
                                    </div>

                                </div>

                                {/* Payment */}
                                <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-100">

                                    <p className="text-sm font-bold text-rose-950">
                                        Payment Method
                                    </p>

                                    <p className="text-rose-600 font-semibold mt-2">
                                        Cash on Delivery (COD)
                                    </p>

                                    <p className="text-sm text-rose-400 mt-1">
                                        Pay when your order arrives.
                                    </p>

                                </div>

                                {/* Error */}
                                {error && (
                                    <div
                                        role="alert"
                                        className="mt-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-semibold"
                                    >
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full mt-7 py-4 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-black shadow-lg shadow-rose-200 hover:from-rose-600 hover:to-orange-600 transition disabled:opacity-60"
                                >
                                    {loading
                                        ? "Placing Order..."
                                        : "Place Order"}
                                </button>

                            </div>

                            {/* Order Summary */}
                            <div className="bg-white/85 rounded-3xl border border-rose-100 shadow-lg p-6 h-fit">

                                <h2 className="text-xl font-black text-rose-950">
                                    Order Summary
                                </h2>

                                <div className="mt-6 space-y-4">

                                    {cartItems.map((item, index) => (

                                        <div
                                            key={
                                                item.product?._id ||
                                                `${item.product?.productname}-${index}`
                                            }
                                            className="flex items-start gap-3"
                                        >

                                            <div className="w-16 h-16 rounded-xl bg-rose-50 overflow-hidden shrink-0">

                                                {item.product?.images?.[0] && (
                                                    <img
                                                        src={`http://localhost:5000/${item.product.images[0].replace(/^\/+/, "")}`}
                                                        alt={item.product.productname}
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}

                                            </div>

                                            <div className="flex-1 min-w-0">

                                                <p className="font-bold text-rose-950 text-sm line-clamp-2">
                                                    {item.product?.productname || "Product"}
                                                </p>

                                                <p className="text-xs text-rose-400 mt-1">
                                                    Quantity: {item.quantity}
                                                </p>

                                                <p className="text-sm font-black text-orange-600 mt-1">
                                                    ₹{(
                                                        Number(item.product?.price || 0) *
                                                        item.quantity
                                                    ).toLocaleString("en-IN")}
                                                </p>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                                <div className="border-t border-rose-100 mt-6 pt-5 space-y-4">

                                    <div className="flex justify-between text-rose-700">
                                        <span>Total Items</span>

                                        <span className="font-bold">
                                            {cart?.totalItems ??
                                                cartItems.reduce(
                                                    (total, item) =>
                                                        total + item.quantity,
                                                    0
                                                )}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center gap-3">
                                        <span className="text-rose-700">
                                            Total Amount
                                        </span>

                                        <span className="text-2xl font-black text-orange-600">
                                            ₹{Number(
                                                cart?.totalAmount ??
                                                cartItems.reduce(
                                                    (total, item) =>
                                                        total +
                                                        Number(item.product?.price || 0) *
                                                        item.quantity,
                                                    0
                                                )
                                            ).toLocaleString("en-IN")}
                                        </span>
                                    </div>

                                </div>

                                <p className="text-xs text-rose-400 mt-5">
                                    Your order total will be validated again by the server before the order is placed.
                                </p>

                            </div>

                        </form>

                    )}

                </div>

            </div>
        </>
    );
};

export default CheckoutPage;