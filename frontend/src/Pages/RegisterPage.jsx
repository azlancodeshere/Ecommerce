import React, { useState } from "react";
import api from "../api/api.js";
import {AuthContext} from "../context/AuthContext.jsx"
import { useContext } from "react"; 
import { useNavigate, Link } from "react-router-dom";



function RegisterPage() {
  const [role, setRole] = useState("user");
  const navigate = useNavigate(); 

  const {setUser, setIsAuthenticated} = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username:"",
    email:"",
    phoneNumber:"",
    password:"",
    confirmPassword:"",
   
    
  })

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }



 const handleSubmit = async (e) =>{
  e.preventDefault();

  if(formData.password !== formData.confirmPassword){
    alert("password does not match with confirm Password");
    return;

  }

  try{

    console.log("REGISTER API CALL STARTED");
    const response = await api.post("/users/register",{
      ...formData,
      role
    })

    console.log(response.data)
    setUser(response.data.data);
     
    setIsAuthenticated(true); 

    navigate("/home",{
      replace:true
    }); 

  }catch(error){
    console.error("Error during registration:", error);

  }
 }


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            {role === "user"
              ? "Create your user account"
              : "Create your admin account"}
          </p>
        </div>

      
        <div className="mb-6">

          <label className="block text-sm font-medium text-gray-700 mb-3">
            Register As
          </label>

          <div className="grid grid-cols-2 gap-3">

            <button
              type="button"
              onClick={() => setRole("user")}
              className={`py-3 rounded-lg border font-semibold transition ${
                role === "user"
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:border-black"
              }`}
            >
              Register as User
            </button>

            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`py-3 rounded-lg border font-semibold transition ${
                role === "admin"
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:border-black"
              }`}
            >
              Register as Admin
            </button>

          </div>
        </div>


       
        {role === "user" && (
          <form 
          onSubmit={handleSubmit}
          className="space-y-5">

            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>

              <input
                type="text"
                name="username"
               value={formData.username}
               onChange={handleChange}
                placeholder="Enter your username"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"
              />
            </div>

          
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>

              <input
                type="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white  py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Create User Account
            </button>

          </form>
        )}


       

        {role === "admin" && (
          <form 
          onSubmit={handleSubmit}
          
          className="space-y-5">

            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter admin username"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"
              />
            </div>

           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter admin email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"
              />
            </div>

           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter admin phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          
           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"
              />
            </div>

           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm admin password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Create Admin Account
            </button>

          </form>
        )}


   
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span className="text-black font-semibold cursor-pointer hover:underline">
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default RegisterPage;