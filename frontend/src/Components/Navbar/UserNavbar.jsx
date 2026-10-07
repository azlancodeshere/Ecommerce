import React, { useContext } from 'react'
import {
  FiShoppingBag,
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiArrowRight,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiStar,
  FiChevronRight,
} from "react-icons/fi";
import { AuthContext } from '../../context/AuthContext';

const UserNavbar = () => {


    const {  user, isAuthenticated,} = useContext(AuthContext)

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
   
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
   
             <div className="h-20 flex items-center justify-between gap-6">
   
               {/* Logo */}
               <div className="flex items-center gap-3 shrink-0">
   
                 <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-400 flex items-center justify-center text-white shadow-lg shadow-rose-200">
                   <FiShoppingBag className="text-xl" />
                 </div>
   
                 <div className="hidden sm:block">
                   <h1 className="text-xl font-extrabold tracking-tight">
                     Shop<span className="text-rose-500">Cart</span>
                   </h1>
   
                   <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                     Everything you love
                   </p>
                 </div>
   
               </div>
   
               {/* Desktop Navigation */}
               <div className="hidden lg:flex items-center gap-8">
   
                 <a
                   href="#home"
                   className="text-sm font-semibold text-rose-500"
                 >
                   Home
                 </a>
   
                 <a
                   href="#products"
                   className="text-sm font-medium text-gray-600 hover:text-rose-500 transition"
                 >
                   Products
                 </a>
   
                 <a
                   href="#categories"
                   className="text-sm font-medium text-gray-600 hover:text-rose-500 transition"
                 >
                   Categories
                 </a>
   
                 <a
                   href="#deals"
                   className="text-sm font-medium text-gray-600 hover:text-rose-500 transition"
                 >
                   Deals
                 </a>
   
               </div>
   
               {/* Search */}
               <div className="hidden md:flex flex-1 max-w-sm">
   
                 <div className="w-full relative">
   
                   <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
   
                   <input
                     type="text"
                     placeholder="Search products..."
                     className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:bg-white focus:border-rose-300 focus:ring-4 focus:ring-rose-50 transition"
                   />
   
                 </div>
   
               </div>
   
               {/* Right Actions */}
               <div className="flex items-center gap-2">
   
                 <button className="w-10 h-10 rounded-xl hover:bg-rose-50 flex items-center justify-center transition">
                   <FiHeart className="text-xl text-gray-600 hover:text-rose-500" />
                 </button>
   
                 <button className="relative w-10 h-10 rounded-xl hover:bg-rose-50 flex items-center justify-center transition">
   
                   <FiShoppingCart className="text-xl text-gray-600" />
   
                   <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                     2
                   </span>
   
                 </button>
   
                 <button className="hidden sm:flex items-center gap-2 ml-2 pl-3 border-l border-gray-200">
   
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-500 to-orange-400 flex items-center justify-center text-white font-bold">
    {isAuthenticated ? (
        <span className="text-xs">
            {user?.username?.charAt(0).toUpperCase()}
        </span>
    ) : (
        <FiUser />
    )}
</div>
   
                   <div className="hidden xl:block text-left">
                     <p className="text-xs text-gray-400">
                       Welcome
                     </p>
   
                     <p className="text-sm font-bold">
                       User
                     </p>
                   </div>
   
                 </button>
   
               </div>
   
             </div>
   
             {/* Mobile Search */}
             <div className="md:hidden pb-4">
   
               <div className="relative">
   
                 <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
   
                 <input
                   type="text"
                   placeholder="Search products..."
                   className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:bg-white focus:border-rose-300 transition"
                 />
   
               </div>
   
             </div>
   
           </div>
         </nav>
  )
}

export default UserNavbar