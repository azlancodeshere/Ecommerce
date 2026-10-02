import {Routes, Route} from "react-router-dom"
import RegisterPage from "./Pages/RegisterPage.jsx"

import './App.css'

function App() {
  

  return (
    <Routes>

      <Route path="/register"  element={<RegisterPage />} />
     
     
    </Routes>
   
  )
}

export default App
