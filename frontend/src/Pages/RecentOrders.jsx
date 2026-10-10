import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FiPackage,
    FiMoreVertical,
    FiEye,
    FiX,
    FiRefreshCw,
    FiShoppingBag,
} from "react-icons/fi";

import api from "../api/api.js";

const formatAmount = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN")}`;

const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const statusConfig = {
    Placed: {
        label: "Pending",
        classes: "bg-amber-50 text-amber-600",
    },
    Pending: {
        label: "Pending",
        classes: "bg-amber-50 text-amber-600",
    },
    Processing: {
        label: "Processing",
        classes: "bg-blue-50 text-blue-600",
    },
    Shipped: {
        label: "Shipped",
        classes: "bg-violet-50 text-violet-600",
    },
    Delivered: {
        label: "Completed",
        classes: "bg-emerald-50 text-emerald-600",
    },
    Completed: {
        label: "Completed",
        classes: "bg-emerald-50 text-emerald-600",
    },
    Cancelled: {
        label: "Cancelled",
        classes: "bg-red-50 text-red-600",
    },
};

const RecentOrders = () => {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showAll, setShowAll] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const [openMenu, setOpenMenu] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        let active = true;

        const fetchOrders = async () => {
            try {
                setLoading(true);
                setError("");

                const limit = showAll ? 50 : 5;

                const response = await api.get(
                    `/dashboard/recent-orders?limit=${limit}`
                );

                if (active) {
                    setOrders(response.data?.data || []);
                }
            } catch (err) {
                console.error(
                    "Recent orders error:",
                    err.response?.data || err.message
                );

                if (active) {
                    setError(
                        err.response?.data?.message ||
                        "Unable to load recent orders."
                    );
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        fetchOrders();

        return () => {
            active = false;
        };
    }, [showAll, refreshKey]);

    return (
        <>
            <section className="w-full overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-sm">

                {/* Header */}
                <div className="flex flex-col justify-between gap-4 border-b border-gray-100 px-6 py-7 sm:flex-row sm:items-center sm:px-10">
                    <div>
                        <p className="text-sm font-medium text-gray-400 sm:text-base">
                            Store Activity
                        </p>

                        <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
                            Recent Orders
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowAll((previous) => !previous)}
                        className="self-start text-base font-bold text-rose-500 transition hover:text-rose-600 sm:self-center sm:text-lg"
                    >
                        {showAll ? "Show Less" : "View All"}
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px] border-collapse text-left">

                        <thead className="bg-gray-50">
                            <tr className="text-sm font-bold uppercase tracking-wider text-gray-400">
                                <th className="px-10 py-6">Order</th>
                                <th className="px-6 py-6">Customer</th>
                                <th className="px-6 py-6">Product</th>
                                <th className="px-6 py-6">Amount</th>
                                <th className="px-6 py-6">Status</th>
                                <th className="px-8 py-6 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-16 text-center text-gray-400"
                                    >
                                        <FiRefreshCw className="mx-auto mb-3 animate-spin text-2xl" />
                                        Loading recent orders...
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-16 text-center">
                                        <p className="text-sm text-red-500">
                                            {error}
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setRefreshKey((key) => key + 1)
                                            }
                                            className="mt-4 rounded-xl bg-rose-500 px-5 py-2.5 font-semibold text-white hover:bg-rose-600"
                                        >
                                            Try Again
                                        </button>
                                    </td>
                                </tr>
                            ) : orders.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-16 text-center"
                                    >
                                        <FiShoppingBag className="mx-auto mb-3 text-3xl text-gray-300" />

                                        <p className="font-semibold text-gray-700">
                                            No orders yet
                                        </p>

                                        <p className="mt-1 text-sm text-gray-400">
                                            Customer orders will appear here.
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => {
                                    const firstItem = order.items?.[0];

                                    const rawStatus =
                                        order.orderStatus || "Placed";

                                    const status =
                                        statusConfig[rawStatus] ||
                                        statusConfig.Placed;

                                    return (
                                        <tr
                                            key={order._id}
                                            className="border-t border-gray-100 transition hover:bg-gray-50/70"
                                        >
                                            {/* Order ID */}
                                            <td className="whitespace-nowrap px-10 py-7">
                                                <span className="font-bold text-gray-900">
                                                    #{order.orderNumber}
                                                </span>
                                            </td>

                                            {/* Customer */}
                                            <td className="px-6 py-7">
                                                <p className="whitespace-nowrap font-semibold text-gray-900">
                                                    {order.customerName}
                                                </p>

                                                <p className="mt-1 max-w-[210px] truncate text-sm text-gray-400">
                                                    {order.customerEmail}
                                                </p>
                                            </td>

                                            {/* Product */}
                                            <td className="px-6 py-7">
                                                <div className="flex min-w-[230px] items-center gap-4">
                                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-50 to-orange-50 text-rose-400">
                                                        <FiPackage className="text-2xl" />
                                                    </div>

                                                    <div>
                                                        <p className="font-semibold text-gray-900">
                                                            {firstItem?.productname ||
                                                                "Product unavailable"}
                                                        </p>

                                                        {order.items?.length > 1 && (
                                                            <p className="mt-1 text-xs text-gray-400">
                                                                +{order.items.length - 1} more products
                                                            </p>
                                                        )}

                                                        {firstItem?.quantity && (
                                                            <p className="mt-1 text-xs text-gray-400">
                                                                Qty: {firstItem.quantity}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Amount */}
                                            <td className="whitespace-nowrap px-6 py-7 font-bold text-gray-900">
                                                {formatAmount(order.totalAmount)}
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-7">
                                                <span
                                                    className={`inline-flex whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold ${status.classes}`}
                                                >
                                                    {status.label}
                                                </span>
                                            </td>

                                            {/* Action */}
                                            <td className="relative px-8 py-7 text-center">
                                                <button
                                                    type="button"
                                                    aria-label="Order actions"
                                                    onClick={() =>
                                                        setOpenMenu(
                                                            openMenu === order._id
                                                                ? null
                                                                : order._id
                                                        )
                                                    }
                                                    className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-gray-800 transition hover:bg-gray-100"
                                                >
                                                    <FiMoreVertical className="text-xl" />
                                                </button>

                                                {openMenu === order._id && (
                                                    <div className="absolute right-8 top-20 z-20 w-48 rounded-xl border border-gray-100 bg-white p-2 text-left shadow-xl">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedOrder(order);
                                                                setOpenMenu(null);
                                                            }}
                                                            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                                        >
                                                            <FiEye />
                                                            View Details
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                {!loading && !error && orders.length > 0 && (
                    <div className="flex flex-col gap-2 border-t border-gray-100 px-6 py-4 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between sm:px-10">
                        <span>
                            Showing {orders.length} order
                            {orders.length !== 1 ? "s" : ""}
                            {showAll ? " (up to 50 orders)" : ""}
                        </span>

                        <button
                            type="button"
                            onClick={() => setRefreshKey((key) => key + 1)}
                            className="inline-flex items-center gap-2 self-start font-semibold text-gray-500 hover:text-rose-500"
                        >
                            <FiRefreshCw />
                            Refresh
                        </button>
                    </div>
                )}
            </section>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 p-4"
                    onClick={() => setSelectedOrder(null)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="order-details-title"
                        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm text-gray-400">
                                    Order Details
                                </p>

                                <h3
                                    id="order-details-title"
                                    className="mt-1 text-2xl font-black text-gray-900"
                                >
                                    #{selectedOrder.orderNumber}
                                </h3>
                            </div>

                            <button
                                type="button"
                                aria-label="Close details"
                                onClick={() => setSelectedOrder(null)}
                                className="rounded-xl bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                            >
                                <FiX className="text-xl" />
                            </button>
                        </div>

                        <div className="mt-7 space-y-5">
                            <div>
                                <p className="text-xs font-semibold uppercase text-gray-400">
                                    Customer
                                </p>

                                <p className="mt-1 font-semibold text-gray-900">
                                    {selectedOrder.customerName}
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    {selectedOrder.customerEmail}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase text-gray-400">
                                    Products
                                </p>

                                <div className="mt-3 space-y-3">
                                    {selectedOrder.items?.map((item, index) => (
                                        <div
                                            key={`${selectedOrder._id}-${index}`}
                                            className="flex items-center justify-between gap-4 rounded-xl bg-gray-50 p-3"
                                        >
                                            <div>
                                                <p className="font-semibold text-gray-800">
                                                    {item.productname}
                                                </p>

                                                <p className="mt-1 text-sm text-gray-400">
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>

                                            <p className="whitespace-nowrap font-bold text-gray-900">
                                                {formatAmount(
                                                    Number(item.price) *
                                                    Number(item.quantity)
                                                )}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                <span className="text-gray-500">
                                    Order Total
                                </span>

                                <span className="text-xl font-black text-gray-900">
                                    {formatAmount(selectedOrder.totalAmount)}
                                </span>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase text-gray-400">
                                    Order Status
                                </p>

                                <p className="mt-1 font-semibold text-gray-800">
                                    {statusConfig[selectedOrder.orderStatus]?.label ||
                                        selectedOrder.orderStatus}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase text-gray-400">
                                    Payment
                                </p>

                                <p className="mt-1 font-semibold text-gray-800">
                                    {selectedOrder.paymentStatus}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase text-gray-400">
                                    Order Date
                                </p>

                                <p className="mt-1 font-semibold text-gray-800">
                                    {formatDate(selectedOrder.createdAt)}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setSelectedOrder(null)}
                            className="mt-7 w-full rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 px-5 py-3 font-bold text-white transition hover:opacity-90"
                        >
                            Close Details
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default RecentOrders;