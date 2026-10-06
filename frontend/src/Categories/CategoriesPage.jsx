import React, { useContext } from "react";
import { ProductConext } from "../context/ProductContext.jsx";

const CategoriesPage = () => {

    const { products } = useContext(ProductConext);

    const categories = [
        ...new Set(
            products.map((product) => product.category)
        )
    ];

    return (
        <div className="
            min-h-screen
            bg-gradient-to-br
            from-[#fff7f8]
            via-[#fffaf8]
            to-[#fff3ee]
            p-4
            sm:p-6
            lg:p-8
        ">

            <div className="max-w-7xl mx-auto">


                <div className="mb-8">

                    <p className="
                        text-xs
                        sm:text-sm
                        uppercase
                        tracking-[3px]
                        font-bold
                        text-rose-500
                        mb-2
                    ">
                        Inventory
                    </p>

                    <h1 className="
                        text-2xl
                        sm:text-3xl
                        font-black
                        text-rose-950
                    ">
                        Categories
                    </h1>

                    <p className="
                        text-sm
                        sm:text-base
                        text-rose-400
                        mt-2
                    ">
                        Manage your product categories
                    </p>

                </div>


            

                {categories.length > 0 ? (

                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        gap-6
                    ">

                        {categories.map((category, index) => {

                            const categoryProducts = products.filter(
                                (product) =>
                                    product.category === category
                            );

                            const cardColors = [
                                {
                                    bg: "from-rose-50 via-pink-50 to-orange-50",
                                    border: "border-rose-100",
                                    heading: "text-rose-950",
                                    sub: "text-rose-400",
                                    icon: "from-rose-500 to-pink-500",
                                    price: "text-rose-600",
                                },
                                {
                                    bg: "from-orange-50 via-amber-50 to-rose-50",
                                    border: "border-orange-100",
                                    heading: "text-orange-950",
                                    sub: "text-orange-500",
                                    icon: "from-orange-500 to-rose-500",
                                    price: "text-orange-600",
                                },
                                {
                                    bg: "from-pink-50 via-fuchsia-50 to-rose-50",
                                    border: "border-pink-100",
                                    heading: "text-pink-950",
                                    sub: "text-pink-500",
                                    icon: "from-fuchsia-500 to-pink-500",
                                    price: "text-pink-600",
                                },
                                {
                                    bg: "from-rose-50 via-orange-50 to-yellow-50",
                                    border: "border-rose-100",
                                    heading: "text-rose-950",
                                    sub: "text-rose-400",
                                    icon: "from-rose-500 to-orange-500",
                                    price: "text-rose-600",
                                },
                            ];

                            const theme =
                                cardColors[index % cardColors.length];

                            return (

                                <div
                                    key={category}
                                    className={`
                                        bg-gradient-to-br
                                        ${theme.bg}
                                        ${theme.border}
                                        border
                                        rounded-3xl
                                        p-5
                                        sm:p-6
                                        shadow-lg
                                        shadow-rose-100/40
                                        hover:shadow-xl
                                        hover:-translate-y-1
                                        transition-all
                                        duration-300
                                    `}
                                >
 
                                    <div className="
                                        flex
                                        items-center
                                        justify-between
                                        mb-6
                                    ">

                                        <div>

                                            <p className={`
                                                text-xs
                                                uppercase
                                                tracking-[2px]
                                                font-bold
                                                ${theme.sub}
                                            `}>
                                                Category
                                            </p>

                                            <h2 className={`
                                                text-xl
                                                sm:text-2xl
                                                font-black
                                                capitalize
                                                mt-1
                                                ${theme.heading}
                                            `}>
                                                {category}
                                            </h2>

                                            <p className={`
                                                text-sm
                                                mt-1
                                                ${theme.sub}
                                            `}>
                                                {categoryProducts.length}{" "}
                                                {categoryProducts.length === 1
                                                    ? "Product"
                                                    : "Products"}
                                            </p>

                                        </div>


                                        {/* Icon */}

                                        <div className={`
                                            w-12
                                            h-12
                                            sm:w-14
                                            sm:h-14
                                            rounded-2xl
                                            bg-gradient-to-br
                                            ${theme.icon}
                                            flex
                                            items-center
                                            justify-center
                                            text-white
                                            text-xl
                                            shadow-lg
                                            shrink-0
                                        `}>
                                            📦
                                        </div>

                                    </div>


                                   

                                    <div className="space-y-3">

                                        {categoryProducts.map(
                                            (product) => (

                                                <div
                                                    key={product._id}
                                                    className="
                                                        flex
                                                        flex-col
                                                        sm:flex-row
                                                        sm:items-center
                                                        sm:justify-between
                                                        gap-3
                                                        border
                                                        border-white/80
                                                        bg-white/75
                                                        rounded-2xl
                                                        p-4
                                                        backdrop-blur-sm
                                                        hover:bg-white
                                                        hover:shadow-md
                                                        transition
                                                    "
                                                >

                                                   

                                                    <div className="
                                                        flex
                                                        items-center
                                                        gap-3
                                                        min-w-0
                                                    ">

                                                        <div className="
                                                            w-12
                                                            h-12
                                                            rounded-xl
                                                            bg-gradient-to-br
                                                            from-white
                                                            to-rose-50
                                                            border
                                                            border-rose-100
                                                            overflow-hidden
                                                            shrink-0
                                                            flex
                                                            items-center
                                                            justify-center
                                                        ">

                                                            {product.images?.[0] ? (

                                                                <img
                                                                    src={`http://localhost:5000/${product.images[0].replace(
                                                                        /^\/+/,
                                                                        ""
                                                                    )}`}
                                                                    alt={
                                                                        product.productname
                                                                    }
                                                                    className="
                                                                        w-full
                                                                        h-full
                                                                        object-cover
                                                                    "
                                                                />

                                                            ) : (

                                                                <span className="text-lg">
                                                                    🛍️
                                                                </span>

                                                            )}

                                                        </div>


                                                        <div className="min-w-0">

                                                            <h3 className="
                                                                font-bold
                                                                text-sm
                                                                sm:text-base
                                                                text-slate-800
                                                                truncate
                                                            ">
                                                                {
                                                                    product.productname
                                                                }
                                                            </h3>

                                                            <p className={`
                                                                text-xs
                                                                sm:text-sm
                                                                mt-1
                                                                ${theme.sub}
                                                            `}>
                                                                SKU:{" "}
                                                                {product.sku}
                                                            </p>

                                                        </div>

                                                    </div>


                                                    {/* Price & Stock */}

                                                    <div className="
                                                        flex
                                                        items-center
                                                        justify-between
                                                        sm:flex-col
                                                        sm:items-end
                                                        gap-1
                                                    ">

                                                        <p className={`
                                                            text-base
                                                            sm:text-lg
                                                            font-black
                                                            ${theme.price}
                                                        `}>
                                                            ₹
                                                            {Number(
                                                                product.price
                                                            ).toLocaleString(
                                                                "en-IN"
                                                            )}
                                                        </p>

                                                        <p className="
                                                            text-xs
                                                            sm:text-sm
                                                            font-medium
                                                            text-slate-500
                                                        ">
                                                            Stock:{" "}
                                                            {product.quantity}
                                                        </p>

                                                    </div>

                                                </div>

                                            )
                                        )}

                                    </div>

                                </div>

                            );
                        })}

                    </div>

                ) : (

                   

                    <div className="
                        min-h-[300px]
                        rounded-3xl
                        border
                        border-rose-100
                        bg-gradient-to-br
                        from-white
                        via-rose-50
                        to-orange-50
                        flex
                        items-center
                        justify-center
                        shadow-lg
                        shadow-rose-100/40
                    ">

                        <div className="text-center">

                            <div className="
                                w-16
                                h-16
                                mx-auto
                                rounded-2xl
                                bg-gradient-to-br
                                from-rose-500
                                to-orange-500
                                flex
                                items-center
                                justify-center
                                text-2xl
                                shadow-lg
                                shadow-rose-200
                            ">
                                📦
                            </div>

                            <h2 className="
                                text-xl
                                font-black
                                text-rose-950
                                mt-4
                            ">
                                No Categories Found
                            </h2>

                            <p className="
                                mt-2
                                text-sm
                                text-rose-400
                            ">
                                Add some products to see categories.
                            </p>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
};

export default CategoriesPage;