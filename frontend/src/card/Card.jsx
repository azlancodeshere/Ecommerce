
import React, { useCallback, useEffect, useState } from "react";
import api from "../api/api.js";

import {
    FiDollarSign,
    FiShoppingCart,
    FiPackage,
    FiUsers,
    FiRefreshCw,
} from "react-icons/fi";

const initialStats = {
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
};

const formatNumber = (value) => {
    return Number(value || 0).toLocaleString("en-IN");
};

const Card = () => {
    const [dashboardStats, setDashboardStats] = useState(initialStats);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchDashboardStats = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/dashboard/stats");
            const data = response.data?.data;

            if (!data) {
                throw new Error("Invalid dashboard response");
            }

            setDashboardStats({
                totalRevenue: Number(data.totalRevenue) || 0,
                totalOrders: Number(data.totalOrders) || 0,
                totalProducts: Number(data.totalProducts) || 0,
                totalUsers: Number(data.totalUsers) || 0,
            });
        } catch (err) {
            console.error(
                "Dashboard stats error:",
                err.response?.data || err.message
            );

            setError(
                err.response?.data?.message ||
                "Unable to load dashboard statistics."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboardStats();
    }, [fetchDashboardStats]);

    const stats = [
        {
            title: "Total Revenue",
            value: `₹${formatNumber(dashboardStats.totalRevenue)}`,
            icon: FiDollarSign,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-500",
        },
        {
            title: "Total Orders",
            value: formatNumber(dashboardStats.totalOrders),
            icon: FiShoppingCart,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500",
        },
        {
            title: "Total Products",
            value: formatNumber(dashboardStats.totalProducts),
            icon: FiPackage,
            iconBg: "bg-rose-50",
            iconColor: "text-rose-500",
        },
        {
            title: "Total Users",
            value: formatNumber(dashboardStats.totalUsers),
            icon: FiUsers,
            iconBg: "bg-purple-50",
            iconColor: "text-purple-500",
        },
    ];

    return (
        <div className="space-y-5">
            {error && (
                <div className="flex flex-col gap-3 rounded-xl border border-red-100 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-red-600">{error}</p>

                    <button
                        type="button"
                        onClick={fetchDashboardStats}
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <FiRefreshCw
                            className={loading ? "animate-spin" : ""}
                        />
                        Retry
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.title}
                            className="rounded-2xl border border-gray-100 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-100"
                        >
                            <div className="flex items-start justify-between">
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor}`}
                                >
                                    <Icon className="text-xl" />
                                </div>

                                {loading && (
                                    <span className="text-xs text-gray-400">
                                        Loading...
                                    </span>
                                )}
                            </div>

                            <p className="mt-5 text-sm font-medium text-gray-400">
                                {stat.title}
                            </p>

                            <h3 className="mt-1 text-2xl font-black text-gray-900">
                                {loading
                                    ? "..."
                                    : error
                                      ? "—"
                                      : stat.value}
                            </h3>

                            {!loading && !error && (
                                <p className="mt-2 text-xs text-gray-400">
                                    Current total
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Card;
