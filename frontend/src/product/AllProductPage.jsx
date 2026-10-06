import React from "react";
import { FiGrid, FiSearch } from "react-icons/fi";
import api from "../api/api.js";
import { useState, useEffect } from "react";
import AddProduct from "./AddProduct.jsx";



const AllProductPage = () => {

const [products, setProducts] = useState([]);
const [newProducts , setNewProducts] = useState(null)
const [search, setSearch] = useState("")
const [category, setCategory] = useState("")


const getProducts = async () =>{

    try {
        const response = await api.get("/products/all-products");
       
        setProducts(response.data.data);

        
    } catch (error) {

        console.log("Error in getting all products:", error)
        
    }
}


const searchProducts = products.filter((product)=>{
    const matchSearch = product.productname
    .toLowerCase()
    .includes(search.toLowerCase()) ||
    product.sku.toLowerCase().includes(search.toLowerCase());

    const matchCategory = category === "" || product.category === category;

    return matchSearch && matchCategory;
})



const getStockStatus = ({ quantity, lowStockThreshold }) => {
    if (quantity === 0) {
        return (
            <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium whitespace-nowrap">
                Out of Stock
            </span>
        );
    }

    if (quantity <= lowStockThreshold) {
        return (
            <span className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium whitespace-nowrap">
                Low Stock
            </span>
        );
    }

    return (
        <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium whitespace-nowrap">
            In Stock
        </span>
    );
};

useEffect(()=>{
    getProducts()
},[])

 const updateProduct = (product) =>{
    setNewProducts(product);
 }


 const deleteProduct = async (id) =>{
    try {
        const response = await api.delete(
            `/products/delete-product/${id}`
        );

       setProducts((prevProducts)=>{
       return prevProducts.filter(
            (product)=> product._id !== id
        )
       })
        
    } catch (error) {
         console.log("Delete error:", error);
            console.log("Server error:", error.response?.data);
    }
 }


    return (
        <div className="
            min-h-screen
            bg-gradient-to-br
            from-[#fff7f8]
            via-[#fffaf8]
            to-[#fff4ef]
            text-slate-800
        ">

            
            <div className="
                h-11
                bg-gradient-to-r
                from-rose-900
                via-pink-800
                to-orange-700
                flex
                items-center
                px-5
                shadow-sm
            ">
                <FiGrid
                    size={20}
                    className="text-white"
                />
            </div>

          
            <main className="
                px-4
                sm:px-6
                lg:px-10
                py-8
            ">

               
                <div className="
                    flex
                    flex-col
                    lg:flex-row
                    lg:items-start
                    lg:justify-between
                    gap-6
                    mb-8
                ">

                   
                    <div>
                        <p className="
                            text-sm
                            font-bold
                            uppercase
                            tracking-[3px]
                            text-rose-500
                            mb-2
                        ">
                            Inventory
                        </p>

                        <h1 className="
                            text-3xl
                            sm:text-4xl
                            font-extrabold
                            text-rose-950
                        ">
                            All Products
                        </h1>

                        <p className="
                            mt-2
                            text-base
                            sm:text-lg
                            text-rose-400
                        ">
                            Manage your inventory products
                        </p>
                    </div>

                   
                    <div className="
                        flex
                        flex-col
                        sm:flex-row
                        gap-4
                        sm:gap-8
                    ">

                       
                        <div className="
                            min-w-[190px]
                            px-5
                            py-4
                            rounded-2xl
                            bg-white/80
                            border
                            border-rose-100
                            shadow-sm
                        ">
                            <p className="
                                text-sm
                                font-semibold
                                text-rose-400
                            ">
                                Total Products
                            </p>

                            <p className="
                                mt-1
                                text-2xl
                                font-extrabold
                                text-rose-950
                            ">
                                {products.length}
                            </p>
                        </div>

                        
                        <div className="
                            min-w-[190px]
                            px-5
                            py-4
                            rounded-2xl
                            bg-white/80
                            border
                            border-orange-100
                            shadow-sm
                        ">
                            <p className="
                                text-sm
                                font-semibold
                                text-orange-400
                            ">
                                Total Stock
                            </p>

                            <p className="
                                mt-1
                                text-2xl
                                font-extrabold
                                text-orange-700
                            ">
                               {products.reduce(
                                (total,product)=>
                                    total + (Number(product.quantity) || 0),
                                0
                               )}
                            </p>
                        </div>

                    </div>

                </div>


               
                <div className="
                    flex
                    flex-col
                    md:flex-row
                    gap-4
                    mb-7
                ">

                   
                    <div className="
                        relative
                        w-full
                        md:max-w-[650px]
                    ">

                        <FiSearch
                            size={22}
                            className="
                                absolute
                                left-5
                                top-1/2
                                -translate-y-1/2
                                text-rose-300
                            "
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products..."
                            className="
                                w-full
                                h-14
                                pl-14
                                pr-5
                                rounded-2xl
                                bg-white
                                border
                                border-rose-100
                                text-slate-700
                                placeholder:text-rose-300
                                outline-none
                                shadow-sm
                                focus:border-rose-400
                                focus:ring-4
                                focus:ring-rose-100
                                transition
                            "
                        />

                    </div>


                   
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="
                            w-full
                            md:w-[280px]
                            h-14
                            px-5
                            rounded-2xl
                            bg-white
                            border
                            border-orange-100
                            text-rose-900
                            outline-none
                            shadow-sm
                            focus:border-orange-400
                            focus:ring-4
                            focus:ring-orange-100
                            transition
                        "
                    >

                        <option value="">
                            All Categories
                        </option>

                        <option value="shoes">
                            Shoes
                        </option>

                        <option value="clothing">
                            Clothing
                        </option>

                        <option value="perfume">
                            Perfume
                        </option>

                    </select>

                </div>


                <div className="
                    bg-white/90
                    rounded-3xl
                    border
                    border-rose-100
                    shadow-xl
                    shadow-rose-100/40
                    overflow-hidden
                ">

                    <div className="overflow-x-auto">

                        <table className="
                            w-full
                            min-w-[1250px]
                            border-collapse
                        ">

                            <thead>

                                <tr className="
                                    bg-gradient-to-r
                                    from-rose-100/80
                                    via-pink-50
                                    to-orange-100/70
                                    border-b
                                    border-rose-100
                                ">

                                    <th className="
                                        text-left
                                        px-7
                                        py-6
                                        text-sm
                                        font-extrabold
                                        text-rose-950
                                    ">
                                        Product
                                    </th>

                                    <th className="
                                        text-left
                                        px-6
                                        py-6
                                        text-sm
                                        font-extrabold
                                        text-rose-950
                                    ">
                                        SKU
                                    </th>

                                    <th className="
                                        text-left
                                        px-6
                                        py-6
                                        text-sm
                                        font-extrabold
                                        text-rose-950
                                    ">
                                        Category
                                    </th>

                                    <th className="
                                        text-left
                                        px-6
                                        py-6
                                        text-sm
                                        font-extrabold
                                        text-rose-950
                                    ">
                                        Price
                                    </th>

                                    <th className="
                                        text-left
                                        px-6
                                        py-6
                                        text-sm
                                        font-extrabold
                                        text-rose-950
                                    ">
                                        Quantity
                                    </th>

                                    <th className="
                                        text-left
                                        px-6
                                        py-6
                                        text-sm
                                        font-extrabold
                                        text-rose-950
                                    ">
                                        Status
                                    </th>

                                    <th className="
                                        text-left
                                        px-6
                                        py-6
                                        text-sm
                                        font-extrabold
                                        text-rose-950
                                    ">
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            

                           
                         <tbody>
    {searchProducts.map((product) => (
        <tr
            key={product._id}
            className="
                border-b
                border-rose-100
                hover:bg-rose-50/30
                transition
            "
        >

          
            <td className="px-7 py-6">
                <div className="flex items-center gap-4">

                    <div className="
                        w-20
                        h-20
                        shrink-0
                        rounded-2xl
                        overflow-hidden
                        bg-gradient-to-br
                        from-rose-50
                        to-orange-50
                        border
                        border-rose-100
                        shadow-sm
                    ">
                        
            <img
    src={`http://localhost:5000/${product.images?.[0]?.replace(/^\/+/, "")}`}
    alt={product.productname}
    className="w-full h-full object-cover"
/>
                    </div>

                    <div>
                        <p className="
                            text-lg
                            font-extrabold
                            text-rose-950
                        ">
                            {product.productname}
                        </p>

                        
                    </div>

                </div>
            </td>

           

            <td className="
                px-6
                py-6
                text-sm
                font-semibold
                text-rose-700
            ">
                {product.sku}
            </td>

            

            <td className="px-6 py-6">
                <span className="
                    inline-flex
                    px-4
                    py-2
                    rounded-full
                    bg-rose-50
                    border
                    border-rose-100
                    text-rose-600
                    text-sm
                    font-bold
                ">
                    {product.category}
                </span>
            </td>

          
          
            <td className="
                px-6
                py-6
                text-base
                font-extrabold
                text-rose-950
            ">
                ₹{Number(product.price).toLocaleString("en-IN")}
            </td>

            
            <td className="
                px-6
                py-6
                text-base
                font-bold
                text-rose-900
            ">
                {product.quantity}
            </td>

           
            <td className="px-6 py-6">
                <span className="
                    inline-flex
                    px-4
                    py-2
                    rounded-full
                    bg-emerald-50
                    border
                    border-emerald-100
                    text-emerald-600
                    text-sm
                    font-bold
                ">
                   {getStockStatus ({
                    quantity: product.quantity,
                    lowStockThreshold:product.lowStockThreshold
                   })}
                </span>
            </td>

           
           

            <td className="px-6 py-6">
                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    <button
                        type="button"
                         onClick={()=> 
                            updateProduct(product)
                         }
                        className="
                            px-5
                            py-3
                            rounded-xl
                            bg-gradient-to-r
                            from-rose-500
                            to-orange-400
                            text-white
                            font-bold
                            shadow-md
                            shadow-rose-200
                            hover:shadow-lg
                            hover:-translate-y-0.5
                            transition
                            whitespace-nowrap
                        "
                    >
                        Add Stock
                    </button>

                    <button
                    onClick={()=>
                        deleteProduct(product._id)
                    }
                        type="button"
                        className="
                            px-5
                            py-3
                            rounded-xl
                            bg-gradient-to-r
                            from-pink-500
                            to-rose-500
                            text-white
                            font-bold
                            shadow-md
                            shadow-pink-200
                            hover:shadow-lg
                            hover:-translate-y-0.5
                            transition
                            whitespace-nowrap
                        "
                    >
                        Remove Stock
                    </button>

                </div>
            </td>

        </tr>
    ))}
</tbody>
                       
                        </table>


                      {newProducts && (
                    <AddProduct
                        product={newProducts}
                        onClose={(updatedProduct) => {
                            if (updatedProduct) {
                                setProducts((prevProducts) =>
                                    prevProducts.map((product) =>
                                        product._id === updatedProduct._id
                                            ? updatedProduct
                                            : product
                                    )
                                );
                            }

                            setNewProducts(null);
                        }}
                    />
                    )}
                    </div>

                </div>

            </main>

        </div>
    );
};

export default AllProductPage;