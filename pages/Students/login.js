import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import Footer from "@/components/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.isStudent === true) {
        router.push("/Students/displayDepartment");
      }
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const displayErrorMsg = (message) => {
     
      // Additional code for displaying toast message
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };
    
    try {
      const res = await axios.post("/api/student/login", {
        email,
        password,
      });
      
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        setEmail("");
        setPassword("");
        router.push("/Students/displayDepartment");
        window.location.reload();
      } else {
        displayErrorMsg("Invalid Credentials");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        displayErrorMsg("Unauthorized access");
      } else if (error.response && error.response.status === 402) {
        displayErrorMsg("Invalid Credentials");
      } else {
        displayErrorMsg("An error occurred. Please try again later.");
      }
    }
  };
    

  return (
    <div>
      <div
        className="flex justify-center items-center min-h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1488998427799-e3362cec87c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)",
        }}
      >
        <div className="max-w-md w-full px-6 py-12 bg-white bg-opacity-90 rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Student Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage }
          <ToastContainer />
            <div>
              <label htmlFor="email" className="block text-gray-700 font-bold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="flex flex-col items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                Login
              </button>
              <Link href="/Students/signup">
                <span className="mt-2 text-sm text-blue-500 hover:text-blue-600">
                  Don't Have an Account? Sign Up
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
