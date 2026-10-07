import React, { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ProductConext } from "../context/ProductContext";
import { FiShoppingCart } from "react-icons/fi";
import UserNavbar from "../Components/Navbar/UserNavbar";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
    const { category } = useParams();
    const { products } = useContext(ProductConext);
    const navigate = useNavigate()

    const categoryProducts = products.filter(
        (product) =>
            product.category?.toLowerCase() === category?.toLowerCase()
    );

    console.log("CATEGORY PRODUCTS:", categoryProducts);

    return (
        <>
        <UserNavbar/>
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-7xl mx-auto px-4">

               
                <div className="mb-8">
                    <p className="text-sm uppercase tracking-[3px] text-rose-500 font-bold">
                        Shop Category
                    </p>

                    <h1 className="text-3xl sm:text-4xl font-black mt-2 capitalize">
                        {category}
                    </h1>

                    <p className="text-gray-500 mt-2">
                        {categoryProducts.length} products available
                    </p>
                </div>

              
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {categoryProducts.map((product) => (
                        <div
                            key={product._id}
                            onClick={() =>navigate(`/product/${product._id}`)}
                            className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                        >

                            
                            <div className="h-64 bg-gray-100 overflow-hidden">

                                {product.images?.[0] ? (
                                    <img
                                        src={`http://localhost:5000/${product.images[0].replace(
                                            /^\/+/,
                                            ""
                                        )}`}
                                        alt={product.productname}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        No Image
                                    </div>
                                )}

                            </div>

                           
                            <div className="p-5">

                                <p className="text-xs text-gray-400 uppercase tracking-wider">
                                    {product.category}
                                </p>

                                <h2 className="font-bold text-lg mt-2 line-clamp-2">
                                    {product.productname}
                                </h2>

                                
                                <div className="mt-4 flex items-center justify-between gap-3">

                                    <p className="text-xl font-black">
                                        ₹{Number(product.price).toLocaleString("en-IN")}
                                    </p>

                                    <p
                                        className={`text-sm font-semibold ${
                                            product.quantity === 0
                                                ? "text-red-600"
                                                : product.quantity <= product.lowStockThreshold
                                                ? "text-orange-500"
                                                : "text-green-600"
                                        }`}
                                    >
                                        {product.quantity === 0
                                            ? "Out of Stock"
                                            : product.quantity <= product.lowStockThreshold
                                            ? `Only ${product.quantity} left`
                                            : `Stock: ${product.quantity}`}
                                    </p>

                                </div>

                               
                                <button
                                    type="button"
                                    className="w-full mt-5 py-3 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-rose-500 transition flex items-center justify-center gap-2"
                                >
                                    <FiShoppingCart />
                                    Add to Cart
                                </button>

                            </div>

                        </div>
                    ))}

                </div>

            </div>
        </div>
        </>
    );
};

export default CategoryPage;