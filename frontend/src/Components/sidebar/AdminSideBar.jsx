import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FiMenu,
    FiX,
    FiGrid,
    FiPackage,
    FiShoppingCart,
    FiUsers,
    FiTag,
    FiPlus,
    FiSettings,
    FiLogOut,
    FiShoppingBag,
} from "react-icons/fi";

import { AuthContext } from "../../context/AuthContext";

const AdminSideBar = () => {
    const { user, isAuthenticated, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    
    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    

   
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setSidebarOpen(false);

            navigate("/login", {
                replace: true,
            });
        }
    };

    return (
        <>
          
            {!sidebarOpen && (
                <button
                    type="button"
                    onClick={() => setSidebarOpen(true)}
                    className="
                        fixed
                        top-4
                        left-4
                        z-[50]
                        lg:hidden
                        w-11
                        h-11
                        rounded-xl
                        bg-white
                        border
                        border-gray-200
                        shadow-lg
                        flex
                        items-center
                        justify-center
                        text-gray-700
                        hover:bg-gray-50
                        transition
                    "
                >
                    <FiMenu size={23} />
                </button>
            )}

          
            {sidebarOpen && (
                <div
                    onClick={closeSidebar}
                    className="
                        fixed
                        inset-0
                        bg-black/40
                        z-[60]
                        lg:hidden
                    "
                />
            )}

            
            <aside
                className={`
                    fixed
                    left-0
                    top-0
                    bottom-0
                    w-72
                    sm:w-80
                    lg:w-64
                    bg-white
                    border-r
                    border-gray-100
                    flex
                    flex-col
                    z-[70]
                    shadow-2xl
                    lg:shadow-none
                    transform
                    transition-transform
                    duration-300
                    ease-in-out
                    ${
                        sidebarOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }
                    lg:translate-x-0
                `}
            >
                
                <div
                    className="
                        h-20
                        px-5
                        flex
                        items-center
                        justify-between
                        border-b
                        border-gray-100
                        shrink-0
                    "
                >
                    <div className="flex items-center gap-3">

                        <div
                            className="
                                w-10
                                h-10
                                rounded-xl
                                bg-gradient-to-br
                                from-rose-500
                                to-orange-400
                                flex
                                items-center
                                justify-center
                                text-white
                                shadow-md
                                shadow-rose-100
                                shrink-0
                            "
                        >
                            <FiShoppingBag size={20} />
                        </div>

                        <div>
                            <h1
                                className="
                                    text-lg
                                    font-extrabold
                                    text-gray-900
                                    leading-tight
                                "
                            >
                                Shop
                                <span className="text-rose-500">
                                    Cart
                                </span>
                            </h1>

                            <p
                                className="
                                    text-[9px]
                                    text-gray-400
                                    uppercase
                                    tracking-[2px]
                                    mt-0.5
                                "
                            >
                                Admin Panel
                            </p>
                        </div>
                    </div>

                   
                    <button
                        type="button"
                        onClick={closeSidebar}
                        className="
                            lg:hidden
                            w-9
                            h-9
                            rounded-lg
                            flex
                            items-center
                            justify-center
                            text-gray-400
                            hover:bg-gray-100
                            hover:text-gray-700
                            transition
                        "
                    >
                        <FiX size={21} />
                    </button>
                </div>

             
                <div
                    className="
                        flex-1
                        px-4
                        py-8
                        overflow-y-auto
                        overscroll-contain
                    "
                >
                  
                    <div>
                        <p
                            className="
                                px-5
                                mb-5
                                text-xs
                                font-bold
                                text-gray-400
                                uppercase
                                tracking-[4px]
                            "
                        >
                            Main Menu
                        </p>

                        <nav className="space-y-1">

                           
                            <button
                                type="button"
                                onClick={() => {
                                     closeSidebar();
                                    navigate("/admin")}}
                                className="
                                    w-full
                                    flex
                                    items-center
                                    gap-4
                                    px-5
                                    py-3.5
                                    rounded-2xl
                                    bg-gradient-to-r
                                    from-rose-500
                                    to-orange-400
                                    text-white
                                    font-semibold
                                    text-base
                                    shadow-lg
                                    shadow-rose-100
                                    whitespace-nowrap
                                    transition
                                    active:scale-[0.98]
                                "
                            >
                                <FiGrid
                                    size={24}
                                    className="shrink-0"
                                />

                                <span>
                                    Dashboard
                                </span>
                            </button>

                          
                            <button
                                type="button"
                                onClick={() =>{
                                    closeSidebar();
                                    navigate("/all-product")}
                                }
                                className="
                                    w-full
                                    flex
                                    items-center
                                    gap-4
                                    px-5
                                    py-3.5
                                    rounded-2xl
                                    text-gray-500
                                    hover:bg-rose-50
                                    hover:text-rose-500
                                    transition
                                    text-base
                                    whitespace-nowrap
                                "
                            >
                                <FiPackage
                                    size={24}
                                    className="shrink-0"
                                />

                                <span>
                                    Products
                                </span>
                            </button>

                            {/* ORDERS */}
                            <button
                                type="button"
                                onClick={() => {
                                    closeSidebar();
                                   ;
                                }}
                                className="
                                    w-full
                                    flex
                                    items-center
                                    gap-4
                                    px-5
                                    py-3.5
                                    rounded-2xl
                                    text-gray-500
                                    hover:bg-rose-50
                                    hover:text-rose-500
                                    transition
                                    text-base
                                    whitespace-nowrap
                                "
                            >
                                <FiShoppingCart
                                    size={24}
                                    className="shrink-0"
                                />

                                <span>
                                    Orders
                                </span>
                            </button>

                            {/* CUSTOMERS */}
                            <button
                                type="button"
                                onClick={() => {
                                    closeSidebar();
                                    // Future route:
                                    // handleNavigate("/customers");
                                }}
                                className="
                                    w-full
                                    flex
                                    items-center
                                    gap-4
                                    px-5
                                    py-3.5
                                    rounded-2xl
                                    text-gray-500
                                    hover:bg-rose-50
                                    hover:text-rose-500
                                    transition
                                    text-base
                                    whitespace-nowrap
                                "
                            >
                                <FiUsers
                                    size={24}
                                    className="shrink-0"
                                />

                                <span>
                                    Customers
                                </span>
                            </button>

                            {/* CATEGORIES */}
                            <button
                                type="button"
                                onClick={() => {
                                    closeSidebar();
                                    // Future route:
                                    // handleNavigate("/categories");
                                }}
                                className="
                                    w-full
                                    flex
                                    items-center
                                    gap-4
                                    px-5
                                    py-3.5
                                    rounded-2xl
                                    text-gray-500
                                    hover:bg-rose-50
                                    hover:text-rose-500
                                    transition
                                    text-base
                                    whitespace-nowrap
                                "
                            >
                                <FiTag
                                    size={24}
                                    className="shrink-0"
                                />

                                <span>
                                    Categories
                                </span>
                            </button>

                        </nav>
                    </div>

                    {/* Management */}
                    <div className="mt-10">

                        <p
                            className="
                                px-5
                                mb-5
                                text-xs
                                font-bold
                                text-gray-400
                                uppercase
                                tracking-[4px]
                            "
                        >
                            Management
                        </p>

                        <nav className="space-y-1">

                            {/* ADD PRODUCT */}
                            <button
                                type="button"
                                onClick={() =>{
                                    closeSidebar();
                                    navigate("/add-product")}
                                }
                                className="
                                    w-full
                                    flex
                                    items-center
                                    gap-4
                                    px-5
                                    py-3.5
                                    rounded-2xl
                                    text-gray-500
                                    hover:bg-rose-50
                                    hover:text-rose-500
                                    transition
                                    text-base
                                    whitespace-nowrap
                                "
                            >
                                <FiPlus
                                    size={24}
                                    className="shrink-0"
                                />

                                <span>
                                    Add Product
                                </span>
                            </button>

                            {/* SETTINGS */}
                            <button
                                type="button"
                                onClick={() => {
                                    closeSidebar();
                                    // Future route:
                                    // handleNavigate("/settings");
                                }}
                                className="
                                    w-full
                                    flex
                                    items-center
                                    gap-4
                                    px-5
                                    py-3.5
                                    rounded-2xl
                                    text-gray-500
                                    hover:bg-rose-50
                                    hover:text-rose-500
                                    transition
                                    text-base
                                    whitespace-nowrap
                                "
                            >
                                <FiSettings
                                    size={24}
                                    className="shrink-0"
                                />

                                <span>
                                    Settings
                                </span>
                            </button>

                        </nav>
                    </div>
                </div>

                {/* Admin Profile */}
                <div
                    className="
                        p-4
                        border-t
                        border-gray-100
                        shrink-0
                    "
                >
                    <div
                        className="
                            flex
                            items-center
                            gap-3
                            p-3
                            rounded-2xl
                            bg-gray-50
                        "
                    >
                        {/* Profile initial */}
                        <div
                            className="
                                w-11
                                h-11
                                shrink-0
                                rounded-full
                                bg-gradient-to-br
                                from-rose-500
                                to-orange-400
                                flex
                                items-center
                                justify-center
                                text-white
                                text-lg
                                font-bold
                            "
                        >
                            {isAuthenticated &&
                                user?.username
                                    ?.charAt(0)
                                    ?.toUpperCase()}
                        </div>

                        {/* User info */}
                        <div
                            className="
                                flex-1
                                min-w-0
                            "
                        >
                            <p
                                className="
                                    font-bold
                                    text-sm
                                    text-gray-900
                                    truncate
                                "
                            >
                                {user?.username || "Admin"}
                            </p>

                            <p
                                className="
                                    text-xs
                                    text-gray-400
                                    truncate
                                "
                            >
                                {isAuthenticated &&
                                    user?.email}
                            </p>
                        </div>

                        {/* Logout */}
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="
                                shrink-0
                                w-9
                                h-9
                                rounded-lg
                                flex
                                items-center
                                justify-center
                                text-gray-400
                                hover:bg-red-50
                                hover:text-red-500
                                transition
                            "
                        >
                            <FiLogOut size={21} />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default AdminSideBar;