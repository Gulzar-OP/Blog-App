import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");


  // 🔄 Register Submit Handler
  const handleRegister = async (e) => {
    e.preventDefault();
    if(!email || !password || !role){
      toast.error("Please fill all fields")
    }
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/users/login",
        {email,role,password},
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message || "User Login successfully!");
      console.log(data);

      // Reset
    
      setEmail("");
      setPassword("");
      setRole("");

    } catch (error) {
      console.log(error);
      toast.error("Registration failed! Check console.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <form onSubmit={handleRegister}>
          <div className="font-semibold text-xl text-center mb-4">
            Gul<span className="text-blue-500">Blog</span>
          </div>

          <h1 className="text-xl font-semibold mb-6">Login</h1>

          {/* Role */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

         
          {/* Email */}
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border mb-4 rounded-md"
            required
          />

      

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border mb-4 rounded-md"
            required
          />


          <p className="mb-4">
            New User ?{" "}
            <Link to="/register" className="text-blue-600">
              Register Now
            </Link>
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
