import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.isAdmin === true) {
        router.push("/admin/adminPanel");
      }
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/admin/login", {
      email,
      password,
    });
    if (res.status === 200) {
      localStorage.setItem("token", res.data.token);
      setEmail("");
      setPassword("");
      router.push("/admin/adminPanel");
      
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="max-w-md w-full px-6 py-12 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Login Admin</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="font-bold text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-400 text-black"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="font-bold text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-400 text-black"
                required
              />
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                Login
              </button>
              <Link href="/admin/signup">
                <span className="text-sm text-blue-500 hover:text-blue-600">
                  Dont Have A Account? Sign Up
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
