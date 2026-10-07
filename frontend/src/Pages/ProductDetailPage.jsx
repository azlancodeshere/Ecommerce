import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductConext } from "../context/ProductContext";
import { FiShoppingCart, FiArrowLeft, FiHeart } from "react-icons/fi";

const ProductDetailPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const { products } = useContext(ProductConext);

    
    const product = products.find(
        (item) => item._id === id
    );

    
    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">
                        Product not found
                    </h1>

                    <button
                        onClick={() => navigate(-1)}
                        className="mt-5 px-6 py-3 bg-gray-900 text-white rounded-xl"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    
    const similarProducts = products
        .filter((item) => item._id !== product._id)
        .filter(
            (item) =>
                item.category?.toLowerCase() ===
                product.category?.toLowerCase()
        )
        .sort((a, b) => {

            const priceDifferenceA =
            //abs makes negative to possitive
                Math.abs(Number(a.price) - Number(product.price));

            const priceDifferenceB =
                Math.abs(Number(b.price) - Number(product.price));

            return priceDifferenceA - priceDifferenceB;
        })
        .slice(0, 8);

    return (
        <div className="min-h-screen bg-gray-50 py-10">

            <div className="max-w-7xl mx-auto px-4">

               
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-rose-500 font-semibold mb-8"
                >
                    <FiArrowLeft />
                    Back
                </button>


                
                <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

                    <div className="grid grid-cols-1 lg:grid-cols-2">

                        {/* Image */}
                        <div className="h-[500px] bg-gray-100">

                            {product.images?.[0] ? (
                                <img
                                    src={`http://localhost:5000/${product.images[0].replace(/^\/+/, "")}`}
                                    alt={product.productname}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    No Image
                                </div>
                            )}

                        </div>


                        
                        <div className="p-8 lg:p-12">

                            <p className="text-sm uppercase tracking-[3px] text-rose-500 font-bold">
                                {product.category}
                            </p>

                            <h1 className="text-3xl lg:text-4xl font-black mt-3">
                                {product.productname}
                            </h1>

                            <p className="text-3xl font-black mt-6">
                                ₹{Number(product.price).toLocaleString("en-IN")}
                            </p>

                            <p className="text-gray-500 mt-6 leading-7">
                                {product.description}
                            </p>

                            
                            <div className="mt-6">

                                {product.quantity === 0 ? (
                                    <p className="text-red-500 font-bold">
                                        Out of Stock
                                    </p>
                                ) : (
                                    <p className="text-green-600 font-bold">
                                        Stock: {product.quantity}
                                    </p>
                                )}

                            </div>


                            
                            <div className="mt-6">

                                <p className="font-semibold mb-2">
                                    Quantity
                                </p>

                                <div className="flex items-center gap-4">

                                    <button className="w-10 h-10 rounded-lg border">
                                        -
                                    </button>

                                    <span className="font-bold">
                                        1
                                    </span>

                                    <button className="w-10 h-10 rounded-lg border">
                                        +
                                    </button>

                                </div>

                            </div>


                            
                            <div className="flex gap-4 mt-8">

                                <button
                                    disabled={product.quantity === 0}
                                    className="flex-1 py-4 rounded-xl bg-gray-900 text-white font-bold flex items-center justify-center gap-2 hover:bg-rose-500 transition disabled:opacity-50"
                                >
                                    <FiShoppingCart />
                                    Add to Cart
                                </button>

                                <button className="w-14 rounded-xl border flex items-center justify-center hover:text-rose-500">
                                    <FiHeart />
                                </button>

                            </div>

                        </div>

                    </div>

                </div>


               
                <div className="mt-16">

                    <p className="text-sm uppercase tracking-[3px] text-rose-500 font-bold">
                        You May Also Like
                    </p>

                    <h2 className="text-3xl font-black mt-2 mb-8">
                        Similar Products
                    </h2>


                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {similarProducts.map((item) => (

                            <div
                                key={item._id}
                                onClick={() =>
                                    navigate(`/product/${item._id}`)
                                }
                                className="bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer hover:shadow-xl transition"
                            >

                                <div className="h-64 bg-gray-100">

                                    {item.images?.[0] && (
                                        <img
                                            src={`http://localhost:5000/${item.images[0].replace(/^\/+/, "")}`}
                                            alt={item.productname}
                                            className="w-full h-full object-cover"
                                        />
                                    )}

                                </div>

                                <div className="p-5">

                                    <p className="text-xs text-gray-400 uppercase">
                                        {item.category}
                                    </p>

                                    <h3 className="font-bold mt-2 line-clamp-2">
                                        {item.productname}
                                    </h3>

                                    <div className="flex justify-between items-center mt-4">

                                        <p className="text-xl font-black">
                                            ₹{Number(item.price).toLocaleString("en-IN")}
                                        </p>

                                        <p className="text-sm text-green-600 font-semibold">
                                            Stock: {item.quantity}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ProductDetailPage;