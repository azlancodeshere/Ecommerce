import React, { useState, useContext } from "react";
import api from "../api/api.js";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

import {
  FiShoppingBag,
  FiGift,
  FiTruck,
  FiLock,
  FiUser,
  FiShield,
  FiPackage,
  FiArrowRight,
} from "react-icons/fi";

function RegisterPage() {
  const [role, setRole] = useState("user");

  const navigate = useNavigate();

  const { setUser, setIsAuthenticated } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Password does not match with confirm password");
      return;
    }

    try {
      console.log("REGISTER API CALL STARTED");

      const response = await api.post("/users/register", {
        ...formData,
        role,
      });

      console.log(response.data);

      setUser(response.data.data);
      setIsAuthenticated(true);

      navigate("/home", {
        replace: true,
      });
    } catch (error) {
      console.error("Error during registration:", error);

      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50 flex items-center justify-center px-4 py-8 md:py-12">
      <div className="w-full max-w-6xl bg-white rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.10)] overflow-hidden flex flex-col lg:flex-row">

        


        <div className="hidden lg:flex lg:w-[42%] relative overflow-hidden bg-gradient-to-br from-rose-500 via-pink-500 to-orange-400 text-white p-10 xl:p-14 flex-col justify-between">

          
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10" />
          <div className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-white/10" />
          <div className="absolute top-1/2 -right-16 w-32 h-32 rounded-full bg-white/10" />

          <div className="relative z-10">

          
            <div className="flex items-center gap-3 mb-14">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl">
                <FiShoppingBag />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold tracking-tight">
                  Shop<span className="text-yellow-200">Cart</span>
                </h2>

                <p className="text-white/70 text-xs">
                  Everything you love
                </p>
              </div>
            </div>

           


            <div>
              <p className="uppercase tracking-[4px] text-white/70 text-sm font-semibold mb-4">
                Welcome to ShopCart
              </p>

              <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight">
                Your style.
                <br />
                Your choice.
                <br />
                <span className="text-yellow-200">
                  Your shopping.
                </span>
              </h1>

              <p className="mt-6 text-white/80 text-lg leading-8 max-w-md">
                Create your account and discover amazing products,
                exclusive deals and a better shopping experience.
              </p>
            </div>

          
            <div className="mt-10 space-y-5">

             
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center text-xl">
                  <FiGift />
                </div>

                <div>
                  <p className="font-bold">
                    Exclusive Deals
                  </p>

                  <p className="text-sm text-white/65">
                    Special offers & discounts
                  </p>
                </div>
              </div>

            
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center text-xl">
                  <FiTruck />
                </div>

                <div>
                  <p className="font-bold">
                    Fast Delivery
                  </p>

                  <p className="text-sm text-white/65">
                    Products at your doorstep
                  </p>
                </div>
              </div>

            
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center text-xl">
                  <FiLock />
                </div>

                <div>
                  <p className="font-bold">
                    Secure Shopping
                  </p>

                  <p className="text-sm text-white/65">
                    Safe & secure checkout
                  </p>
                </div>
              </div>

            </div>
          </div>

         
          <div className="relative z-10 mt-10">
            <div className="rounded-3xl bg-white/10 backdrop-blur-sm border border-white/10 p-6">

              <div className="flex items-center justify-center gap-8 text-5xl">
                <FiShoppingBag />
                <FiPackage />
                <FiUser />
              </div>

              <p className="text-center text-white/70 text-sm mt-4">
                Find something you'll love
              </p>

            </div>
          </div>
        </div>

      
        <div className="w-full lg:w-[58%] px-6 py-8 sm:px-10 md:px-14 lg:px-12 xl:px-16">

          
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">

            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 to-orange-400 flex items-center justify-center text-xl text-white">
              <FiShoppingBag />
            </div>

            <h2 className="text-2xl font-extrabold text-gray-900">
              Shop<span className="text-rose-500">Cart</span>
            </h2>

          </div>

         

          <div className="mb-8">
            <p className="text-rose-500 font-semibold text-sm uppercase tracking-wider mb-2">
              Get Started
            </p>

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Create Account
            </h1>

            <p className="text-gray-500 mt-2 text-base">
              Create your account and start shopping with us.
            </p>
          </div>

         
          <div className="mb-7">

            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Register As
            </label>

            <div className="grid grid-cols-2 gap-3">

            
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`group py-4 px-4 rounded-xl border-2 font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  role === "user"
                    ? "bg-gradient-to-r from-rose-500 to-orange-400 text-white border-transparent shadow-lg shadow-rose-200"
                    : "bg-white text-gray-600 border-gray-200 hover:border-rose-300 hover:bg-rose-50"
                }`}
              >
                <FiUser className="text-lg" />
                User
              </button>

             
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`group py-4 px-4 rounded-xl border-2 font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  role === "admin"
                    ? "bg-gradient-to-r from-rose-500 to-orange-400 text-white border-transparent shadow-lg shadow-rose-200"
                    : "bg-white text-gray-600 border-gray-200 hover:border-rose-300 hover:bg-rose-50"
                }`}
              >
                <FiShield className="text-lg" />
                Admin
              </button>

            </div>
          </div>

          
          {role === "user" && (
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

             
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>

                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all focus:bg-white focus:border-rose-400 focus:ring-4 focus:ring-rose-100 placeholder:text-gray-400"
                  required
                />
              </div>

            
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all focus:bg-white focus:border-rose-400 focus:ring-4 focus:ring-rose-100 placeholder:text-gray-400"
                  required
                />
              </div>

             
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all focus:bg-white focus:border-rose-400 focus:ring-4 focus:ring-rose-100 placeholder:text-gray-400"
                  required
                />
              </div>

              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all focus:bg-white focus:border-rose-400 focus:ring-4 focus:ring-rose-100 placeholder:text-gray-400"
                  required
                />
              </div>

            
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all focus:bg-white focus:border-rose-400 focus:ring-4 focus:ring-rose-100 placeholder:text-gray-400"
                  required
                />
              </div>

             
              <button
                type="submit"
                className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 text-white font-bold text-lg shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center"
              >
                Create User Account
                <FiArrowRight className="ml-2" />
              </button>

            </form>
          )}

          
          {role === "admin" && (
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

            
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Admin Username
                </label>

                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter admin username"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all focus:bg-white focus:border-rose-400 focus:ring-4 focus:ring-rose-100 placeholder:text-gray-400"
                  required
                />
              </div>

            
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Admin Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter admin email"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all focus:bg-white focus:border-rose-400 focus:ring-4 focus:ring-rose-100 placeholder:text-gray-400"
                  required
                />
              </div>

             
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter admin phone number"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all focus:bg-white focus:border-rose-400 focus:ring-4 focus:ring-rose-100 placeholder:text-gray-400"
                  required
                />
              </div>

             
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all focus:bg-white focus:border-rose-400 focus:ring-4 focus:ring-rose-100 placeholder:text-gray-400"
                  required
                />
              </div>

              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm admin password"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all focus:bg-white focus:border-rose-400 focus:ring-4 focus:ring-rose-100 placeholder:text-gray-400"
                  required
                />
              </div>

            
              <button
                type="submit"
                className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 text-white font-bold text-lg shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center"
              >
                Create Admin Account
                <FiArrowRight className="ml-2" />
              </button>

            </form>
          )}

          
          <div className="relative flex items-center my-7">
            <div className="flex-1 border-t border-gray-200" />

            <span className="px-4 text-sm text-gray-400 bg-white">
              Already registered?
            </span>

            <div className="flex-1 border-t border-gray-200" />
          </div>

          <p className="text-center text-gray-500 text-sm">
            Already have an account?{" "}

            <Link
              to="/login"
              className="font-bold text-rose-500 hover:text-rose-600 transition-colors inline-flex items-center gap-1"
            >
              Login
              <FiArrowRight className="text-sm" />
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default RegisterPage;