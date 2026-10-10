import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FiPlus,
    FiTruck,
    FiClock,
    FiCheckCircle,
    FiTrash2,
    FiEye,
    FiEdit2,
    FiShoppingBag,
    FiRefreshCw,
} from "react-icons/fi";

import api from "../api/api.js";
import { ProductConext } from "../context/ProductContext.jsx";
import Card from "../card/Card.jsx";
import AdminNavbar from "../Components/Navbar/AdminNavbar";
import AdminSideBar from "../Components/sidebar/AdminSideBar";
import RevenueAnalytics from "../Pages/RevenueAnalytics.jsx";
import RecentOrders from "../Pages/RecentOrders.jsx";

const initialDashboardStats = {
    pendingDelivery: 0,
    pendingOrders: 0,
    completedOrders: 0,
};

const apiBaseUrl = (
    import.meta.env.VITE_BASE_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const serverOrigin = apiBaseUrl.replace(/\/api$/, "");

const getProductImageUrl = (imagePath) => {
    if (!imagePath) return "";

    if (/^https?:\/\//i.test(imagePath)) {
        return imagePath;
    }

    return `${serverOrigin}/${String(imagePath).replace(/^\/+/, "")}`;
};

const formatCount = (value) => {
    return Number(value || 0).toLocaleString("en-IN");
};

const AdminHomePage = () => {
    const { products = [], setProducts } = useContext(ProductConext);
    const navigate = useNavigate();

    const [dashboardStats, setDashboardStats] = useState(
        initialDashboardStats
    );

    const [statsLoading, setStatsLoading] = useState(true);
    const [statsError, setStatsError] = useState("");
    const [statsRefreshKey, setStatsRefreshKey] = useState(0);

    const [deletingProductId, setDeletingProductId] = useState(null);
    const [productActionError, setProductActionError] = useState("");

   
    useEffect(() => {
        let isMounted = true;

        const fetchDashboardStats = async () => {
            try {
                setStatsLoading(true);
                setStatsError("");

                const response = await api.get("/dashboard/stats");
                const data = response.data?.data;

                if (!data) {
                    throw new Error(
                        "Dashboard API returned an invalid response."
                    );
                }

                if (isMounted) {
                    setDashboardStats({
                        pendingDelivery:
                            Number(data.pendingDelivery) || 0,
                        pendingOrders:
                            Number(data.pendingOrders) || 0,
                        completedOrders:
                            Number(data.completedOrders) || 0,
                    });
                }
            } catch (error) {
                console.error(
                    "Dashboard order summary error:",
                    error.response?.data || error.message
                );

                if (isMounted) {
                    setStatsError(
                        error.response?.data?.message ||
                            "Unable to load order summary."
                    );
                }
            } finally {
                if (isMounted) {
                    setStatsLoading(false);
                }
            }
        };

        fetchDashboardStats();

        return () => {
            isMounted = false;
        };
    }, [statsRefreshKey]);

   
    const getStockStatus = (product) => {
        const quantity = Number(product.quantity ?? 0);
        const lowStockThreshold = Number(
            product.lowStockThreshold ?? 5
        );

        if (quantity <= 0) {
            return {
                text: "Out of Stock",
                className: "bg-red-50 text-red-600",
            };
        }

        if (quantity <= lowStockThreshold) {
            return {
                text: "Low Stock",
                className: "bg-yellow-50 text-yellow-600",
            };
        }

        return {
            text: "In Stock",
            className: "bg-emerald-50 text-emerald-600",
        };
    };

   
    const deleteProduct = async (product) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${
                product.productname || "this product"
            }"?`
        );

        if (!confirmed) return;

        setDeletingProductId(product._id);
        setProductActionError("");

        try {
            await api.delete(
                `/products/delete-product/${product._id}`
            );

            setProducts((previousProducts) =>
                previousProducts.filter(
                    (item) => item._id !== product._id
                )
            );
        } catch (error) {
            console.error(
                "Delete product error:",
                error.response?.data || error.message
            );

            setProductActionError(
                error.response?.data?.message ||
                    `Could not delete ${
                        product.productname || "the product"
                    }.`
            );
        } finally {
            setDeletingProductId(null);
        }
    };

    const safeProducts = Array.isArray(products) ? products : [];

    return (
        <div className="min-h-screen bg-[#f8f9fb] text-gray-900">
           
            <AdminSideBar />

          
            <main className="min-h-screen lg:ml-64">
              
                <AdminNavbar />

                <div className="space-y-8 p-4 sm:p-6 lg:p-8">
                 
                    <section className="flex flex-col justify-between gap-5 rounded-2xl bg-gradient-to-r from-rose-200 via-rose-100 to-orange-100 p-6 sm:flex-row sm:items-center sm:p-8">
                        <div>
                            <p className="text-sm font-medium text-rose-800">
                                Inventory
                            </p>

                            <h1 className="mt-1 text-2xl font-black text-gray-900 sm:text-3xl">
                                Products
                            </h1>

                            <p className="mt-2 text-sm text-gray-600">
                                Manage your store inventory and monitor
                                orders.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/add-product")}
                            className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-rose-100 transition hover:-translate-y-0.5 hover:shadow-xl sm:self-center"
                        >
                            <FiPlus className="text-lg" />
                            Add Product
                        </button>
                    </section>

                    
                    <section>
                        <Card />
                    </section>

                   
                    <section>
                        <RevenueAnalytics />
                    </section>

                    
                    <section>
                        <RecentOrders />
                    </section>

                    
                    <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
                       
                        <div className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
                            <div>
                                <p className="text-sm text-gray-400">
                                    Inventory
                                </p>

                                <h2 className="mt-1 text-xl font-black text-gray-900 sm:text-2xl">
                                    All Products
                                </h2>

                                <p className="mt-1 text-sm text-gray-400">
                                    {formatCount(safeProducts.length)}{" "}
                                    products in your inventory
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/all-Product")
                                }
                                className="self-start text-sm font-bold text-rose-500 transition hover:text-rose-600 sm:self-center"
                            >
                                View All Products
                            </button>
                        </div>

                       
                        {productActionError && (
                            <div className="mx-6 mb-4 flex flex-col gap-3 rounded-xl border border-red-100 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-sm text-red-600">
                                    {productActionError}
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setProductActionError("")
                                    }
                                    className="self-start text-sm font-semibold text-red-700 underline"
                                >
                                    Dismiss
                                </button>
                            </div>
                        )}

                     
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[900px] border-collapse">
                                <thead className="border-y border-gray-100 bg-gray-50">
                                    <tr className="text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                                        <th className="px-6 py-4">
                                            Product
                                        </th>

                                        <th className="px-6 py-4">
                                            Category
                                        </th>

                                        <th className="px-6 py-4">
                                            Price
                                        </th>

                                        <th className="px-6 py-4">
                                            Stock
                                        </th>

                                        <th className="px-6 py-4">
                                            Status
                                        </th>

                                        <th className="px-6 py-4">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {safeProducts.length > 0 ? (
                                        safeProducts.map((product) => {
                                            const status =
                                                getStockStatus(product);

                                            const imageUrl =
                                                getProductImageUrl(
                                                    product.images?.[0]
                                                );

                                            const quantity = Number(
                                                product.quantity ?? 0
                                            );

                                            return (
                                                <tr
                                                    key={product._id}
                                                    className="transition hover:bg-gray-50/70"
                                                >
                                                    {/* Product */}
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-rose-50 to-orange-50 text-rose-400">
                                                                {imageUrl ? (
                                                                    <img
                                                                        src={
                                                                            imageUrl
                                                                        }
                                                                        alt={
                                                                            product.productname ||
                                                                            "Product"
                                                                        }
                                                                        loading="lazy"
                                                                        className="h-full w-full object-cover"
                                                                        onError={(
                                                                            event
                                                                        ) => {
                                                                            event.currentTarget.style.display =
                                                                                "none";
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <FiShoppingBag className="text-xl" />
                                                                )}
                                                            </div>

                                                            <div className="min-w-0">
                                                                <p className="max-w-[260px] truncate text-sm font-bold text-gray-900">
                                                                    {product.productname ||
                                                                        "Unnamed product"}
                                                                </p>

                                                                <p className="mt-1 text-xs text-gray-400">
                                                                    SKU:{" "}
                                                                    {product.sku ||
                                                                        "—"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    
                                                    <td className="px-6 py-5 text-sm text-gray-500">
                                                        {product.category ||
                                                            "—"}
                                                    </td>

                                                   
                                                    <td className="whitespace-nowrap px-6 py-5 text-sm font-bold text-gray-900">
                                                        ₹
                                                        {Number(
                                                            product.price || 0
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </td>

                                                    {/* Stock */}
                                                    <td className="whitespace-nowrap px-6 py-5">
                                                        <span
                                                            className={`text-sm font-semibold ${
                                                                quantity <= 0
                                                                    ? "text-red-500"
                                                                    : quantity <=
                                                                        Number(
                                                                            product.lowStockThreshold ??
                                                                                5
                                                                        )
                                                                      ? "text-yellow-600"
                                                                      : "text-gray-600"
                                                            }`}
                                                        >
                                                            {formatCount(
                                                                quantity
                                                            )}{" "}
                                                            units
                                                        </span>
                                                    </td>

                                                    
                                                    <td className="px-6 py-5">
                                                        <span
                                                            className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold ${status.className}`}
                                                        >
                                                            {status.text}
                                                        </span>
                                                    </td>

                                                   
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                type="button"
                                                                title="View products"
                                                                aria-label={`View ${
                                                                    product.productname ||
                                                                    "product"
                                                                }`}
                                                                onClick={() =>
                                                                    navigate(
                                                                        "/all-Product"
                                                                    )
                                                                }
                                                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 transition hover:bg-blue-50 hover:text-blue-500"
                                                            >
                                                                <FiEye />
                                                            </button>

                                                            <button
                                                                type="button"
                                                                title="Edit product"
                                                                aria-label={`Edit ${
                                                                    product.productname ||
                                                                    "product"
                                                                }`}
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/edit-product/${product._id}`
                                                                    )
                                                                }
                                                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 transition hover:bg-rose-50 hover:text-rose-500"
                                                            >
                                                                <FiEdit2 />
                                                            </button>

                                                            <button
                                                                type="button"
                                                                title="Delete product"
                                                                aria-label={`Delete ${
                                                                    product.productname ||
                                                                    "product"
                                                                }`}
                                                                disabled={
                                                                    deletingProductId ===
                                                                    product._id
                                                                }
                                                                onClick={() =>
                                                                    deleteProduct(
                                                                        product
                                                                    )
                                                                }
                                                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                                                            >
                                                                {deletingProductId ===
                                                                product._id ? (
                                                                    <FiRefreshCw className="animate-spin" />
                                                                ) : (
                                                                    <FiTrash2 />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-6 py-14 text-center"
                                            >
                                                <FiShoppingBag className="mx-auto mb-3 text-3xl text-gray-300" />

                                                <p className="font-semibold text-gray-700">
                                                    No products found
                                                </p>

                                                <p className="mt-1 text-sm text-gray-400">
                                                    Add a product to see it
                                                    in your inventory.
                                                </p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    
                    <section className="grid grid-cols-1 gap-5 pb-8 sm:grid-cols-3">
                       
                        <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 transition hover:shadow-md">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                                <FiTruck className="text-xl" />
                            </div>

                            <div>
                                <p className="text-xs font-medium text-gray-400">
                                    Pending Delivery
                                </p>

                                <p className="mt-1 text-xl font-black text-gray-900">
                                    {statsLoading
                                        ? "—"
                                        : formatCount(
                                              dashboardStats.pendingDelivery
                                          )}
                                </p>

                                <p className="mt-1 text-xs text-gray-400">
                                    Shipped, not yet delivered
                                </p>
                            </div>
                        </div>

                       
                        <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 transition hover:shadow-md">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-50 text-yellow-500">
                                <FiClock className="text-xl" />
                            </div>

                            <div>
                                <p className="text-xs font-medium text-gray-400">
                                    Pending Orders
                                </p>

                                <p className="mt-1 text-xl font-black text-gray-900">
                                    {statsLoading
                                        ? "—"
                                        : formatCount(
                                              dashboardStats.pendingOrders
                                          )}
                                </p>

                                <p className="mt-1 text-xs text-gray-400">
                                    Placed or processing
                                </p>
                            </div>
                        </div>

                      
                        <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 transition hover:shadow-md">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
                                <FiCheckCircle className="text-xl" />
                            </div>

                            <div>
                                <p className="text-xs font-medium text-gray-400">
                                    Completed Orders
                                </p>

                                <p className="mt-1 text-xl font-black text-gray-900">
                                    {statsLoading
                                        ? "—"
                                        : formatCount(
                                              dashboardStats.completedOrders
                                          )}
                                </p>

                                <p className="mt-1 text-xs text-gray-400">
                                    Successfully delivered
                                </p>
                            </div>
                        </div>
                    </section>

                    
                    {statsError && (
                        <div className="-mt-4 mb-8 flex flex-col gap-3 rounded-xl border border-red-100 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-red-600">
                                {statsError}
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    setStatsRefreshKey((key) => key + 1)
                                }
                                className="inline-flex items-center gap-2 self-start rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
                            >
                                <FiRefreshCw />
                                Retry
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminHomePage;