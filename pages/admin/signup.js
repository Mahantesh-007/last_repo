import React from "react";
import { useState } from "react";
import Link from "next/link";
import CryptoJS from "crypto-js";
import Footer from "@/components/Footer";

const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    let ciphertext = CryptoJS.AES.encrypt(
      password,
      process.env.NEXT_PUBLIC_KEY
    ).toString();

    const response = await fetch("/api/admin/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password: ciphertext,
        username,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setEmail("");
      setPassword("");
      setUsername("");
    } else {
      const error = await response.json();
      console.log(error);
    }
  };
  return (
    <div>
      <div
        className="flex justify-center items-center min-h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1488998427799-e3362cec87c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        <div className="max-w-md w-full px-6 py-12 bg-white bg-opacity-90 rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Sign up for an account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label htmlFor="username" className="font-bold text-black">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
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
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-400"
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
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="flex flex-col items-center mt-6">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                Sign Up
              </button>
              <Link href="/Admin/Login">
                <span className="text-sm text-blue-500 hover:text-blue-600">
                  Already have an account? Log in
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

export default signup;
