import React from "react";
import { useState } from "react";
import Link from "next/link";
import CryptoJS from "crypto-js";
import connectDB from "@/middleware/db";
import Departments from "@/models/Department";


const signup = ({ departmentFind }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    let ciphertext = CryptoJS.AES.encrypt(
      password,
      process.env.NEXT_PUBLIC_KEY
    ).toString();

    const response = await fetch("/api/faculty/faculty", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password: ciphertext,
        username,
        department,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setUsername("");
      setEmail("");
      setPassword("");
      setDepartment("");
    } else {
      const error = await response.json();
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-gray-50 ">
        <div className="max-w-md w-full px-6 py-12 bg-white rounded-3xl shadow-md ">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Sign up for an account
          </h2>
          <form onSubmit={handleSubmit}>
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
                className="w-full mt-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-400 text-black"
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
            <div className="mb-4">
              <label htmlFor="department" className="font-bold text-gray-700">
                Department
              </label>
              <select
                id="department"
                name="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full mt-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-400 text-black"
                required
              >
                <option value="">Select Department</option>
                {departmentFind.map((department) => (
                  <option value={department._id} key={department._id}>
                    {department.department}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                Sign Up
              </button>
              <Link href="/Faculty/login">
                <span className="text-sm text-blue-500 hover:text-blue-600">
                  Already have an account? Log in
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default signup;

export async function getServerSideProps(context) {
  try {
    await connectDB();
    const departmentFind = await Departments.find({});

    const departmentCreated = departmentFind.map((member) => ({
      _id: member.id,
      department: member.department,
    }));

    return {
      props: {
        departmentFind: departmentCreated, // Corrected key name
      },
    };
  } catch (error) {
    console.error(error.message);
    return {
      props: {
        departmentFind: [],
      },
    };
  }
}
