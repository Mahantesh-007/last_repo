import axios from "axios";
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const yourSubjects = () => {
  const [subjectname, setSubjectname] = useState("");
  const [code, setCode] = useState("");
  const [semester, setSemester] = useState("")
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || token.isFaculty === true) {
      router.push('/Faculty/login');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);

    console.log(decodedToken);

    const data = {
      subjectname,
      code,
      semester,
      department: decodedToken.department,
      authorId: decodedToken.id,
    };

    try {
      const response = await fetch("/api/faculty/subject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      if (response.ok) {
        toast.success("Successful", {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log(responseData);
        setSubjectname("");
        setCode("");
        setSemester("")
        
      } else {
        alert("error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={500}
        limit={1}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />

      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto flex">
          <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col mx-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-gray-900 text-2xl mb-4 font-medium title-font text-center">
              Create a subject
            </h2>
            <form action="" onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <label
                  htmlFor="subjectname"
                  className="leading-7 text-sm text-gray-600"
                >
                  Subject name 
                </label>
                <input
                  onChange={(e) => setSubjectname(e.target.value)}
                  value={subjectname}
                  type="text"
                  id="subjectname"
                  name="subjectname"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="code"
                  className="leading-7 text-sm text-gray-600"
                >
                  Subject Code
                </label>
                <textarea
                  onChange={(e) => setCode(e.target.value)}
                  value={code}
                  id="code"
                  name="code"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-20 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
              
              <div className="relative mb-4">
                <label
                  htmlFor="semester"
                  className="leading-7 text-sm text-gray-600"
                >
                  Semester
                </label>
                <input
                  onChange={(e) => setSemester(e.target.value)}
                  value={semester}
                  type="text"
                  id="semister"
                  name="semister"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>


              <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Create
              </button>
              {/* <p className="text-xs text-gray-500 mt-3">Chicharrones blog helvetica normcore iceland tousled brook viral artisan.</p> */}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default yourSubjects;
