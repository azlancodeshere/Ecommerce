import React from "react";
import {
  FiShoppingBag,
  FiGrid,
  FiPackage,
  FiShoppingCart,
  FiUsers,
  FiTag,
  FiPlus,
  FiSettings,
  FiLogOut,
  
 
  FiMoreVertical,
  FiArrowUpRight,
  FiArrowDownRight,
  FiDollarSign,
  FiTruck,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiEdit2,
  FiTrash2,
  FiEye,
} from "react-icons/fi";


import AdminNavbar from "../Components/Navbar/AdminNavbar";

const AdminHomePage = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "₹1,25,500",
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
      value: "356",
      change: "+4.6%",
      positive: true,
      icon: FiPackage,
      iconBg: "bg-rose-50",
      iconColor: "text-rose-500",
    },
    {
      title: "Total Users",
      value: "8,549",
      change: "-2.4%",
      positive: false,
      icon: FiUsers,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-500",
    },
  ];

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

  const products = [
    {
      id: 1,
      name: "Premium Oversized T-Shirt",
      category: "Clothing",
      price: "₹999",
      stock: 42,
      status: "Active",
    },
    {
      id: 2,
      name: "Air Runner Sneakers",
      category: "Shoes",
      price: "₹2,499",
      stock: 18,
      status: "Active",
    },
    {
      id: 3,
      name: "Luxury Oud Perfume",
      category: "Perfume",
      price: "₹1,799",
      stock: 7,
      status: "Low Stock",
    },
    {
      id: 4,
      name: "Classic Leather Bag",
      category: "Accessories",
      price: "₹2,199",
      stock: 0,
      status: "Out of Stock",
    },
  ];

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

      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <aside className="fixed left-0 top-0 bottom-0 hidden lg:flex w-64 bg-white border-r border-gray-100 flex-col z-50">

        {/* Logo */}
        <div className="h-20 px-6 flex items-center gap-3 border-b border-gray-100">

          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 to-orange-400 flex items-center justify-center text-white shadow-lg shadow-rose-100">
            <FiShoppingBag className="text-xl" />
          </div>

          <div>
            <h1 className="text-xl font-extrabold">
              Shop<span className="text-rose-500">Cart</span>
            </h1>

            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
              Admin Panel
            </p>
          </div>

        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 py-6 overflow-y-auto">

          <p className="px-3 mb-3 text-[10px] font-bold text-gray-400 uppercase tracking-[2px]">
            Main Menu
          </p>

          <nav className="space-y-1">

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 text-white font-semibold shadow-lg shadow-rose-100">
              <FiGrid />
              Dashboard
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-rose-50 hover:text-rose-500 transition">
              <FiPackage />
              Products
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-rose-50 hover:text-rose-500 transition">
              <FiShoppingCart />
              Orders
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-rose-50 hover:text-rose-500 transition">
              <FiUsers />
              Customers
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-rose-50 hover:text-rose-500 transition">
              <FiTag />
              Categories
            </button>

          </nav>

          <p className="px-3 mt-8 mb-3 text-[10px] font-bold text-gray-400 uppercase tracking-[2px]">
            Management
          </p>

          <nav className="space-y-1">

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-rose-50 hover:text-rose-500 transition">
              <FiPlus />
              Add Product
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-rose-50 hover:text-rose-500 transition">
              <FiSettings />
              Settings
            </button>

          </nav>

        </div>

        {/* Admin Profile */}
        <div className="p-4 border-t border-gray-100">

          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">

            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-orange-400 flex items-center justify-center text-white font-bold">
              A
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate">
                Admin
              </p>

              <p className="text-xs text-gray-400 truncate">
                admin@shopcart.com
              </p>
            </div>

            <button className="text-gray-400 hover:text-red-500">
              <FiLogOut />
            </button>

          </div>

        </div>

      </aside>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <main className="lg:ml-64">

      
        <AdminNavbar/>




        
        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">

          {/* =================================================
              STATS
          ================================================== */}
          <section>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

              {stats.map((stat) => {

                const Icon = stat.icon;

                return (
                  <div
                    key={stat.title}
                    className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:shadow-gray-100 transition"
                  >

                    <div className="flex items-start justify-between">

                      <div
                        className={`w-12 h-12 rounded-xl ${stat.iconBg} ${stat.iconColor} flex items-center justify-center`}
                      >
                        <Icon className="text-xl" />
                      </div>

                      <div
                        className={`flex items-center gap-1 text-xs font-bold ${
                          stat.positive
                            ? "text-emerald-500"
                            : "text-red-500"
                        }`}
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

          </section>

          {/* =================================================
              REVENUE + QUICK ACTIONS
          ================================================== */}
          <section className="grid xl:grid-cols-3 gap-6 mt-6">

            {/* Revenue Chart */}
            <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-400">
                    Overview
                  </p>

                  <h3 className="text-xl font-black mt-1">
                    Revenue Analytics
                  </h3>
                </div>

                <select className="px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm outline-none">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 3 Months</option>
                </select>

              </div>

              {/* Fake Chart UI */}
              <div className="mt-8 h-56 flex items-end gap-3 sm:gap-5">

                {[45, 62, 50, 78, 58, 85, 72, 95, 68, 88, 76, 100].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex-1 h-full flex items-end"
                    >
                      <div
                        className="w-full bg-gradient-to-t from-rose-500 to-orange-300 rounded-t-lg hover:from-rose-600 hover:to-orange-400 transition"
                        style={{
                          height: `${height}%`,
                        }}
                      />
                    </div>
                  )
                )}

              </div>

              <div className="flex justify-between text-xs text-gray-400 mt-3">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>

            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-gray-950 to-gray-800 rounded-2xl p-6 text-white">

              <p className="text-gray-400 text-sm">
                Quick Actions
              </p>

              <h3 className="text-xl font-black mt-1">
                Manage Store
              </h3>

              <div className="grid grid-cols-2 gap-3 mt-6">

                <button className="p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-left transition">

                  <FiPlus className="text-xl text-rose-400" />

                  <p className="font-bold text-sm mt-3">
                    Add Product
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Create new
                  </p>

                </button>

                <button className="p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-left transition">

                  <FiPackage className="text-xl text-orange-400" />

                  <p className="font-bold text-sm mt-3">
                    Products
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Manage items
                  </p>

                </button>

                <button className="p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-left transition">

                  <FiShoppingCart className="text-xl text-blue-400" />

                  <p className="font-bold text-sm mt-3">
                    Orders
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    View orders
                  </p>

                </button>

                <button className="p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-left transition">

                  <FiUsers className="text-xl text-purple-400" />

                  <p className="font-bold text-sm mt-3">
                    Customers
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Manage users
                  </p>

                </button>

              </div>

            </div>

          </section>

          {/* =================================================
              RECENT ORDERS
          ================================================== */}
          <section className="mt-6 bg-white rounded-2xl border border-gray-100 overflow-hidden">

            <div className="p-6 flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-400">
                  Store Activity
                </p>

                <h3 className="text-xl font-black mt-1">
                  Recent Orders
                </h3>
              </div>

              <button className="text-sm font-bold text-rose-500 hover:text-rose-600">
                View All
              </button>

            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-50 border-y border-gray-100">

                  <tr className="text-left text-xs uppercase tracking-wider text-gray-400">

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

                  {recentOrders.map((order) => (

                    <tr
                      key={order.id}
                      className="hover:bg-gray-50/70 transition"
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

                        <p className="text-xs text-gray-400 mt-1">
                          {order.email}
                        </p>

                      </td>

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-50 to-orange-50 flex items-center justify-center text-rose-400">
                            <FiPackage />
                          </div>

                          <span className="text-sm font-medium">
                            {order.product}
                          </span>

                        </div>

                      </td>

                      <td className="px-6 py-5">

                        <span className="font-bold text-sm">
                          {order.amount}
                        </span>

                      </td>

                      <td className="px-6 py-5">

                        <span
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${getStatusStyle(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>

                      </td>

                      <td className="px-6 py-5">

                        <button className="w-9 h-9 rounded-lg bg-gray-50 hover:bg-rose-50 hover:text-rose-500 flex items-center justify-center transition">
                          <FiMoreVertical />
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {/* Mobile Orders */}
            <div className="md:hidden divide-y divide-gray-100">

              {recentOrders.map((order) => (

                <div
                  key={order.id}
                  className="p-5"
                >

                  <div className="flex items-start justify-between">

                    <div>
                      <p className="font-bold text-sm">
                        {order.id}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        {order.customer}
                      </p>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusStyle(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>

                  </div>

                  <div className="flex items-center justify-between mt-4">

                    <p className="text-sm text-gray-500">
                      {order.product}
                    </p>

                    <p className="font-bold">
                      {order.amount}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </section>

          {/* =================================================
              PRODUCTS
          ================================================== */}
          <section className="mt-6 bg-white rounded-2xl border border-gray-100 overflow-hidden">

            <div className="p-6 flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-400">
                  Inventory
                </p>

                <h3 className="text-xl font-black mt-1">
                  Products
                </h3>
              </div>

              <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 text-white text-sm font-bold flex items-center gap-2 shadow-lg shadow-rose-100 hover:shadow-xl transition">
                <FiPlus />
                Add Product
              </button>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-50 border-y border-gray-100">

                  <tr className="text-left text-xs uppercase tracking-wider text-gray-400">

                    <th className="px-6 py-4 font-semibold">
                      Product
                    </th>

                    <th className="px-6 py-4 font-semibold">
                      Category
                    </th>

                    <th className="px-6 py-4 font-semibold">
                      Price
                    </th>

                    <th className="px-6 py-4 font-semibold">
                      Stock
                    </th>

                    <th className="px-6 py-4 font-semibold">
                      Status
                    </th>

                    <th className="px-6 py-4 font-semibold">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-gray-100">

                  {products.map((product) => (

                    <tr
                      key={product.id}
                      className="hover:bg-gray-50/70 transition"
                    >

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-50 to-orange-50 flex items-center justify-center text-rose-400">
                            <FiShoppingBag className="text-xl" />
                          </div>

                          <div>
                            <p className="font-bold text-sm">
                              {product.name}
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                              Product #{product.id}
                            </p>
                          </div>

                        </div>

                      </td>

                      <td className="px-6 py-5">

                        <span className="text-sm text-gray-500">
                          {product.category}
                        </span>

                      </td>

                      <td className="px-6 py-5">

                        <span className="font-bold text-sm">
                          {product.price}
                        </span>

                      </td>

                      <td className="px-6 py-5">

                        <span
                          className={`text-sm font-semibold ${
                            product.stock === 0
                              ? "text-red-500"
                              : product.stock < 10
                              ? "text-yellow-500"
                              : "text-gray-600"
                          }`}
                        >
                          {product.stock} units
                        </span>

                      </td>

                      <td className="px-6 py-5">

                        <span
                          className={`inline-flex px-3 py-1.5 rounded-full text-xs font-bold ${getStatusStyle(
                            product.status
                          )}`}
                        >
                          {product.status}
                        </span>

                      </td>

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2">

                          <button className="w-9 h-9 rounded-lg bg-gray-50 hover:bg-blue-50 hover:text-blue-500 flex items-center justify-center transition">
                            <FiEye />
                          </button>

                          <button className="w-9 h-9 rounded-lg bg-gray-50 hover:bg-rose-50 hover:text-rose-500 flex items-center justify-center transition">
                            <FiEdit2 />
                          </button>

                          <button className="w-9 h-9 rounded-lg bg-gray-50 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition">
                            <FiTrash2 />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>

          {/* =================================================
              BOTTOM INFO
          ================================================== */}
          <section className="grid sm:grid-cols-3 gap-5 mt-6 mb-8">

            <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                <FiTruck />
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Pending Delivery
                </p>

                <p className="text-xl font-black mt-1">
                  24
                </p>
              </div>

            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-yellow-50 text-yellow-500 flex items-center justify-center">
                <FiClock />
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Pending Orders
                </p>

                <p className="text-xl font-black mt-1">
                  18
                </p>
              </div>

            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
                <FiCheckCircle />
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Completed Orders
                </p>

                <p className="text-xl font-black mt-1">
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