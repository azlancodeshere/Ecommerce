import React, { useContext } from "react";
import {
  FiShoppingBag,
  FiHeart,
  FiShoppingCart,
  FiChevronRight,
} from "react-icons/fi";

import { ProductConext } from "../context/ProductContext.jsx";

const HomeTrendingProduct = () => {
  const { products } = useContext(ProductConext);

  

  const TrendsProducts = Object.values(
    products.reduce((acc, product) => {
      const category = product.category;

      if (
        !acc[category] ||
        Number(product.price) > Number(acc[category].price)
      ) {
        acc[category] = product;
      }

      return acc;
    }, {})
  ).slice(0, 4);



  

  return (
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

        {TrendsProducts.map((product) => (

          <div
            key={product._id}
            className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-100 transition-all duration-300"
          >

            {/* Product Image */}
            <div className="relative h-72 bg-gradient-to-br from-gray-50 to-rose-50 flex items-center justify-center overflow-hidden">

              <span className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-white text-xs font-bold text-rose-500 shadow-sm">
                Trending
              </span>

              <button className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm hover:text-rose-500 transition">
                <FiHeart />
              </button>

              {product.images?.[0] ? (
                <img
                  src={`http://localhost:5000/${product.images[0].replace(/^\/+/, "")}`}
                  alt={product.productname}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <FiShoppingBag className="text-8xl text-rose-200 group-hover:scale-110 transition-transform duration-500" />
              )}

            </div>

            {/* Product Info */}
            <div className="p-5">

              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                {product.category}
              </p>

              <h3 className="font-bold text-base mt-2 line-clamp-2 min-h-[48px]">
                {product.productname}
              </h3>

              <div className="flex items-center justify-between mt-4">

                <span className="text-xl font-black">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </span>

                <span className="text-xs font-semibold text-gray-500">
                  Stock: {product.quantity}
                </span>

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
  );
};

export default HomeTrendingProduct;