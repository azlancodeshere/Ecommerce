import React, { useEffect, useMemo, useState } from "react";
import api from "../api/api.js";

const formatCurrency = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

const getIndiaDateKey = (date) => {
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(date);

    const values = Object.fromEntries(
        parts
            .filter((part) => part.type !== "literal")
            .map((part) => [part.type, part.value])
    );

    return `${values.year}-${values.month}-${values.day}`;
};

const RevenueAnalytics = () => {
    const [period, setPeriod] = useState("7days");
    const [revenueData, setRevenueData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        const fetchRevenue = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(
                    `/dashboard/revenue?period=${period}`
                );

                if (!cancelled) {
                    setRevenueData(response.data?.data || []);
                }
            } catch (err) {
                console.error(
                    "Revenue analytics error:",
                    err.response?.data || err.message
                );

                if (!cancelled) {
                    setError(
                        "Unable to load revenue analytics. Please try again."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchRevenue();

        return () => {
            cancelled = true;
        };
    }, [period]);

    const chartData = useMemo(() => {
        const days = period === "30days" ? 30 : 7;
        const todayKey = getIndiaDateKey(new Date());
        const [year, month, day] = todayKey.split("-").map(Number);

        const revenueMap = new Map(
            revenueData.map((item) => [
                item.date,
                Number(item.revenue) || 0,
            ])
        );

        return Array.from({ length: days }, (_, index) => {
            const date = new Date(
                Date.UTC(year, month - 1, day - days + index + 1)
            );

            const dateKey = [
                date.getUTCFullYear(),
                String(date.getUTCMonth() + 1).padStart(2, "0"),
                String(date.getUTCDate()).padStart(2, "0"),
            ].join("-");

            const dateObject = new Date(
                `${dateKey}T00:00:00+05:30`
            );

            let label;

            if (period === "7days") {
                label = dateObject.toLocaleDateString("en-IN", {
                    weekday: "short",
                    timeZone: "Asia/Kolkata",
                });
            } else if (
                index === 0 ||
                index === days - 1 ||
                index % 5 === 0
            ) {
                label = dateObject.toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    timeZone: "Asia/Kolkata",
                });
            } else {
                label = "";
            }

            return {
                date: dateKey,
                label,
                revenue: revenueMap.get(dateKey) || 0,
            };
        });
    }, [period, revenueData]);

    const maxRevenue = Math.max(
        1,
        ...chartData.map((item) => item.revenue)
    );

    const totalRevenue = chartData.reduce(
        (total, item) => total + item.revenue,
        0
    );

    return (
        <section className="w-full rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                    <p className="text-sm font-medium text-gray-400">
                        Overview
                    </p>

                    <h2 className="mt-2 text-2xl font-black text-gray-900 sm:text-3xl">
                        Revenue Analytics
                    </h2>

                    <p className="mt-2 text-sm text-gray-400">
                        Total: {formatCurrency(totalRevenue)}
                    </p>
                </div>

                <select
                    value={period}
                    onChange={(event) => setPeriod(event.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-800 outline-none transition focus:border-rose-300 sm:w-auto"
                    aria-label="Revenue chart date range"
                >
                    <option value="7days">Last 7 Days</option>
                    <option value="30days">Last 30 Days</option>
                </select>
            </div>

            {error ? (
                <div className="mt-8 rounded-xl bg-red-50 p-5 text-sm text-red-600">
                    <p>{error}</p>

                    <button
                        type="button"
                        onClick={() => setPeriod((current) => current)}
                        className="mt-3 font-semibold underline"
                    >
                        Change the date range to retry.
                    </button>
                </div>
            ) : (
                <>
                    {loading && (
                        <p className="mt-5 text-sm text-gray-400">
                            Loading revenue data...
                        </p>
                    )}

                    <div className="mt-8 overflow-x-auto">
                        <div
                            className={`grid h-[300px] items-stretch gap-3 sm:gap-5 ${
                                period === "30days"
                                    ? "min-w-[780px]"
                                    : "min-w-0"
                            }`}
                            style={{
                                gridTemplateColumns: `repeat(${chartData.length}, minmax(0, 1fr))`,
                            }}
                        >
                            {chartData.map((item) => {
                                const barHeight =
                                    item.revenue > 0
                                        ? Math.max(
                                              4,
                                              (item.revenue / maxRevenue) * 100
                                          )
                                        : 0;

                                return (
                                    <div
                                        key={item.date}
                                        className="flex min-w-0 flex-col items-center justify-end"
                                    >
                                        <div
                                            className="flex h-[260px] w-full items-end justify-center"
                                            title={`${item.date}: ${formatCurrency(item.revenue)}`}
                                        >
                                            <div
                                                className="w-full max-w-[74px] rounded-t-2xl bg-gradient-to-t from-rose-500 to-orange-300 transition-all duration-500"
                                                style={{
                                                    height: `${barHeight}%`,
                                                }}
                                            />
                                        </div>

                                        <span className="mt-5 h-5 whitespace-nowrap text-xs text-gray-400 sm:text-sm">
                                            {item.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {!loading &&
                        chartData.every((item) => item.revenue === 0) && (
                            <p className="mt-4 text-center text-sm text-gray-400">
                                No order revenue recorded for this period.
                            </p>
                        )}
                </>
            )}
        </section>
    );
};

export default RevenueAnalytics;