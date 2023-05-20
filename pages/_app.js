import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import AdminHead from "@/components/AdminHeader";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import FacultyHead from "@/components/FacultyHeader";
import StudentHead from "@/components/StudentHeader";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.isAdmin) {
        setUserRole("admin");
      } else if (decodedToken.isFaculty) {
        setUserRole("faculty");
      } else if (decodedToken.isStudent) {
        setUserRole("student");
      }
    } else {
      setUserRole("");
    }
  }, []); // Add userRole as a dependency

  return (
    <>
      {userRole === "admin" && <AdminHead />}
      {userRole === "faculty" && <FacultyHead />}
      {userRole === "student" && <StudentHead />}
      {userRole === "" && <Navbar />}
      <Component {...pageProps} />
      {/* <Footer/> */}
    </>
  );
}
