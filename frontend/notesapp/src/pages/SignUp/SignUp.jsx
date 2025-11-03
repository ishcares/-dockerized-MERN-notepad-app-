// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../api/auth";
import { toast } from "react-toastify";
// 🔑 NEW: Import specific icons from the Font Awesome module (fa)
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const Signup = () => {
  const navigate = useNavigate();

  // ✅ State variables for form inputs
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // 🔑 State for password visibility
  const [showPassword, setShowPassword] = useState(false); 

  // 🧠 Async signup handler
  const handleSignup = async (e) => {
    e.preventDefault();

    // ✅ Client-side validation
    if (!fullName || !email || !password) {
      toast.error("All fields must be filled out.");
      return;
    }

    setLoading(true);
    try {
      // ✅ FIX: Using signupUser to resolve ReferenceError
      const response = await signupUser({ fullName, email, password });

      // 🟢 Handle success response
      if (response && !response.error) {
        if (response.token) { 
          localStorage.setItem("token", response.token); 
        }
        toast.success(response.message || "Account created successfully!");
        navigate("/"); // Redirect to home (protected route)
      } else {
        toast.error(response.message || "Signup failed!");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error?.message || "Error creating account!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Full Name Input */}
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Password Input with Toggle */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <div className="relative">
              <input
                // 🔑 Conditional Input Type
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                // Added padding-right (pr-10) for the icon button
                className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring focus:ring-blue-200"
              />
              {/* 👁️ EYE ICON TOGGLE BUTTON */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />} 
              </button>
            </div>
          </div>

          {/* Submit Button (Kept Pink) */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg py-2 font-semibold text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-pink-500 hover:bg-pink-600" 
            }`}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;