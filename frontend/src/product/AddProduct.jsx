import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const MAX_IMAGES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const AddProduct = ({product, onClose}) => {
    const navigate = useNavigate();

    const [imagePreviews, setImagePreviews] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);


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


   useEffect(() => {
    if (product) {
        setFormData({
            productname: product.productname || "",
            description: product.description || "",
            price: product.price ?? "",
            quantity: product.quantity ?? "",
            category: product.category || "",
            sku: product.sku || "",
            lowStockThreshold: product.lowStockThreshold ?? "",
            images: product.images || []
        });

        setImagePreviews(
            (product.images || []).map((image) => ({
                file: null,
                url: `http://localhost:5000/${image.replace(/^\/+/, "")}`,
                existing: true
            }))
        );
    } else {
        setFormData({
            productname: "",
            sku: "",
            price: "",
            quantity: "",
            category: "",
            lowStockThreshold: "",
            description: "",
            images: []
        });

        setImagePreviews([]);
    }
}, [product]);

   
   
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    
   const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (selectedFiles.length === 0) {
        return;
    }

    const remainingSlots = MAX_IMAGES - formData.images.length;

    if (remainingSlots <= 0) {
        alert(`You can upload maximum ${MAX_IMAGES} images.`);
        e.target.value = "";
        return;
    }

    const filesToAdd = selectedFiles.slice(0, remainingSlots);

    for (const file of filesToAdd) {
        if (!file.type.startsWith("image/")) {
            alert(`${file.name} is not a valid image.`);
            e.target.value = "";
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            alert(`${file.name} is larger than 5MB.`);
            e.target.value = "";
            return;
        }
    }

    setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...filesToAdd]
    }));

    const newPreviews = filesToAdd.map((file) => ({
        file,
        url: URL.createObjectURL(file),
        existing: false
    }));

    setImagePreviews((prev) => [
        ...prev,
        ...newPreviews
    ]);

    e.target.value = "";
};




   const handleRemoveImage = (index) => {
    setImagePreviews((prev) => {
        const removedPreview = prev[index];

        if (
            removedPreview?.url &&
            !removedPreview.existing
        ) {
            URL.revokeObjectURL(removedPreview.url);
        }

        return prev.filter((_, i) => i !== index);
    });

    setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
    }));
};
   

   
    
   


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setIsSubmitting(true);

        if (product) {

            if (
                !formData.category ||
                !formData.description.trim() ||
                formData.lowStockThreshold === "" ||
                formData.price === "" ||
                !formData.productname.trim() ||
                formData.quantity === "" ||
                !formData.sku.trim()
            ) {
                alert("All fields are required");
                return;
            }

            if (formData.images.length === 0) {
                alert("Please keep at least one product image.");
                return;
            }

            const data = new FormData();

            data.append(
                "productname",
                formData.productname.trim()
            );

            data.append(
                "description",
                formData.description.trim()
            );

            data.append(
                "price",
                formData.price
            );

            data.append(
                "quantity",
                formData.quantity
            );

            data.append(
                "category",
                formData.category
            );

            data.append(
                "sku",
                formData.sku.trim()
            );

            data.append(
                "lowStockThreshold",
                formData.lowStockThreshold
            );

            // Existing images
            formData.images
                .filter((image) => typeof image === "string")
                .forEach((image) => {
                    data.append("existingImages", image);
                });

            // New images
            formData.images
                .filter((image) => image instanceof File)
                .forEach((file) => {
                    data.append("images", file);
                });

            const response = await api.patch(
                `/products/update-product/${product._id}`,
                data
            );

            console.log(
                "UPDATE RESPONSE:",
                response.data
            );

            alert("Product updated successfully");

            onClose(response.data.data);

            return;
        }

        
        // CREATE PRODUCT
       

        if (
            !formData.category ||
            !formData.description.trim() ||
            formData.lowStockThreshold === "" ||
            formData.price === "" ||
            !formData.productname.trim() ||
            formData.quantity === "" ||
            !formData.sku.trim()
        ) {
            alert("All fields are required");
            return;
        }

        if (formData.images.length === 0) {
            alert("Please select at least one product image.");
            return;
        }

        const data = new FormData();

        data.append(
            "productname",
            formData.productname.trim()
        );

        data.append(
            "description",
            formData.description.trim()
        );

        data.append(
            "price",
            formData.price
        );

        data.append(
            "quantity",
            formData.quantity
        );

        data.append(
            "category",
            formData.category
        );

        data.append(
            "sku",
            formData.sku.trim()
        );

        data.append(
            "lowStockThreshold",
            formData.lowStockThreshold
        );

        formData.images.forEach((file) => {
            data.append("images", file);
        });

        const response = await api.post(
            "/products/create-product",
            data
        );

        console.log(
            "CREATE RESPONSE:",
            response.data
        );

        alert("Product created successfully");

        navigate("/admin");

    } catch (error) {

        console.log(
            "Error in product:",
            error
        );

        console.log(
            "ERROR RESPONSE:",
            error.response?.data
        );

        alert(
            error.response?.data?.message ||
            "Something went wrong"
        );

    } finally {
        setIsSubmitting(false);
    }
};






    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fff7f8] via-[#fffaf8] to-[#fff4ef] text-slate-800">

            <main className="lg:ml-64 min-h-screen">

                <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-10">

                   
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

                       
                       
                        <form
                            onSubmit={handleSubmit}
                            className="p-5 sm:p-8 lg:p-10"
                        >

                            
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                                <div>

                                    <label className="block text-sm font-bold text-rose-950 mb-2">
                                        Product Name
                                    </label>

                                    <input
                                        type="text"
                                        name="productname"
                                        value={formData.productname}
                                        onChange={handleChange}
                                        placeholder="Enter product name"
                                        required
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

                              
                              
                                <div>

                                    <label className="block text-sm font-bold text-rose-950 mb-2">
                                        SKU
                                    </label>

                                    <input
                                        type="text"
                                        name="sku"
                                        value={formData.sku}
                                        onChange={handleChange}
                                        placeholder="e.g. SHOE-001"
                                        required
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
                                            value={formData.price}
                                            onChange={handleChange}
                                            placeholder="0.00"
                                            min="0"
                                            required
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

                               
                               
                                <div>

                                    <label className="block text-sm font-bold text-rose-950 mb-2">
                                        Quantity
                                    </label>

                                    <input
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        placeholder="Enter quantity"
                                        min="0"
                                        required
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

                               
                               
                                <div>

                                    <label className="block text-sm font-bold text-rose-950 mb-2">
                                        Category
                                    </label>

                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
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

                              
                              
                                <div>

                                    <label className="block text-sm font-bold text-rose-950 mb-2">
                                        Low Stock Threshold
                                    </label>

                                    <input
                                        type="number"
                                        name="lowStockThreshold"
                                        value={formData.lowStockThreshold}
                                        onChange={handleChange}
                                        placeholder="10"
                                        min="0"
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

                           
                           
                            <div className="mt-7">

                                <label className="block text-sm font-bold text-rose-950 mb-2">
                                    Description
                                </label>

                                <textarea
                                    rows="5"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Enter product description..."
                                    required
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

                           
                           
                            <div className="mt-7">

                                <label className="block text-sm font-bold text-rose-950 mb-2">
                                    Product Images
                                </label>

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

                                 
                                 
                                    <input
                                        id="product-images"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />

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
                                        Select up to 5 images • Maximum 5MB each
                                    </p>

                                    <label
                                        htmlFor="product-images"
                                        className="
                                            inline-block
                                            cursor-pointer
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
                                    </label>

                                </div>

                            
                            
                                {imagePreviews.length > 0 && (

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
                                                {imagePreviews.length}/{MAX_IMAGES}
                                            </span>

                                        </div>

                                        <div className="
                                            grid
                                            grid-cols-2
                                            sm:grid-cols-3
                                            lg:grid-cols-4
                                            gap-4
                                        ">

                                            {imagePreviews.map((preview, index) => (

                                                <div
                                                    key={`${preview.url}-${index}`}
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
                                                        src={preview.url}
                                                        alt={`Product ${index + 1}`}
                                                        className="
                                                            w-full
                                                            h-36
                                                            object-cover
                                                        "
                                                    />

                                                    <div className="
                                                        absolute
                                                        left-2
                                                        bottom-2
                                                        right-2
                                                        flex
                                                        items-center
                                                        justify-between
                                                        gap-2
                                                    ">

                                                        <span className="
                                                            max-w-[75%]
                                                            truncate
                                                            rounded-lg
                                                            bg-white/90
                                                            px-2
                                                            py-1
                                                            text-xs
                                                            font-semibold
                                                            text-rose-900
                                                            backdrop-blur-sm
                                                        ">
                                                           {preview.existing ? "Existing Image" : preview.file.name}
                                                        </span>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleRemoveImage(index)
                                                            }
                                                            className="
                                                                w-8
                                                                h-8
                                                                shrink-0
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

                                                </div>

                                            ))}

                                        </div>

                                    </div>

                                )}

                            </div>

                           
                           
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
                                    onClick={() => {
                           if (product) {
                                     onClose();
                                       } else {
                                     navigate("/admin");
                                                  }
                                                 }}
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
                                    disabled={isSubmitting}
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
                                        hover:-translate-y-0.5
                                        transition
                                        disabled:opacity-60
                                        disabled:cursor-not-allowed
                                        disabled:hover:translate-y-0
                                    "
                                >
                                   {isSubmitting ?
                                   product ?"Updating Product..."
                                   :"Creating Product..."
                                   :product
                                   ?
                                   "Update Product"
                                   :"Add Product"
                                }
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </main>

        </div>
    );
};

export default AddProduct;