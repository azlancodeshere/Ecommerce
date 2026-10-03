import {Routes, Route} from "react-router-dom"
import RegisterPage from "./Pages/RegisterPage.jsx"
import HomePage from "./Home/HomePage.jsx"
import LoginPage from "./Pages/LoginPage.jsx"

import './App.css'

function App() {
  

  return (
    <Routes>

      <Route path="/register"  element={<RegisterPage />} />
      <Route path="/home"  element={<HomePage />} />
      <Route path="/login"  element={<LoginPage />} />
     
     
    </Routes>
   
  )
}

export default App
