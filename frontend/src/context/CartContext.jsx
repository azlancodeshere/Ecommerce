import React, { createContext, useState } from "react";
import api from "../api/api.js";

const CartContext = createContext();

const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(null);
    const [cartCount, setCartCount] = useState(0);

    const getCart = async () => {
        try {
            const response = await api.get("/cart");

            const cartData = response.data.data;

            setCart(cartData);
            setCartCount(cartData?.totalItems || 0);

        } catch (error) {
            console.log("GET CART ERROR:", error);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                cartCount,
                setCartCount,
                getCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };