import React, { useContext } from "react";
import { ProductConext } from "../context/ProductContext";

import {
    FiArrowUpRight,
    FiArrowDownRight,
    FiDollarSign,
    FiShoppingCart,
    FiPackage,
    FiUsers,
} from "react-icons/fi";

const Card = () => {

    const { products } = useContext(ProductConext);

    const stats = [
        {
            title: "Total Revenue",
            value: "₹500",
            change: "+12.5%",
            positive: true,
            icon: FiDollarSign,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-500",
        },
        {
            title: "Total Orders",
            value: "1,248",
            change: "+8.2%",
            positive: true,
            icon: FiShoppingCart,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500",
        },
        {
            title: "Total Products",
            value: products.length,
            change: "+4.6%",
            positive: true,
            icon: FiPackage,
            iconBg: "bg-rose-50",
            iconColor: "text-rose-500",
        },
        {
            title: "Total Users",
            value: "500",
            change: "-2.4%",
            positive: false,
            icon: FiUsers,
            iconBg: "bg-purple-50",
            iconColor: "text-purple-500",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

            {stats.map((stat) => {

                const Icon = stat.icon;

                return (
                    <div
                        key={stat.title}
                        className="
                            bg-white
                            rounded-2xl
                            border
                            border-gray-100
                            p-5
                            hover:shadow-lg
                            hover:shadow-gray-100
                            transition
                        "
                    >

                        <div className="flex items-start justify-between">

                            {/* Icon */}
                            <div
                                className={`
                                    w-12
                                    h-12
                                    rounded-xl
                                    ${stat.iconBg}
                                    ${stat.iconColor}
                                    flex
                                    items-center
                                    justify-center
                                `}
                            >
                                <Icon className="text-xl" />
                            </div>

                            {/* Percentage */}
                            <div
                                className={`
                                    flex
                                    items-center
                                    gap-1
                                    text-xs
                                    font-bold
                                    ${
                                        stat.positive
                                            ? "text-emerald-500"
                                            : "text-red-500"
                                    }
                                `}
                            >
                                {stat.positive ? (
                                    <FiArrowUpRight />
                                ) : (
                                    <FiArrowDownRight />
                                )}

                                {stat.change}
                            </div>

                        </div>

                        <p className="text-sm text-gray-400 mt-5">
                            {stat.title}
                        </p>

                        <h3 className="text-2xl font-black mt-1">
                            {stat.value}
                        </h3>

                    </div>
                );
            })}

        </div>
    );
};

export default Card;