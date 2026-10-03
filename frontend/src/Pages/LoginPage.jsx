import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">

            <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8 md:p-10">

                {/* Heading */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                        Welcome Back
                    </h1>

                    <p className="text-gray-500 text-lg mt-3">
                        Login to your account
                    </p>
                </div>

                {/* Login Form */}
                <form className="space-y-6">

                    {/* Email */}
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-5 py-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-black focus:border-black text-lg"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-5 py-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-black focus:border-black text-lg"
                        />
                    </div>

                    {/* Forgot Password */}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="text-gray-600 hover:text-black font-medium"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-4 rounded-xl text-xl font-semibold hover:bg-gray-800 transition-all shadow-lg"
                    >
                        Login
                    </button>

                </form>

                {/* Register Link */}
                <div className="text-center mt-8 text-gray-500 text-lg">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-black font-bold hover:underline"
                    >
                        Create Account
                    </Link>
                </div>

            </div>

        </div>
    );
};

export default LoginPage;