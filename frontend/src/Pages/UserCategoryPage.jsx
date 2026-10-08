import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductConext } from "../context/ProductContext";
import { FiShoppingCart } from "react-icons/fi";
import UserNavbar from "../Components/Navbar/UserNavbar";

const CategoryPage = () => {
    const { category } = useParams();
    const { products } = useContext(ProductConext);
    const navigate = useNavigate();

    const categoryProducts = products.filter(
        (product) =>
            product.category?.toLowerCase() === category?.toLowerCase()
    );

    console.log("CATEGORY PRODUCTS:", categoryProducts);

    return (
        <>
            <UserNavbar />

            <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 py-10">

                <div className="max-w-7xl mx-auto px-4">

                    {/* Heading */}
                    <div className="mb-10">

                        <p className="text-sm uppercase tracking-[3px] text-rose-500 font-black">
                            Shop Category
                        </p>

                        <h1 className="text-3xl sm:text-4xl font-black text-rose-950 mt-2 capitalize">
                            {category}
                        </h1>

                        <p className="text-rose-500/70 mt-2">
                            {categoryProducts.length} products available
                        </p>

                    </div>

                    {/* Products */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {categoryProducts.map((product) => (

                            <div
                                key={product._id}
                                onClick={() =>
                                    navigate(`/product/${product._id}`)
                                }
                                className="group bg-white/80 backdrop-blur-md rounded-2xl border border-rose-100 overflow-hidden hover:shadow-xl hover:shadow-rose-100/60 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >

                                {/* Image */}
                                <div className="h-64 bg-gradient-to-br from-rose-100 via-pink-50 to-orange-100 overflow-hidden">

                                    {product.images?.[0] ? (
                                        <img
                                            src={`http://localhost:5000/${product.images[0].replace(
                                                /^\/+/,
                                                ""
                                            )}`}
                                            alt={product.productname}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-rose-400">
                                            No Image
                                        </div>
                                    )}

                                </div>

                                {/* Details */}
                                <div className="p-5">

                                    <p className="text-xs text-rose-400 uppercase tracking-wider font-bold">
                                        {product.category}
                                    </p>

                                    <h2 className="font-bold text-lg mt-2 line-clamp-2 text-rose-950 min-h-[56px]">
                                        {product.productname}
                                    </h2>

                                    {/* Price + Stock */}
                                    <div className="mt-4 flex items-center justify-between gap-3">

                                        <p className="text-xl font-black text-orange-600">
                                            ₹{Number(product.price).toLocaleString("en-IN")}
                                        </p>

                                        <p
                                            className={`text-sm font-bold ${
                                                product.quantity === 0
                                                    ? "text-red-500"
                                                    : product.quantity <= product.lowStockThreshold
                                                    ? "text-orange-500"
                                                    : "text-emerald-600"
                                            }`}
                                        >
                                            {product.quantity === 0
                                                ? "Out of Stock"
                                                : product.quantity <= product.lowStockThreshold
                                                ? `Only ${product.quantity} left`
                                                : `Stock: ${product.quantity}`}
                                        </p>

                                    </div>

                                    {/* Add to Cart */}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                        className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold text-sm hover:from-rose-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-rose-200"
                                    >
                                        <FiShoppingCart />
                                        Add to Cart
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                    {/* No Products */}
                    {categoryProducts.length === 0 && (
                        <div className="mt-8 rounded-3xl border border-rose-100 bg-white/80 p-12 text-center shadow-lg shadow-rose-100/40">

                            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white text-2xl">
                                🛍️
                            </div>

                            <h2 className="text-2xl font-black text-rose-950 mt-5">
                                No Products Found
                            </h2>

                            <p className="text-rose-400 mt-2">
                                There are no products available in this category.
                            </p>

                        </div>
                    )}

                </div>

            </div>
        </>
    );
};

export default CategoryPage;