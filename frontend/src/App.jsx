import {Routes, Route} from "react-router-dom"
import RegisterPage from "./Pages/RegisterPage.jsx"
import UserHomePage from "./Home/UserHomePage.jsx"
import AdminHomePage from "./Home/AdminHomePage.jsx"
import LoginPage from "./Pages/LoginPage.jsx"
import AddProduct from "./product/AddProduct.jsx"
import AllProductPage from "./product/AllProductPage.jsx"
import CategoriesPage from "./Categories/CategoriesPage.jsx"
import CategoryPage from "./Pages/UserCategoryPage.jsx"
import ProductDetailPage from "./Pages/ProductDetailPage";
import './App.css'

function App() {
  

  return (
    <Routes>
       
       <Route path="/" element={<LoginPage />} />
      <Route path="/register"  element={<RegisterPage />} />
      <Route path="/home"  element={<UserHomePage />} />
      <Route path="/admin"  element={<AdminHomePage />} />  
      <Route path="/login"  element={<LoginPage />} />
      <Route path="/add-product"  element={<AddProduct />} />
       <Route path="/all-Product"  element={<AllProductPage/>} />
       <Route path="/categories" element={<CategoriesPage/>}/>
       <Route  path="/products/category/:category" element={<CategoryPage />}/>
       <Route path="/product/:id" element={<ProductDetailPage />}/>


  
    

     
     
    </Routes>
   
  )
}

export default App
