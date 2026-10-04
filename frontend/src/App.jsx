import {Routes, Route} from "react-router-dom"
import RegisterPage from "./Pages/RegisterPage.jsx"
import UserHomePage from "./Home/UserHomePage.jsx"
import AdminHomePage from "./Home/AdminHomePage.jsx"
import LoginPage from "./Pages/LoginPage.jsx"
import AddProduct from "./product/AddProduct.jsx"

import './App.css'

function App() {
  

  return (
    <Routes>

      <Route path="/register"  element={<RegisterPage />} />
      <Route path="/home"  element={<UserHomePage />} />
      <Route path="/admin"  element={<AdminHomePage />} />  
      <Route path="/login"  element={<LoginPage />} />
      <Route path="/add-product"  element={<AddProduct />} />
     
     
    </Routes>
   
  )
}

export default App
