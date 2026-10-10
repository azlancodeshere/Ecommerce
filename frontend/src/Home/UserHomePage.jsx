import React from "react";
import {
  FiShoppingBag,
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiArrowRight,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiStar,
  FiChevronRight,
} from "react-icons/fi";
import HomeTrendingProduct from "./HomeTrendingProduct.jsx";
import {useNavigate} from "react-router-dom"
import UserNavbar from "../Components/Navbar/UserNavbar.jsx";

const UserHomePage = () => {
  const categories = [
    {
      name: "Clothing",
      icon: "👕",
      count: "120+ Products",
    },
    {
      name: "Shoes",
      icon: "👟",
      count: "80+ Products",
    },
    {
      name: "Perfumes",
      icon: "🌸",
      count: "60+ Products",
    },
    {
      name: "Accessories",
      icon: "👜",
      count: "90+ Products",
    },
  ];

  const navigate = useNavigate();

 

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900">

      
     <UserNavbar/>

     
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-orange-50"
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="min-h-[560px] grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-20">

            {/* Hero Content */}
            <div className="relative z-10">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-rose-100 shadow-sm mb-6">

                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />

                <span className="text-xs sm:text-sm font-semibold text-rose-500">
                  New Collection Available
                </span>

              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">

                Style That

                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400">
                  Speaks You.
                </span>

              </h1>

              <p className="mt-6 text-gray-500 text-lg leading-8 max-w-xl">
                Discover clothing, shoes, perfumes and accessories
                carefully selected to make your everyday style
                stand out.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">

                <button className="px-7 py-4 rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 text-white font-bold shadow-xl shadow-rose-200 hover:shadow-2xl hover:-translate-y-1 transition flex items-center gap-2">
                  Shop Collection
                  <FiArrowRight />
                </button>

                <button className="px-7 py-4 rounded-xl bg-white border border-gray-200 text-gray-700 font-bold hover:border-rose-300 hover:text-rose-500 transition">
                  Explore Products
                </button>

              </div>

          
              <div className="flex items-center gap-8 mt-12">

                <div>
                  <p className="text-2xl font-black">
                    10K+
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Happy Customers
                  </p>
                </div>

                <div className="w-px h-10 bg-gray-200" />

                <div>
                  <p className="text-2xl font-black">
                    500+
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Products
                  </p>
                </div>

                <div className="w-px h-10 bg-gray-200" />

                <div>
                  <p className="text-2xl font-black">
                    4.9
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Customer Rating
                  </p>
                </div>

              </div>

            </div>

          
            <div className="relative hidden lg:flex items-center justify-center">

              <div className="absolute w-[420px] h-[420px] rounded-full bg-gradient-to-br from-rose-200 to-orange-100 blur-2xl opacity-70" />

              <div className="relative w-[440px] h-[480px] rounded-[40px] bg-gradient-to-br from-rose-500 via-pink-500 to-orange-400 shadow-2xl shadow-rose-200 overflow-hidden">

                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10" />

                <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/10" />

                <div className="relative h-full flex flex-col items-center justify-center text-white">

                  <FiShoppingBag className="text-[140px] opacity-90" />

                  <p className="mt-8 text-3xl font-black">
                    SHOP YOUR STYLE
                  </p>

                  <p className="mt-3 text-white/70">
                    Fashion • Beauty • Lifestyle
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

     
      <section className="bg-white border-y border-gray-100">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                <FiTruck className="text-xl" />
              </div>

              <div>
                <p className="font-bold text-sm">
                  Fast Delivery
                </p>

                <p className="text-xs text-gray-400">
                  Quick doorstep delivery
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                <FiShield className="text-xl" />
              </div>

              <div>
                <p className="font-bold text-sm">
                  Secure Payment
                </p>

                <p className="text-xs text-gray-400">
                  100% secure checkout
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center">
                <FiRefreshCw className="text-xl" />
              </div>

              <div>
                <p className="font-bold text-sm">
                  Easy Returns
                </p>

                <p className="text-xs text-gray-400">
                  Simple return process
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-50 text-yellow-500 flex items-center justify-center">
                <FiStar className="text-xl" />
              </div>

              <div>
                <p className="font-bold text-sm">
                  Quality Products
                </p>

                <p className="text-xs text-gray-400">
                  Carefully selected
                </p>
              </div>
            </div>

          </div>

        </div>

      </section>

      
      <section
        id="categories"
        className="py-20 bg-[#fafafa]"
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-end justify-between mb-10">

            <div>
              <p className="text-rose-500 uppercase tracking-[3px] text-xs font-bold mb-3">
                Explore
              </p>

              <h2 className="text-3xl sm:text-4xl font-black">
                Shop By Category
              </h2>

              <p className="text-gray-500 mt-2">
                Find exactly what you're looking for.
              </p>
            </div>

            <button className="hidden sm:flex items-center gap-2 text-sm font-bold text-rose-500 hover:text-rose-600">
              View All
              <FiChevronRight />
            </button>

          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

            {categories.map((category) => (
              <button
                key={category.name}
                onClick={()=> navigate(`/products/category/${category.name}`)}
                className="group bg-white rounded-2xl border border-gray-100 p-6 hover:border-rose-200 hover:shadow-xl hover:shadow-rose-100/50 transition-all duration-300 cursor-pointer"
              >

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-50 to-orange-50 flex items-center justify-center text-3xl mb-5">
                  {category.icon}
                </div>

                <h3 className="font-bold text-lg">
                  {category.name}
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  {category.count}
                </p>

                <div className="mt-5 flex items-center gap-1 text-rose-500 text-sm font-semibold">
                  Explore
                  <FiArrowRight className="group-hover:translate-x-1 transition" />
                </div>

              </button>
            ))}

          </div>

        </div>

      </section>

     
      <section
        id="products"
        className="py-20 bg-white"
      >

       <HomeTrendingProduct/>

      </section>

    
      <section
        id="deals"
        className="py-20 bg-[#fafafa]"
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 p-8 sm:p-12 lg:p-16 text-white">

            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/10" />

            <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-white/10" />

            <div className="relative z-10 max-w-2xl">

              <p className="uppercase tracking-[4px] text-white/70 text-xs sm:text-sm font-bold">
                Limited Time Offer
              </p>

              <h2 className="text-4xl sm:text-5xl font-black mt-4">
                Get up to 40% OFF
              </h2>

              <p className="text-white/80 mt-4 text-lg">
                Upgrade your style with our latest collection.
                Grab your favourites before the offer ends.
              </p>

              <button className="mt-8 px-7 py-4 rounded-xl bg-white text-rose-500 font-bold hover:bg-gray-50 transition flex items-center gap-2">
                Shop Deals
                <FiArrowRight />
              </button>

            </div>

          </div>

        </div>

      </section>

      
      <footer className="bg-gray-950 text-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand */}
            <div>

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 to-orange-400 flex items-center justify-center">
                  <FiShoppingBag />
                </div>

                <h2 className="text-xl font-black">
                  Shop<span className="text-rose-400">Cart</span>
                </h2>

              </div>

              <p className="text-gray-400 text-sm leading-7 mt-5 max-w-xs">
                Your destination for fashion, shoes, perfumes
                and everything that matches your style.
              </p>

            </div>

            {/* Shop */}
            <div>
              <h3 className="font-bold mb-5">
                Shop
              </h3>

              <div className="space-y-3 text-sm text-gray-400">

                <p className="hover:text-white cursor-pointer">
                  Clothing
                </p>

                <p className="hover:text-white cursor-pointer">
                  Shoes
                </p>

                <p className="hover:text-white cursor-pointer">
                  Perfumes
                </p>

                <p className="hover:text-white cursor-pointer">
                  Accessories
                </p>

              </div>
            </div>

            {/* Help */}
            <div>
              <h3 className="font-bold mb-5">
                Help
              </h3>

              <div className="space-y-3 text-sm text-gray-400">

                <p className="hover:text-white cursor-pointer">
                  My Orders
                </p>

                <p className="hover:text-white cursor-pointer">
                  Shipping
                </p>

                <p className="hover:text-white cursor-pointer">
                  Returns
                </p>

                <p className="hover:text-white cursor-pointer">
                  Contact Us
                </p>

              </div>
            </div>

            {/* Account */}
            <div>
              <h3 className="font-bold mb-5">
                Account
              </h3>

              <div className="space-y-3 text-sm text-gray-400">

                <p className="hover:text-white cursor-pointer">
                  Profile
                </p>

                <p className="hover:text-white cursor-pointer">
                  Wishlist
                </p>

                <p className="hover:text-white cursor-pointer">
                  Cart
                </p>

                <p className="hover:text-white cursor-pointer">
                  Logout
                </p>

              </div>
            </div>

          </div>

          <div className="border-t border-gray-800 mt-12 pt-7 text-center">

            <p className="text-sm text-gray-500">
              © 2026 ShopCart. All rights reserved.
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
};

export default UserHomePage;