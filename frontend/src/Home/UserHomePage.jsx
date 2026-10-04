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

  const products = [
    {
      id: 1,
      name: "Premium Oversized T-Shirt",
      category: "Clothing",
      price: 999,
      oldPrice: 1499,
      rating: 4.8,
      reviews: 124,
      badge: "Trending",
    },
    {
      id: 2,
      name: "Air Runner Sneakers",
      category: "Shoes",
      price: 2499,
      oldPrice: 3499,
      rating: 4.7,
      reviews: 89,
      badge: "Popular",
    },
    {
      id: 3,
      name: "Luxury Oud Perfume",
      category: "Perfume",
      price: 1799,
      oldPrice: 2299,
      rating: 4.9,
      reviews: 156,
      badge: "Best Seller",
    },
    {
      id: 4,
      name: "Classic Leather Bag",
      category: "Accessories",
      price: 2199,
      oldPrice: 2999,
      rating: 4.6,
      reviews: 72,
      badge: "New",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900">

      {/* =====================================================
          NAVBAR
      ====================================================== */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="h-20 flex items-center justify-between gap-6">

            {/* Logo */}
            <div className="flex items-center gap-3 shrink-0">

              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-400 flex items-center justify-center text-white shadow-lg shadow-rose-200">
                <FiShoppingBag className="text-xl" />
              </div>

              <div className="hidden sm:block">
                <h1 className="text-xl font-extrabold tracking-tight">
                  Shop<span className="text-rose-500">Cart</span>
                </h1>

                <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                  Everything you love
                </p>
              </div>

            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">

              <a
                href="#home"
                className="text-sm font-semibold text-rose-500"
              >
                Home
              </a>

              <a
                href="#products"
                className="text-sm font-medium text-gray-600 hover:text-rose-500 transition"
              >
                Products
              </a>

              <a
                href="#categories"
                className="text-sm font-medium text-gray-600 hover:text-rose-500 transition"
              >
                Categories
              </a>

              <a
                href="#deals"
                className="text-sm font-medium text-gray-600 hover:text-rose-500 transition"
              >
                Deals
              </a>

            </div>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-sm">

              <div className="w-full relative">

                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:bg-white focus:border-rose-300 focus:ring-4 focus:ring-rose-50 transition"
                />

              </div>

            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">

              <button className="w-10 h-10 rounded-xl hover:bg-rose-50 flex items-center justify-center transition">
                <FiHeart className="text-xl text-gray-600 hover:text-rose-500" />
              </button>

              <button className="relative w-10 h-10 rounded-xl hover:bg-rose-50 flex items-center justify-center transition">

                <FiShoppingCart className="text-xl text-gray-600" />

                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  2
                </span>

              </button>

              <button className="hidden sm:flex items-center gap-2 ml-2 pl-3 border-l border-gray-200">

                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-500 to-orange-400 flex items-center justify-center text-white">
                  <FiUser />
                </div>

                <div className="hidden xl:block text-left">
                  <p className="text-xs text-gray-400">
                    Welcome
                  </p>

                  <p className="text-sm font-bold">
                    User
                  </p>
                </div>

              </button>

            </div>

          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">

            <div className="relative">

              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:bg-white focus:border-rose-300 transition"
              />

            </div>

          </div>

        </div>
      </nav>

      {/* =====================================================
          HERO SECTION
      ====================================================== */}
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

              {/* Stats */}
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

            {/* Hero Visual */}
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

      {/* =====================================================
          BENEFITS
      ====================================================== */}
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

      {/* =====================================================
          CATEGORIES
      ====================================================== */}
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
              <div
                key={category.name}
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

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          PRODUCTS
      ====================================================== */}
      <section
        id="products"
        className="py-20 bg-white"
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-end justify-between mb-10">

            <div>
              <p className="text-rose-500 uppercase tracking-[3px] text-xs font-bold mb-3">
                Handpicked For You
              </p>

              <h2 className="text-3xl sm:text-4xl font-black">
                Featured Products
              </h2>

              <p className="text-gray-500 mt-2">
                Trending products our customers love.
              </p>
            </div>

            <button className="hidden sm:flex items-center gap-2 text-sm font-bold text-rose-500">
              View All
              <FiChevronRight />
            </button>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-100 transition-all duration-300"
              >

                {/* Product Image */}
                <div className="relative h-72 bg-gradient-to-br from-gray-50 to-rose-50 flex items-center justify-center overflow-hidden">

                  <span className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-white text-xs font-bold text-rose-500 shadow-sm">
                    {product.badge}
                  </span>

                  <button className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm hover:text-rose-500 transition">
                    <FiHeart />
                  </button>

                  <FiShoppingBag className="text-8xl text-rose-200 group-hover:scale-110 transition-transform duration-500" />

                </div>

                {/* Product Info */}
                <div className="p-5">

                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                    {product.category}
                  </p>

                  <h3 className="font-bold text-base mt-2 line-clamp-2 min-h-[48px]">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-2 mt-3">

                    <div className="flex items-center gap-1 text-yellow-500">
                      <FiStar className="fill-current text-sm" />

                      <span className="text-xs font-bold text-gray-600">
                        {product.rating}
                      </span>
                    </div>

                    <span className="text-xs text-gray-400">
                      ({product.reviews})
                    </span>

                  </div>

                  <div className="flex items-center justify-between mt-4">

                    <div className="flex items-center gap-2">

                      <span className="text-xl font-black">
                        ₹{product.price}
                      </span>

                      <span className="text-sm text-gray-400 line-through">
                        ₹{product.oldPrice}
                      </span>

                    </div>

                  </div>

                  <button className="w-full mt-5 py-3 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-rose-500 transition flex items-center justify-center gap-2">
                    <FiShoppingCart />
                    Add to Cart
                  </button>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          DEAL BANNER
      ====================================================== */}
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

      {/* =====================================================
          FOOTER
      ====================================================== */}
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