import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import api from "../api/api.js";
import { AuthContext } from "../context/AuthContext.jsx";

import {
    FiShoppingBag,
    FiPackage,
    FiHeart,
    FiShield,
    FiArrowRight
} from "react-icons/fi";


const LoginPage = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const { setUser, setIsAuthenticated } = useContext(AuthContext);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await api.post("/users/login", formData);

        console.log("Login successful:", response.data);

        const loggedInUser = response.data.data.user;

        console.log("LOGGED IN USER:", loggedInUser);
        console.log("ROLE:", loggedInUser.role);

        setUser(loggedInUser);
        setIsAuthenticated(true);

        if (loggedInUser.role === "admin") {
            navigate("/admin", { replace: true });
        } else {
            navigate("/home", { replace: true });
        }

    } catch (error) {
        console.error("Login error:", error);
        setIsAuthenticated(false);
    }
};

    return (

        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50 flex items-center justify-center px-4 py-8 md:py-12">




            <div className="w-full max-w-6xl bg-white rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.10)] overflow-hidden flex flex-col lg:flex-row">




                <div className="hidden lg:flex lg:w-[48%] relative overflow-hidden bg-gradient-to-br from-rose-500 via-pink-500 to-orange-400 text-white p-10 xl:p-14 flex-col justify-between">




                    <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10" />

                    <div className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-white/10" />

                    <div className="absolute top-1/2 -right-16 w-32 h-32 rounded-full bg-white/10" />


                    <div className="relative z-10">




                        <div className="flex items-center gap-3 mb-16">

                            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">

                                <FiShoppingBag className="text-2xl" />

                            </div>


                            <div>

                                <h2 className="text-2xl font-extrabold tracking-tight">

                                    Shop<span className="text-yellow-200">
                                        Cart
                                    </span>

                                </h2>

                                <p className="text-white/70 text-xs">
                                    Everything you love
                                </p>

                            </div>

                        </div>




                        <div>

                            <p className="uppercase tracking-[4px] text-white/70 text-sm font-semibold mb-4">
                                Welcome Back
                            </p>


                            <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight">

                                Good to
                                <br />

                                see you
                                <br />

                                <span className="text-yellow-200">
                                    again.
                                </span>

                            </h1>


                            <p className="mt-6 text-white/80 text-lg leading-8 max-w-md">

                                Login to continue your shopping journey
                                and discover products you'll love.

                            </p>

                        </div>




                        <div className="mt-12 space-y-5">




                            <div className="flex items-center gap-4">

                                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">

                                    <FiPackage className="text-xl" />

                                </div>


                                <div>

                                    <p className="font-bold">
                                        Discover Products
                                    </p>

                                    <p className="text-sm text-white/65">
                                        Find products made for you
                                    </p>

                                </div>

                            </div>




                            <div className="flex items-center gap-4">

                                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">

                                    <FiHeart className="text-xl" />

                                </div>


                                <div>

                                    <p className="font-bold">
                                        Your Favorites
                                    </p>

                                    <p className="text-sm text-white/65">
                                        Everything you love in one place
                                    </p>

                                </div>

                            </div>




                            <div className="flex items-center gap-4">

                                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">

                                    <FiShield className="text-xl" />

                                </div>


                                <div>

                                    <p className="font-bold">
                                        Secure Account
                                    </p>

                                    <p className="text-sm text-white/65">
                                        Your account stays protected
                                    </p>

                                </div>

                            </div>


                        </div>

                    </div>




                    <div className="relative z-10 mt-10">

                        <div className="rounded-3xl bg-white/10 backdrop-blur-sm border border-white/10 p-6">

                            <div className="flex items-center justify-center gap-6">

                                <FiShoppingBag className="text-4xl" />

                                <FiPackage className="text-4xl" />

                                <FiHeart className="text-4xl" />

                            </div>


                            <p className="text-center text-white/70 text-sm mt-4">

                                Your next favorite item is waiting

                            </p>

                        </div>

                    </div>


                </div>




                <div className="w-full lg:w-[52%] px-6 py-8 sm:px-10 md:px-14 lg:px-12 xl:px-16 flex flex-col justify-center">




                    <div className="lg:hidden flex items-center justify-center gap-2 mb-10">

                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 to-orange-400 flex items-center justify-center text-white">

                            <FiShoppingBag className="text-xl" />

                        </div>


                        <h2 className="text-2xl font-extrabold text-gray-900">

                            Shop<span className="text-rose-500">
                                Cart
                            </span>

                        </h2>

                    </div>




                    <div className="mb-9">

                        <p className="text-rose-500 font-semibold text-sm uppercase tracking-wider mb-2">

                            Welcome Back

                        </p>


                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">

                            Login to your account

                        </h1>


                        <p className="text-gray-500 mt-3 text-base">

                            Enter your details to continue shopping.

                        </p>

                    </div>




                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >




                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">

                                Email Address

                            </label>


                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                value={formData.email}
                                placeholder="Enter your email"
                                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all focus:bg-white focus:border-rose-400 focus:ring-4 focus:ring-rose-100 placeholder:text-gray-400"
                            />

                        </div>


                        {/* Password */}

                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">

                                Password

                            </label>


                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                value={formData.password}
                                placeholder="Enter your password"
                                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all focus:bg-white focus:border-rose-400 focus:ring-4 focus:ring-rose-100 placeholder:text-gray-400"
                            />

                        </div>




                        <div className="flex justify-end">

                            <button
                                type="button"
                                className="text-sm font-semibold text-rose-500 hover:text-rose-600 transition-colors"
                            >
                                Forgot Password?
                            </button>

                        </div>




                        <button
                            type="submit"
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 text-white font-bold text-lg shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2"
                        >

                            Login

                            <FiArrowRight />

                        </button>


                    </form>




                    <div className="relative flex items-center my-8">

                        <div className="flex-1 border-t border-gray-200"></div>

                        <span className="px-4 text-sm text-gray-400 bg-white">

                            New to ShopCart?

                        </span>

                        <div className="flex-1 border-t border-gray-200"></div>

                    </div>




                    <p className="text-center text-gray-500 text-sm">

                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="font-bold text-rose-500 hover:text-rose-600 transition-colors inline-flex items-center gap-1"
                        >

                            Create Account

                            <FiArrowRight className="text-sm" />

                        </Link>

                    </p>


                </div>

            </div>

        </div>

    );

};


export default LoginPage;