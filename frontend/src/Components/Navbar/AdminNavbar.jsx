import React, { useContext } from "react";

import { FiBell } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";

const Admin = () => {

    const {
        user,
        isAuthenticated
    } = useContext(AuthContext);


    return (
        <nav className="w-full bg-white border-b border-gray-200">

           
            <div className="h-1 bg-[#4b3742]"></div>

            <div className="h-24 px-8 lg:px-10 flex items-center justify-between">

              
                <div>
                    <p className="text-sm text-gray-400 font-medium mb-1">
                        Welcome back,
                    </p>

                    <h1 className="text-3xl font-extrabold text-slate-900">
                        Admin Dashboard
                    </h1>
                </div>


                
                <div className="flex items-center gap-4">

                   
                    <button
                        className="relative w-12 h-12 rounded-xl bg-gray-50
                                   flex items-center justify-center
                                   text-gray-500
                                   hover:bg-gray-100
                                   transition"
                    >
                        <FiBell size={23} />

                        {/* Notification Dot */}
                        <span
                            className="absolute top-2 right-2
                                       w-2.5 h-2.5
                                       bg-rose-500
                                       rounded-full
                                       border-2 border-white"
                        ></span>
                    </button>


               
                    <div
                        className="w-12 h-12 rounded-full
                                   bg-gradient-to-br
                                   from-rose-500 to-orange-400
                                   flex items-center justify-center
                                   text-white text-xl font-bold"
                    >
                        {isAuthenticated && user?.username
                            ? user.username.charAt(0).toUpperCase()
                            : "A"
                        }
                    </div>

                </div>

            </div>

        </nav>
    );
};

export default Admin;