import React from "react";
import { useState } from "react";
import Link from "next/link";
import CryptoJS from "crypto-js";
import connectDB from "@/middleware/db";
import Departments from "@/models/Department";
import Footer from "@/components/Footer";


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
    <div
     className="flex justify-center items-center min-h-screen bg-cover bg-center"
     style={{
       backgroundImage: "url('https://images.unsplash.com/photo-1488998427799-e3362cec87c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
     }}
   >
     <div className="max-w-md w-full px-6 py-12 bg-white bg-opacity-90 rounded-3xl shadow-md">
       <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign up for an account</h2>
       <form onSubmit={handleSubmit} className="space-y-4">
         <div>
           <label htmlFor="username" className="block text-gray-700 font-bold">
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
           <label htmlFor="password" className="block text-gray-700 font-bold">
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
         <div>
           <label htmlFor="department" className="block text-gray-700 font-bold">
             Department
           </label>
           <select
             id="department"
             name="department"
             value={department}
             onChange={(e) => setDepartment(e.target.value)}
             className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-400"
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

         <div className="flex flex-col items-center justify-center">
           <button
             type="submit"
             className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
           >
             Sign Up
           </button>
           <Link href="/Faculty/login">
             <span className="mt-2 text-sm text-blue-500 hover:text-blue-600">
               Already have an account? Log in
             </span>
           </Link>
         </div>
       </form>
     </div>
   </div>
   <Footer/>
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
        departmentFind: departmentCreated, 
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
