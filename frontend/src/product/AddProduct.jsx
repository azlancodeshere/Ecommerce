import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

const AddProduct = () => {

    const [showImagePicker, setShowImagePicker] = useState(false);

    const [imageUrl, setImageUrl] = useState("");
    



    const [formData, setFormData] = useState({
        productname: "",
        sku: "",
        price: "",
        quantity: "",
        category: "",
        lowStockThreshold: "",
        description: "",
        images: []
    });

    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleAddImage = () => {

        const url = imageUrl.trim();

        if (!url) {
            return;
        }

        if (formData.images.includes(url)) {
            return;
        }

        setFormData((prev) => ({
            ...prev,
            images: [
                ...prev.images,
                url
            ]
        }));

        setImageUrl("");
        setShowImagePicker(false);
    };


    const handleRemoveImage = (imageUrl) => {

        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter(
                (image) => image !== imageUrl
            )
        }));

    };

    


    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log("SENDING API REQUEST...");

        const response = await api.post(
            "/products/create-product",
            formData
        );

        console.log("CREATE PRODUCT RESPONSE:", response.data);

        alert("Product created successfully");

      

        navigate("/admin", { replace: true });

    } catch (error) {
        console.error("CREATE PRODUCT ERROR:", error);

        console.error(
            "ERROR RESPONSE:",
            error.response?.data
        );

        alert(
            error.response?.data?.message ||
            "Something went wrong while creating product"
        );
    }
};
  

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fff7f8] via-[#fffaf8] to-[#fff4ef] text-slate-800">

            <main className="lg:ml-64 min-h-screen">

                <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-10">

                    {/* Page Header */}
                    <div className="mb-8">

                        <p className="text-sm text-rose-500 font-bold mb-1">
                            Inventory
                        </p>

                        <h1 className="text-3xl sm:text-4xl font-extrabold text-rose-950">
                            Add Product
                        </h1>

                        <p className="text-sm text-rose-400 mt-2">
                            Create a new product and add it to your inventory
                        </p>

                    </div>


                    {/* Main Card */}
                    <div className="
                        bg-gradient-to-br
                        from-white
                        via-rose-50/40
                        to-orange-50/40
                        rounded-3xl
                        border
                        border-rose-100
                        shadow-xl
                        shadow-rose-100/40
                        overflow-hidden
                    ">


                        {/* Card Header */}
                        <div className="
                            px-5
                            sm:px-8
                            lg:px-10
                            py-7
                            bg-gradient-to-r
                            from-rose-100/70
                            via-pink-50
                            to-orange-100/60
                            border-b
                            border-rose-100
                        ">

                            <div className="flex items-center gap-4">

                                <div className="
                                    w-12
                                    h-12
                                    rounded-2xl
                                    bg-gradient-to-br
                                    from-rose-500
                                    to-orange-400
                                    flex
                                    items-center
                                    justify-center
                                    shadow-lg
                                    shadow-rose-200
                                ">

                                    <svg
                                        width="25"
                                        height="25"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="1.8"
                                    >
                                        <path d="M20 7.5L12 3 4 7.5v9L12 21l8-4.5v-9Z" />
                                        <path d="M4 7.5l8 4.5 8-4.5" />
                                        <path d="M12 12v9" />
                                    </svg>

                                </div>


                                <div>

                                    <h2 className="text-xl font-extrabold text-rose-950">
                                        Product Information
                                    </h2>

                                    <p className="text-sm text-rose-400 mt-1">
                                        Add details about your new product
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* Form */}
                        <form 
                        onSubmit={handleSubmit}
                        className="p-5 sm:p-8 lg:p-10">

                            {/* Basic Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                                {/* Product Name */}
                                <div>

                                    <label className="block text-sm font-bold text-rose-950 mb-2">
                                        Product Name
                                    </label>

                                    <input
                                        type="text"
                                        name="productname"
                                        onChange={handleChange}
                                        value={formData.productname}
                                        placeholder="Enter product name"
                                        className="
                                            w-full
                                            h-14
                                            px-5
                                            rounded-2xl
                                            bg-white
                                            border
                                            border-rose-100
                                            text-slate-800
                                            placeholder:text-rose-200
                                            shadow-sm
                                            outline-none
                                            focus:border-rose-400
                                            focus:ring-4
                                            focus:ring-rose-100
                                            transition
                                        "
                                    />

                                </div>


                                {/* SKU */}
                                <div>

                                    <label className="block text-sm font-bold text-rose-950 mb-2">
                                        SKU
                                    </label>

                                    <input
                                        type="text"
                                        name="sku"
                                        onChange={handleChange}
                                        value={formData.sku}
                                        placeholder="e.g. SHOE-001"
                                        className="
                                            w-full
                                            h-14
                                            px-5
                                            rounded-2xl
                                            bg-white
                                            border
                                            border-rose-100
                                            text-slate-800
                                            placeholder:text-rose-200
                                            shadow-sm
                                            outline-none
                                            focus:border-rose-400
                                            focus:ring-4
                                            focus:ring-rose-100
                                            transition
                                        "
                                    />

                                </div>


                                {/* Price */}
                                <div>

                                    <label className="block text-sm font-bold text-rose-950 mb-2">
                                        Price
                                    </label>

                                    <div className="relative">

                                        <span className="
                                            absolute
                                            left-5
                                            top-1/2
                                            -translate-y-1/2
                                            text-rose-500
                                            font-bold
                                        ">
                                            ₹
                                        </span>

                                        <input
                                            type="number"
                                            name="price"
                                            onChange={handleChange}
                                            value={formData.price}
                                            placeholder="0.00"
                                            className="
                                                w-full
                                                h-14
                                                pl-10
                                                pr-5
                                                rounded-2xl
                                                bg-white
                                                border
                                                border-rose-100
                                                text-slate-800
                                                placeholder:text-rose-200
                                                shadow-sm
                                                outline-none
                                                focus:border-rose-400
                                                focus:ring-4
                                                focus:ring-rose-100
                                                transition
                                            "
                                        />

                                    </div>

                                </div>


                                {/* Quantity */}
                                <div>

                                    <label className="block text-sm font-bold text-rose-950 mb-2">
                                        Quantity
                                    </label>

                                    <input
                                        type="number"
                                        name="quantity"
                                        onChange={handleChange}
                                        value={formData.quantity}
                                        placeholder="Enter quantity"
                                        className="
                                            w-full
                                            h-14
                                            px-5
                                            rounded-2xl
                                            bg-white
                                            border
                                            border-rose-100
                                            text-slate-800
                                            placeholder:text-rose-200
                                            shadow-sm
                                            outline-none
                                            focus:border-rose-400
                                            focus:ring-4
                                            focus:ring-rose-100
                                            transition
                                        "
                                    />

                                </div>


                                {/* Category */}
                                <div>

                                    <label className="block text-sm font-bold text-rose-950 mb-2">
                                        Category
                                    </label>

                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="
                                            w-full
                                            h-14
                                            px-5
                                            rounded-2xl
                                            bg-white
                                            border
                                            border-rose-100
                                            text-rose-950
                                            shadow-sm
                                            outline-none
                                            focus:border-rose-400
                                            focus:ring-4
                                            focus:ring-rose-100
                                            transition
                                        "
                                    >

                                        <option value="">
                                            Select category
                                        </option>

                                        <option value="clothing">
                                            Clothing
                                        </option>

                                        <option value="shoes">
                                            Shoes
                                        </option>

                                        <option value="perfume">
                                            Perfume
                                        </option>

                                    </select>

                                </div>


                                {/* Low Stock Threshold */}
                                <div>

                                    <label className="block text-sm font-bold text-rose-950 mb-2">
                                        Low Stock Threshold
                                    </label>

                                    <input
                                        type="number"
                                        name="lowStockThreshold"
                                        onChange={handleChange}
                                        value={formData.lowStockThreshold}
                                        placeholder="10"
                                        className="
                                            w-full
                                            h-14
                                            px-5
                                            rounded-2xl
                                            bg-white
                                            border
                                            border-rose-100
                                            text-slate-800
                                            placeholder:text-rose-200
                                            shadow-sm
                                            outline-none
                                            focus:border-rose-400
                                            focus:ring-4
                                            focus:ring-rose-100
                                            transition
                                        "
                                    />

                                    <p className="text-xs text-rose-300 mt-2 ml-1">
                                        Alert when stock reaches this level
                                    </p>

                                </div>

                            </div>


                            {/* Description */}
                            <div className="mt-7">

                                <label className="block text-sm font-bold text-rose-950 mb-2">
                                    Description
                                </label>

                                <textarea
                                    rows="5"
                                    placeholder="Enter product description..."
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="
                                        w-full
                                        px-5
                                        py-4
                                        rounded-2xl
                                        bg-white
                                        border
                                        border-rose-100
                                        text-slate-800
                                        placeholder:text-rose-200
                                        shadow-sm
                                        outline-none
                                        resize-none
                                        focus:border-rose-400
                                        focus:ring-4
                                        focus:ring-rose-100
                                        transition
                                    "
                                />

                            </div>


                            {/* Product Images */}
                            <div className="mt-7">

                                <label className="block text-sm font-bold text-rose-950 mb-2">
                                    Product Images
                                </label>


                                {/* Upload Box */}
                                <div className="
                                    border-2
                                    border-dashed
                                    border-rose-200
                                    bg-gradient-to-br
                                    from-rose-100/70
                                    via-pink-50
                                    to-orange-100/70
                                    rounded-3xl
                                    p-8
                                    sm:p-10
                                    text-center
                                    hover:border-rose-400
                                    hover:shadow-lg
                                    hover:shadow-rose-100
                                    transition
                                ">

                                    <div className="
                                        w-16
                                        h-16
                                        mx-auto
                                        rounded-2xl
                                        bg-white
                                        shadow-md
                                        shadow-rose-100
                                        flex
                                        items-center
                                        justify-center
                                        mb-4
                                    ">

                                        <svg
                                            width="28"
                                            height="28"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            className="text-rose-500"
                                        >
                                            <path d="M12 16V4" />
                                            <path d="M8 8l4-4 4 4" />
                                            <path d="M4 14v5a1 1 0 001 1h14a1 1 0 001-1v-5" />
                                        </svg>

                                    </div>


                                    <p className="text-base font-extrabold text-rose-950">
                                        Add product images
                                    </p>

                                    <p className="text-sm text-rose-400 mt-1">
                                        Paste an image URL from your public folder
                                    </p>


                                    <button
                                        type="button"
                                        onClick={() => setShowImagePicker(true)}
                                        className="
                                            mt-5
                                            px-6
                                            py-3
                                            rounded-xl
                                            bg-gradient-to-r
                                            from-rose-500
                                            to-orange-400
                                            text-white
                                            text-sm
                                            font-bold
                                            shadow-md
                                            shadow-rose-200
                                            hover:shadow-lg
                                            hover:scale-[1.02]
                                            transition
                                        "
                                    >
                                        Choose Images
                                    </button>

                                </div>


                                {/* Selected Images */}
                                {formData.images.length > 0 && (

                                    <div className="mt-6">

                                        <div className="flex items-center justify-between mb-3">

                                            <p className="text-sm font-bold text-rose-950">
                                                Selected Images
                                            </p>

                                            <span className="
                                                px-3
                                                py-1
                                                rounded-full
                                                bg-rose-50
                                                text-rose-500
                                                text-xs
                                                font-bold
                                            ">
                                                {formData.images.length} selected
                                            </span>

                                        </div>


                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

                                            {formData.images.map((image, index) => (

                                                <div
                                                    key={`${image}-${index}`}
                                                    className="
                                                        relative
                                                        overflow-hidden
                                                        rounded-2xl
                                                        border
                                                        border-rose-100
                                                        bg-white
                                                        shadow-sm
                                                    "
                                                >

                                                    <img
                                                        src={image}
                                                        alt={`Product ${index + 1}`}
                                                        className="
                                                            w-full
                                                            h-36
                                                            object-cover
                                                        "
                                                    />


                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveImage(image)}
                                                        className="
                                                            absolute
                                                            top-2
                                                            right-2
                                                            w-8
                                                            h-8
                                                            rounded-full
                                                            bg-white
                                                            text-rose-500
                                                            font-bold
                                                            shadow-md
                                                            hover:bg-rose-50
                                                            transition
                                                        "
                                                    >
                                                        ×
                                                    </button>

                                                </div>

                                            ))}

                                        </div>

                                    </div>

                                )}

                            </div>


                            {/* Bottom Buttons */}
                            <div className="
                                flex
                                flex-col-reverse
                                sm:flex-row
                                justify-end
                                gap-3
                                mt-9
                                pt-7
                                border-t
                                border-rose-100
                            ">

                                <button
                                    type="button"
                                    className="
                                        w-full
                                        sm:w-auto
                                        px-7
                                        h-12
                                        rounded-xl
                                        bg-rose-50
                                        border
                                        border-rose-100
                                        text-rose-600
                                        font-bold
                                        hover:bg-rose-100
                                        transition
                                    "
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    className="
                                        w-full
                                        sm:w-auto
                                        px-8
                                        h-12
                                        rounded-xl
                                        bg-gradient-to-r
                                        from-rose-500
                                        via-pink-500
                                        to-orange-400
                                        text-white
                                        font-bold
                                        shadow-lg
                                        shadow-rose-200
                                        hover:shadow-xl
                                        hover:shadow-rose-200
                                        hover:-translate-y-0.5
                                        transition
                                    "
                                >
                                    Add Product
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </main>




            {/* Image URL Modal */}
            {showImagePicker && (

                <div className="
                    fixed
                    inset-0
                    z-[100]
                    flex
                    items-center
                    justify-center
                    bg-rose-950/40
                    backdrop-blur-sm
                    px-4
                ">

                    <div className="
                        w-full
                        max-w-lg
                        bg-white
                        rounded-3xl
                        border
                        border-rose-100
                        shadow-2xl
                        overflow-hidden
                    ">

                        {/* Modal Header */}
                        <div className="
                            px-6
                            py-5
                            bg-gradient-to-r
                            from-rose-100
                            via-pink-50
                            to-orange-100
                            border-b
                            border-rose-100
                            flex
                            items-center
                            justify-between
                            gap-4
                        ">

                            <div>

                                <h2 className="text-xl font-extrabold text-rose-950">
                                    Add Product Image
                                </h2>

                                <p className="text-sm text-rose-400 mt-1">
                                    Enter the image URL
                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={() => {
                                    setShowImagePicker(false);
                                    setImageUrl("");
                                }}
                                className="
                                    w-10
                                    h-10
                                    rounded-xl
                                    bg-white
                                    border
                                    border-rose-100
                                    text-rose-500
                                    text-xl
                                    font-bold
                                    hover:bg-rose-50
                                    transition
                                "
                            >
                                ×
                            </button>

                        </div>


                        {/* Modal Body */}
                        <div className="p-6">

                            <label className="block text-sm font-bold text-rose-950 mb-2">
                                Image URL
                            </label>

                            <input
                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="/images/shoes/nike-shoe-1.jpeg"
                                className="
                                    w-full
                                    h-14
                                    px-5
                                    rounded-2xl
                                    bg-rose-50/40
                                    border
                                    border-rose-100
                                    text-slate-800
                                    placeholder:text-rose-200
                                    outline-none
                                    focus:bg-white
                                    focus:border-rose-400
                                    focus:ring-4
                                    focus:ring-rose-100
                                    transition
                                "
                            />


                            {/* Preview */}
                            {imageUrl.trim() && (

                                <div className="mt-5">

                                    <p className="text-sm font-bold text-rose-950 mb-2">
                                        Image Preview
                                    </p>

                                    <div className="
                                        rounded-2xl
                                        border
                                        border-rose-100
                                        bg-rose-50/40
                                        overflow-hidden
                                        p-3
                                    ">

                                        <img
                                            src={imageUrl.trim()}
                                            alt="Image Preview"
                                            className="
                                                w-full
                                                h-56
                                                object-contain
                                                rounded-xl
                                            "
                                        />

                                    </div>

                                </div>

                            )}

                        </div>


                        {/* Modal Footer */}
                        <div className="
                            px-6
                            py-4
                            border-t
                            border-rose-100
                            bg-rose-50/40
                            flex
                            justify-end
                            gap-3
                        ">

                            <button
                                type="button"
                                onClick={() => {
                                    setShowImagePicker(false);
                                    setImageUrl("");
                                }}
                                className="
                                    px-6
                                    h-11
                                    rounded-xl
                                    bg-white
                                    border
                                    border-rose-100
                                    text-rose-600
                                    font-bold
                                    hover:bg-rose-50
                                    transition
                                "
                            >
                                Cancel
                            </button>


                            <button
                                type="button"
                                onClick={handleAddImage}
                                className="
                                    px-6
                                    h-11
                                    rounded-xl
                                    bg-gradient-to-r
                                    from-rose-500
                                    to-orange-400
                                    text-white
                                    font-bold
                                    shadow-md
                                    shadow-rose-200
                                    hover:shadow-lg
                                    transition
                                "
                            >
                                Add Image
                            </button>

                        </div>

                    </div>

                </div>

            )}




        </div>
    );
};

export default AddProduct;