import axios from "axios";
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import connectDB from "@/middleware/db";
import Subjects from "@/models/Subject";

const FacultyUpload = ({ facultySubject }) => {
  const router = useRouter();
  const { id } = router.query;
  const subjectid = id;
  const [filename, setFilename] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [authorId, setAuthorId] = useState(null);
  const [code,setCode] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    if (!token || token.isFaculty === true) {
      router.push("/Faculty/login");
    }
    setAuthorId(decodedToken.id);
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);

    console.log(decodedToken);

    const data = {
      filename,
      description,
      subject: subjectid,
      code,
      department: decodedToken.department,
      author: decodedToken.id,
    };

    try {
      const response = await fetch("/api/faculty/fileShare", {
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
        setFilename("");
        setDescription("");
        setSubject("");
        setSemester("");
        setSelectedValue("");
        setDepartment("");
        setCode("")
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
              Upload The File
            </h2>
            <form action="" onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <label
                  htmlFor="filename"
                  className="leading-7 text-sm text-gray-600"
                >
                  Enter The URL
                </label>
                <input
                  onChange={(e) => setFilename(e.target.value)}
                  value={filename}
                  type="url"
                  id="filename"
                  name="filename"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="description"
                  className="leading-7 text-sm text-gray-600"
                >
                  Description
                </label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  id="description"
                  name="description"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-20 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
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
              <div>
                <label htmlFor="menu">Select an option:</label>
                <select
                  className="w-2/4"
                  id="menu"
                  value={subjectid}
                  onChange={(e) => setSelectedValue(e.target.value)}
                >
                  <option value=""></option>
                  {facultySubject &&
                    facultySubject
                      .filter((subject) => subject.authorId === authorId)
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.subjectname}
                        </option>
                      ))}
                </select>
              </div>
              <div className="flex justify-center">
                <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg my-5 ">
                  Upload Data
                </button>
              </div>
              {/* <p className="text-xs text-gray-500 mt-3">Chicharrones blog helvetica normcore iceland tousled brook viral artisan.</p> */}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default FacultyUpload;

export async function getServerSideProps(context) {
  try {
    await connectDB();

    const facultySubjects = await Subjects.find({});

    const displaySubject = facultySubjects.map((item) => ({
      _id: item.id ? item.id : "",
      subjectname: item.subjectname ? item.subjectname : "",
      code: item.code ? item.code : "",
      department: item.department ? item.department : "",
      authorId: item.authorId ? item.authorId : "",
    }));

    return {
      props: {
        facultySubject: displaySubject,
      },
    };
  } catch (error) {
    console.error(error.message);
    return {
      props: {
        facultySubjects: [],
      },
    };
  }
}
