import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { loginUser } from "../../api/auth"; 

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 1. Call the API function. If successful, it returns data and saves the token in auth.js.
      const data = await loginUser({ email, password }); 
      
      // 2. SUCCESS: Check if data was returned (any failure is caught by the 'catch' block)
      if (data && data.token) { 
        toast.success("Login successful 🎉");
        
        // 3. ✅ FIX: Navigate immediately after success
        navigate("/"); 
      } 
      // Note: No 'else' block needed, as errors are thrown and handled below.

    } catch (error) {
      // Handles 401 (Invalid password) and 404 (User not found) thrown by auth.js
      console.error(error);
      // Display the specific error message, which is typically the one thrown from auth.response?.data
      toast.error(error.message || "Server error. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-2 text-primary">Notes</h1>
      <h2 className="text-2xl font-semibold mb-6">Login</h2>

      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            className="w-full p-2 border border-gray-300 rounded pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 cursor-pointer text-gray-700 hover:text-gray-900 text-lg"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        <div className="flex justify-between items-center mb-4 text-sm">
          <span className="text-gray-600">Not registered yet?</span>
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-secondary hover:underline"
          >
            Create an Account
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;