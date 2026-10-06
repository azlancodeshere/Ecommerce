import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api.js";

import { ProductConext } from "../context/ProductContext.jsx";

import Card from "../card/Card.jsx";

import {
    FiMoreVertical,
    FiArrowUpRight,
    FiArrowDownRight,
    FiDollarSign,
    FiShoppingCart,
    FiPackage,
    FiUsers,
    FiPlus,
    FiTruck,
    FiClock,
    FiCheckCircle,
    FiEdit2,
    FiTrash2,
    FiEye,
    FiShoppingBag,
} from "react-icons/fi";

import AdminNavbar from "../Components/Navbar/AdminNavbar";
import AdminSideBar from "../Components/sidebar/AdminSideBar";

const AdminHomePage = () => {

    const { products, setProducts } = useContext(ProductConext);

    const navigate = useNavigate();

    // =========================
    // STOCK STATUS
    // =========================

    const getStockStatus = ({
        quantity,
        lowStockThreshold
    }) => {

        if (quantity === 0) {
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

    // =========================
    // DELETE PRODUCT
    // =========================

    const deleteProduct = async (id) =>{
    try {
        const response = await api.delete(
            `/products/delete-product/${id}`
        );

       setProducts((prevProducts)=>{
       return prevProducts.filter(
            (product)=> product._id !== id
        )
       })
        
    } catch (error) {
         console.log("Delete error:", error);
            console.log("Server error:", error.response?.data);
    }
 }


    // =========================
    // RECENT ORDERS
    // =========================

    const recentOrders = [
        {
            id: "#ORD-1024",
            customer: "Abdul Yasin",
            email: "abdul@example.com",
            product: "Premium T-Shirt",
            amount: "₹999",
            status: "Completed",
        },
        {
            id: "#ORD-1023",
            customer: "Rahul Sharma",
            email: "rahul@example.com",
            product: "Air Runner Shoes",
            amount: "₹2,499",
            status: "Pending",
        },
        {
            id: "#ORD-1022",
            customer: "Aman Khan",
            email: "aman@example.com",
            product: "Luxury Perfume",
            amount: "₹1,799",
            status: "Processing",
        },
        {
            id: "#ORD-1021",
            customer: "Priya Singh",
            email: "priya@example.com",
            product: "Leather Bag",
            amount: "₹2,199",
            status: "Completed",
        },
        {
            id: "#ORD-1020",
            customer: "Rohit Kumar",
            email: "rohit@example.com",
            product: "Classic Hoodie",
            amount: "₹1,499",
            status: "Cancelled",
        },
    ];

    // =========================
    // STATUS STYLE
    // =========================

    const getStatusStyle = (status) => {

        switch (status) {

            case "Completed":
                return "bg-emerald-50 text-emerald-600";

            case "Pending":
                return "bg-yellow-50 text-yellow-600";

            case "Processing":
                return "bg-blue-50 text-blue-600";

            case "Cancelled":
                return "bg-red-50 text-red-600";

            case "Active":
                return "bg-emerald-50 text-emerald-600";

            case "Low Stock":
                return "bg-yellow-50 text-yellow-600";

            case "Out of Stock":
                return "bg-red-50 text-red-600";

            default:
                return "bg-gray-50 text-gray-600";
        }
    };

    return (

        <div className="min-h-screen bg-[#f8f9fb] text-gray-900">

            {/* =========================
                SIDEBAR
            ========================= */}

            <AdminSideBar />

            {/* =========================
                MAIN AREA
            ========================= */}

            <main className="lg:ml-64 min-h-screen">

                {/* =========================
                    NAVBAR
                ========================= */}

                <AdminNavbar />

                {/* =========================
                    DASHBOARD CONTENT
                ========================= */}

                <div className="p-4 sm:p-6 lg:p-8">

                    {/* =========================
                        HEADER
                    ========================= */}

                    <div className="p-6 flex items-center justify-between bg-red-400 rounded-2xl">

                        <div>

                            <p className="text-sm text-gray-700">
                                Inventory
                            </p>

                            <h3 className="text-xl font-black mt-1">
                                Products
                            </h3>

                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/add-product")
                            }
                            className="
                                px-4
                                py-2.5
                                rounded-xl
                                bg-gradient-to-r
                                from-rose-500
                                to-orange-400
                                text-white
                                text-sm
                                font-bold
                                flex
                                items-center
                                gap-2
                                shadow-lg
                                shadow-rose-100
                                hover:shadow-xl
                                transition
                            "
                        >
                            <FiPlus />
                            Add Product
                        </button>

                    </div>

                    {/* =========================
                        STATS
                    ========================= */}

                    <section className="mt-6">
                        <Card />
                    </section>

                    {/* =========================
                        REVENUE ANALYTICS
                    ========================= */}

                    <section className="mt-6">

                        <div className="bg-white rounded-2xl border border-gray-100 p-6">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm text-gray-400">
                                        Overview
                                    </p>

                                    <h3 className="text-xl font-black mt-1">
                                        Revenue Analytics
                                    </h3>

                                </div>

                                <select
                                    className="
                                        px-3
                                        py-2
                                        bg-gray-50
                                        border
                                        border-gray-100
                                        rounded-lg
                                        text-sm
                                        outline-none
                                    "
                                >
                                    <option>
                                        Last 7 Days
                                    </option>

                                    <option>
                                        Last 30 Days
                                    </option>

                                    <option>
                                        Last 3 Months
                                    </option>

                                </select>

                            </div>

                            {/* Chart */}

                            <div className="mt-8 h-56 flex items-end gap-3 sm:gap-5">

                                {
                                    [
                                        45,
                                        62,
                                        50,
                                        78,
                                        58,
                                        85,
                                        72,
                                        95,
                                        68,
                                        88,
                                        76,
                                        100
                                    ].map(
                                        (height, index) => (

                                            <div
                                                key={index}
                                                className="
                                                    flex-1
                                                    h-full
                                                    flex
                                                    items-end
                                                "
                                            >

                                                <div
                                                    className="
                                                        w-full
                                                        bg-gradient-to-t
                                                        from-rose-500
                                                        to-orange-300
                                                        rounded-t-lg
                                                        hover:from-rose-600
                                                        hover:to-orange-400
                                                        transition
                                                    "
                                                    style={{
                                                        height: `${height}%`,
                                                    }}
                                                />

                                            </div>

                                        )
                                    )
                                }

                            </div>

                            {/* Days */}

                            <div className="
                                flex
                                justify-between
                                text-xs
                                text-gray-400
                                mt-3
                            ">

                                <span>Mon</span>
                                <span>Tue</span>
                                <span>Wed</span>
                                <span>Thu</span>
                                <span>Fri</span>
                                <span>Sat</span>
                                <span>Sun</span>

                            </div>

                        </div>

                    </section>

                    {/* =========================
                        RECENT ORDERS
                    ========================= */}

                    <section className="
                        mt-6
                        bg-white
                        rounded-2xl
                        border
                        border-gray-100
                        overflow-hidden
                    ">

                        {/* Header */}

                        <div className="
                            p-6
                            flex
                            items-center
                            justify-between
                        ">

                            <div>

                                <p className="text-sm text-gray-400">
                                    Store Activity
                                </p>

                                <h3 className="
                                    text-xl
                                    font-black
                                    mt-1
                                ">
                                    Recent Orders
                                </h3>

                            </div>

                            <button
                                type="button"
                                className="
                                    text-sm
                                    font-bold
                                    text-rose-500
                                    hover:text-rose-600
                                "
                            >
                                View All
                            </button>

                        </div>

                        {/* Desktop */}

                        <div className="hidden md:block overflow-x-auto">

                            <table className="w-full">

                                <thead className="
                                    bg-gray-50
                                    border-y
                                    border-gray-100
                                ">

                                    <tr className="
                                        text-left
                                        text-xs
                                        uppercase
                                        tracking-wider
                                        text-gray-400
                                    ">

                                        <th className="px-6 py-4 font-semibold">
                                            Order
                                        </th>

                                        <th className="px-6 py-4 font-semibold">
                                            Customer
                                        </th>

                                        <th className="px-6 py-4 font-semibold">
                                            Product
                                        </th>

                                        <th className="px-6 py-4 font-semibold">
                                            Amount
                                        </th>

                                        <th className="px-6 py-4 font-semibold">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 font-semibold">
                                            Action
                                        </th>

                                    </tr>

                                </thead>

                                <tbody className="divide-y divide-gray-100">

                                    {
                                        recentOrders.map(
                                            (order) => (

                                                <tr
                                                    key={order.id}
                                                    className="
                                                        hover:bg-gray-50/70
                                                        transition
                                                    "
                                                >

                                                    <td className="px-6 py-5">

                                                        <p className="font-bold text-sm">
                                                            {order.id}
                                                        </p>

                                                    </td>

                                                    <td className="px-6 py-5">

                                                        <p className="font-semibold text-sm">
                                                            {order.customer}
                                                        </p>

                                                        <p className="
                                                            text-xs
                                                            text-gray-400
                                                            mt-1
                                                        ">
                                                            {order.email}
                                                        </p>

                                                    </td>

                                                    <td className="px-6 py-5">

                                                        <div className="
                                                            flex
                                                            items-center
                                                            gap-3
                                                        ">

                                                            <div className="
                                                                w-10
                                                                h-10
                                                                rounded-lg
                                                                bg-gradient-to-br
                                                                from-rose-50
                                                                to-orange-50
                                                                flex
                                                                items-center
                                                                justify-center
                                                                text-rose-400
                                                            ">
                                                                <FiPackage />
                                                            </div>

                                                            <span className="
                                                                text-sm
                                                                font-medium
                                                            ">
                                                                {order.product}
                                                            </span>

                                                        </div>

                                                    </td>

                                                    <td className="px-6 py-5">

                                                        <span className="
                                                            font-bold
                                                            text-sm
                                                        ">
                                                            {order.amount}
                                                        </span>

                                                    </td>

                                                    <td className="px-6 py-5">

                                                        <span
                                                            className={`
                                                                inline-flex
                                                                items-center
                                                                px-3
                                                                py-1.5
                                                                rounded-full
                                                                text-xs
                                                                font-bold
                                                                ${getStatusStyle(
                                                                    order.status
                                                                )}
                                                            `}
                                                        >
                                                            {order.status}
                                                        </span>

                                                    </td>

                                                    <td className="px-6 py-5">

                                                        <button
                                                            type="button"
                                                            className="
                                                                w-9
                                                                h-9
                                                                rounded-lg
                                                                bg-gray-50
                                                                hover:bg-rose-50
                                                                hover:text-rose-500
                                                                flex
                                                                items-center
                                                                justify-center
                                                                transition
                                                            "
                                                        >
                                                            <FiMoreVertical />
                                                        </button>

                                                    </td>

                                                </tr>

                                            )
                                        )
                                    }

                                </tbody>

                            </table>

                        </div>

                        {/* Mobile */}

                        <div className="
                            md:hidden
                            divide-y
                            divide-gray-100
                        ">

                            {
                                recentOrders.map(
                                    (order) => (

                                        <div
                                            key={order.id}
                                            className="p-5"
                                        >

                                            <div className="
                                                flex
                                                items-start
                                                justify-between
                                            ">

                                                <div>

                                                    <p className="font-bold text-sm">
                                                        {order.id}
                                                    </p>

                                                    <p className="
                                                        text-sm
                                                        text-gray-500
                                                        mt-1
                                                    ">
                                                        {order.customer}
                                                    </p>

                                                </div>

                                                <span
                                                    className={`
                                                        px-2.5
                                                        py-1
                                                        rounded-full
                                                        text-xs
                                                        font-bold
                                                        ${getStatusStyle(
                                                            order.status
                                                        )}
                                                    `}
                                                >
                                                    {order.status}
                                                </span>

                                            </div>

                                            <div className="
                                                flex
                                                items-center
                                                justify-between
                                                mt-4
                                            ">

                                                <p className="
                                                    text-sm
                                                    text-gray-500
                                                ">
                                                    {order.product}
                                                </p>

                                                <p className="font-bold">
                                                    {order.amount}
                                                </p>

                                            </div>

                                        </div>

                                    )
                                )
                            }

                        </div>

                    </section>

                    {/* =========================
                        PRODUCTS
                    ========================= */}

                    <section className="
                        mt-6
                        bg-white
                        rounded-2xl
                        border
                        border-gray-100
                        overflow-hidden
                    ">

                        {/* Product Header */}

                        <div className="
                            p-6
                            flex
                            items-center
                            justify-between
                        ">

                            <div>

                                <p className="text-sm text-gray-400">
                                    Inventory
                                </p>

                                <h3 className="
                                    text-xl
                                    font-black
                                    mt-1
                                ">
                                    All Products
                                </h3>

                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/all-Product")
                                }
                                className="
                                    text-sm
                                    font-bold
                                    text-rose-500
                                    hover:text-rose-600
                                "
                            >
                                View All
                            </button>

                        </div>

                        {/* Product Table */}

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[1000px]">

                                <thead className="
                                    bg-gray-50
                                    border-y
                                    border-gray-100
                                ">

                                    <tr className="
                                        text-left
                                        text-xs
                                        uppercase
                                        tracking-wider
                                        text-gray-400
                                    ">

                                        <th className="
                                            px-6
                                            py-4
                                            font-semibold
                                        ">
                                            Product
                                        </th>

                                        <th className="
                                            px-6
                                            py-4
                                            font-semibold
                                        ">
                                            Category
                                        </th>

                                        <th className="
                                            px-6
                                            py-4
                                            font-semibold
                                        ">
                                            Price
                                        </th>

                                        <th className="
                                            px-6
                                            py-4
                                            font-semibold
                                        ">
                                            Stock
                                        </th>

                                        <th className="
                                            px-6
                                            py-4
                                            font-semibold
                                        ">
                                            Status
                                        </th>

                                        <th className="
                                            px-6
                                            py-4
                                            font-semibold
                                        ">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>

                                <tbody className="
                                    divide-y
                                    divide-gray-100
                                ">

                                    {
                                        products.length > 0 ? (

                                            products.map(
                                                (product) => {

                                                    const status =
                                                        getStockStatus({
                                                            quantity:
                                                                product.quantity,
                                                            lowStockThreshold:
                                                                product.lowStockThreshold,
                                                        });

                                                    return (

                                                        <tr
                                                            key={
                                                                product._id
                                                            }
                                                            className="
                                                                hover:bg-gray-50/70
                                                                transition
                                                            "
                                                        >

                                                            {/* Product */}

                                                            <td className="
                                                                px-6
                                                                py-5
                                                            ">

                                                                <div className="
                                                                    flex
                                                                    items-center
                                                                    gap-3
                                                                ">

                                                                    <div className="
                                                                        w-12
                                                                        h-12
                                                                        rounded-xl
                                                                        bg-gradient-to-br
                                                                        from-rose-50
                                                                        to-orange-50
                                                                        flex
                                                                        items-center
                                                                        justify-center
                                                                        text-rose-400
                                                                        overflow-hidden
                                                                        shrink-0
                                                                    ">

                                                                        {
                                                                            product
                                                                                .images
                                                                                ?.[
                                                                                0
                                                                            ] ? (

                                                                                <img
                                                                                    src={`http://localhost:5000/${product.images[0].replace(
                                                                                        /^\/+/,
                                                                                        ""
                                                                                    )}`}
                                                                                    alt={
                                                                                        product.productname
                                                                                    }
                                                                                    className="
                                                                                        w-full
                                                                                        h-full
                                                                                        object-cover
                                                                                    "
                                                                                />

                                                                            ) : (

                                                                                <FiShoppingBag className="text-xl" />

                                                                            )
                                                                        }

                                                                    </div>

                                                                    <div>

                                                                        <p className="
                                                                            font-bold
                                                                            text-sm
                                                                        ">
                                                                            {
                                                                                product.productname
                                                                            }
                                                                        </p>

                                                                        <p className="
                                                                            text-xs
                                                                            text-gray-400
                                                                            mt-1
                                                                        ">
                                                                            SKU:{" "}
                                                                            {
                                                                                product.sku
                                                                            }
                                                                        </p>

                                                                    </div>

                                                                </div>

                                                            </td>

                                                            {/* Category */}

                                                            <td className="
                                                                px-6
                                                                py-5
                                                            ">

                                                                <span className="
                                                                    text-sm
                                                                    text-gray-500
                                                                ">
                                                                    {
                                                                        product.category
                                                                    }
                                                                </span>

                                                            </td>

                                                            {/* Price */}

                                                            <td className="
                                                                px-6
                                                                py-5
                                                            ">

                                                                <span className="
                                                                    font-bold
                                                                    text-sm
                                                                ">
                                                                    ₹
                                                                    {
                                                                        Number(
                                                                            product.price
                                                                        ).toLocaleString(
                                                                            "en-IN"
                                                                        )
                                                                    }
                                                                </span>

                                                            </td>

                                                            {/* Stock */}

                                                            <td className="
                                                                px-6
                                                                py-5
                                                            ">

                                                                <span
                                                                    className={`
                                                                        text-sm
                                                                        font-semibold
                                                                        ${
                                                                            product.quantity ===
                                                                            0
                                                                                ? "text-red-500"
                                                                                : product.quantity <=
                                                                                  product.lowStockThreshold
                                                                                ? "text-yellow-500"
                                                                                : "text-gray-600"
                                                                        }
                                                                    `}
                                                                >
                                                                    {
                                                                        product.quantity
                                                                    }{" "}
                                                                    units
                                                                </span>

                                                            </td>

                                                            {/* Status */}

                                                            <td className="
                                                                px-6
                                                                py-5
                                                            ">

                                                                <span
                                                                    className={`
                                                                        inline-flex
                                                                        px-3
                                                                        py-1.5
                                                                        rounded-full
                                                                        text-xs
                                                                        font-bold
                                                                        ${status.className}
                                                                    `}
                                                                >
                                                                    {
                                                                        status.text
                                                                    }
                                                                </span>

                                                            </td>

                                                            {/* Actions */}

                                                            <td className="
                                                                px-6
                                                                py-5
                                                            ">

                                                                <div className="
                                                                    flex
                                                                    items-center
                                                                    gap-2
                                                                ">

                                                                    {/* View */}

                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            navigate(
                                                                                "/all-Product"
                                                                            )
                                                                        }
                                                                        className="
                                                                            w-9
                                                                            h-9
                                                                            rounded-lg
                                                                            bg-gray-50
                                                                            hover:bg-blue-50
                                                                            hover:text-blue-500
                                                                            flex
                                                                            items-center
                                                                            justify-center
                                                                            transition
                                                                        "
                                                                    >
                                                                        <FiEye />
                                                                    </button>

                                                                    {/* Edit */}

                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            navigate(
                                                                                "/all-Product"
                                                                            )
                                                                        }
                                                                        className="
                                                                            w-9
                                                                            h-9
                                                                            rounded-lg
                                                                            bg-gray-50
                                                                            hover:bg-rose-50
                                                                            hover:text-rose-500
                                                                            flex
                                                                            items-center
                                                                            justify-center
                                                                            transition
                                                                        "
                                                                    >
                                                                        <FiEdit2 />
                                                                    </button>

                                                                    {/* Delete */}

                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            deleteProduct(
                                                                                product._id
                                                                            )
                                                                        }
                                                                        className="
                                                                            w-9
                                                                            h-9
                                                                            rounded-lg
                                                                            bg-gray-50
                                                                            hover:bg-red-50
                                                                            hover:text-red-500
                                                                            flex
                                                                            items-center
                                                                            justify-center
                                                                            transition
                                                                        "
                                                                    >
                                                                        <FiTrash2 />
                                                                    </button>

                                                                </div>

                                                            </td>

                                                        </tr>

                                                    );
                                                }
                                            )

                                        ) : (

                                            <tr>

                                                <td
                                                    colSpan="6"
                                                    className="
                                                        px-6
                                                        py-12
                                                        text-center
                                                        text-sm
                                                        text-gray-400
                                                    "
                                                >
                                                    No products found
                                                </td>

                                            </tr>

                                        )
                                    }

                                </tbody>

                            </table>

                        </div>

                    </section>

                    {/* =========================
                        BOTTOM INFO
                    ========================= */}

                    <section className="
                        grid
                        sm:grid-cols-3
                        gap-5
                        mt-6
                        mb-8
                    ">

                        {/* Pending Delivery */}

                        <div className="
                            bg-white
                            border
                            border-gray-100
                            rounded-2xl
                            p-5
                            flex
                            items-center
                            gap-4
                        ">

                            <div className="
                                w-12
                                h-12
                                rounded-xl
                                bg-blue-50
                                text-blue-500
                                flex
                                items-center
                                justify-center
                            ">
                                <FiTruck />
                            </div>

                            <div>

                                <p className="
                                    text-xs
                                    text-gray-400
                                ">
                                    Pending Delivery
                                </p>

                                <p className="
                                    text-xl
                                    font-black
                                    mt-1
                                ">
                                    24
                                </p>

                            </div>

                        </div>

                        {/* Pending Orders */}

                        <div className="
                            bg-white
                            border
                            border-gray-100
                            rounded-2xl
                            p-5
                            flex
                            items-center
                            gap-4
                        ">

                            <div className="
                                w-12
                                h-12
                                rounded-xl
                                bg-yellow-50
                                text-yellow-500
                                flex
                                items-center
                                justify-center
                            ">
                                <FiClock />
                            </div>

                            <div>

                                <p className="
                                    text-xs
                                    text-gray-400
                                ">
                                    Pending Orders
                                </p>

                                <p className="
                                    text-xl
                                    font-black
                                    mt-1
                                ">
                                    18
                                </p>

                            </div>

                        </div>

                        {/* Completed Orders */}

                        <div className="
                            bg-white
                            border
                            border-gray-100
                            rounded-2xl
                            p-5
                            flex
                            items-center
                            gap-4
                        ">

                            <div className="
                                w-12
                                h-12
                                rounded-xl
                                bg-emerald-50
                                text-emerald-500
                                flex
                                items-center
                                justify-center
                            ">
                                <FiCheckCircle />
                            </div>

                            <div>

                                <p className="
                                    text-xs
                                    text-gray-400
                                ">
                                    Completed Orders
                                </p>

                                <p className="
                                    text-xl
                                    font-black
                                    mt-1
                                ">
                                    1,206
                                </p>

                            </div>

                        </div>

                    </section>

                </div>

            </main>

        </div>
    );
};

export default AdminHomePage;