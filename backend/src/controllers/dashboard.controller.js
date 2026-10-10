
import { Order } from "../models/order.model.js";
import { User } from "../models/user.models.js";
import { Product } from "../models/product.model.js";

const getDashboardStats = async (req, res) => {
    try {
        const [
            revenueResult,
            totalOrders,
            totalUsers,
            totalProducts
        ] = await Promise.all([
            // Revenue from all non-cancelled orders
            Order.aggregate([
                {
                    $match: {
                        orderStatus: { $ne: "Cancelled" }
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalRevenue: {
                            $sum: "$totalAmount"
                        }
                    }
                }
            ]),

            // Total non-cancelled orders
            Order.countDocuments({
                orderStatus: { $ne: "Cancelled" }
            }),

            // Total customers
            User.countDocuments({
                role: "user"
            }),

            // Total products
            Product.countDocuments({})
        ]);

        return res.status(200).json({
            success: true,
            message: "Dashboard stats fetched successfully",
            data: {
                totalRevenue: revenueResult[0]?.totalRevenue || 0,
                totalOrders,
                totalUsers,
                totalProducts
            }
        });

    } catch (error) {
        console.error("Dashboard stats error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard statistics"
        });
    }
};


const getRevenueAnalytics = async (req, res) => {
    try {
        const period = req.query.period === "30days" ? "30days" : "7days";
        const days = period === "30days" ? 30 : 7;

        // Use India Standard Time for daily revenue
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

        const todayKey = getIndiaDateKey(new Date());
        const [year, month, day] = todayKey.split("-").map(Number);

        const startDay = new Date(
            Date.UTC(year, month - 1, day - days + 1)
        );

        const startKey = [
            startDay.getUTCFullYear(),
            String(startDay.getUTCMonth() + 1).padStart(2, "0"),
            String(startDay.getUTCDate()).padStart(2, "0"),
        ].join("-");

        const startDate = new Date(`${startKey}T00:00:00+05:30`);
        const endDate = new Date(`${todayKey}T23:59:59.999+05:30`);

        const revenueData = await Order.aggregate([
            {
                $match: {
                    orderStatus: { $ne: "Cancelled" },
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate,
                    },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$createdAt",
                            timezone: "Asia/Kolkata",
                        },
                    },
                    revenue: { $sum: "$totalAmount" },
                    orders: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        return res.status(200).json({
            success: true,
            message: "Revenue analytics fetched successfully",
            data: revenueData.map((item) => ({
                date: item._id,
                revenue: item.revenue,
                orders: item.orders,
            })),
        });
    } catch (error) {
        console.error("Revenue analytics error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch revenue analytics",
        });
    }
};


const getRecentOrders = async (req, res) => {
    try {
        const requestedLimit = Number.parseInt(req.query.limit, 10) || 5;
        const limit = Math.min(Math.max(requestedLimit, 1), 50);

        const orders = await Order.find({})
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate("user", "username email")
            .lean();

        const data = orders.map((order) => ({
            _id: String(order._id),

            orderNumber: `ORD-${String(order._id)
                .slice(-6)
                .toUpperCase()}`,

            customerName:
                order.shippingAddress?.fullName ||
                order.user?.username ||
                "Customer",

            customerEmail: order.user?.email || "Email unavailable",

            items: order.items || [],

            totalAmount: Number(order.totalAmount) || 0,

            orderStatus: order.orderStatus || "Placed",

            paymentStatus: order.paymentStatus || "Pending",

            createdAt: order.createdAt,
        }));

        return res.status(200).json({
            success: true,
            message: "Recent orders fetched successfully",
            data,
        });
    } catch (error) {
        console.error("Recent orders error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch recent orders",
        });
    }
};

export { getDashboardStats,getRevenueAnalytics,getRecentOrders,};
