import React from 'react'
import { createContext, useState, useEffect, useContext } from 'react'
import api from '../api/api.js'

const ProductConext = createContext()

function ProductProvider({children}){
    const [products, setProducts] = useState([]);


    const getProducts = async () => {
        try {

            const response= await api.get("/products/all-products");
            setProducts(response.data.data)
            
        } catch (error) {
            console.log("Error fetching products:", error)
        }
    }


    useEffect(()=>{
        getProducts();
    }, [])

   const productvalue={
        products,
        setProducts,
        getProducts
    }

      return(
            <ProductConext.Provider value={productvalue}>
                {children}
            </ProductConext.Provider>
        )
}

export {ProductConext, ProductProvider}

