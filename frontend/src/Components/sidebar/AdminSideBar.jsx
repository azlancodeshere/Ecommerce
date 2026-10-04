import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  FiGrid,
  FiPackage,
  FiShoppingCart,
  FiUsers,
  FiTag,
  FiPlus,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import { AuthContext } from "../../context/AuthContext";



const AdminSideBar = () => {

  const { user, isAuthenticated, logout } = useContext(AuthContext)

  const navigate = useNavigate()



  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-100 flex flex-col z-50">


      <div className="flex-1 px-4 py-8 overflow-y-auto">


        <div>

          <p className="px-5 mb-5 text-xs font-bold text-gray-400 uppercase tracking-[4px]">
            Main Menu
          </p>

          <nav className="space-y-1">


            <button
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



            <button
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


            <button
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



            <button
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



        <div className="mt-10">

          <p className="px-5 mb-5 text-xs font-bold text-gray-400 uppercase tracking-[4px]">
            Management
          </p>

          <nav className="space-y-1">


            <button
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



            <button
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


      <div className="p-4 border-t border-gray-100">

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50">


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
              user?.username?.charAt(0)?.toUpperCase()
            }


          </div>



          <div className="flex-1 min-w-0">

            <p className="font-bold text-sm text-gray-900 truncate">
              Admin
            </p>

            <p className="text-xs text-gray-400 truncate">
              {isAuthenticated &&
                user?.email}
            </p>

          </div>



          <button
            onClick={async () => {
              await logout();
              navigate("/login", {
                replace: true
              })
            }}
            className="
                            shrink-0
                            text-gray-400
                            hover:text-red-500
                            transition
                        "
          >
            <FiLogOut size={21} />
          </button>

        </div>

      </div>

    </aside>
  );
};

export default AdminSideBar;