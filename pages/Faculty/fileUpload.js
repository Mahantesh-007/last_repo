import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useState, useRef, useEffect } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import connectDB from "@/middleware/db";
import Subjects from "@/models/Subject";
import jwt_decode from "jwt-decode";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ facultySub }) {
  const router = useRouter();
  const { id } = router.query;
  const subjectid = id;
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage
  const [title, setTitle] = useState("");
  const [state, setState] = useState({
    description: "",
    code: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    if (!token || token.isFaculty === true) {
      router.push("/Faculty/login");
    }
  }, [router]);

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
  };

  const updateBorder = (dragState) => {
    if (dragState === "over") {
      dropRef.current.style.border = "2px solid #000";
    } else if (dragState === "leave") {
      dropRef.current.style.border = "2px dashed #e9ebeb";
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);

    try {
      const { title, description, code } = state;
      if (title.trim() !== "" && description.trim() !== "") {
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("title", title);
          formData.append("description", description);
          formData.append("code", code);

          formData.append("subject", subjectid);
          formData.append("department", decodedToken.department);
          formData.append("author", decodedToken.id);

          setErrorMsg("");
          await axios.post(`/api/faculty/fileUpload`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          setFile(null);
          setPreviewSrc("");
          setTitle("");
          setState({
            description: "",
            code: "",
          });
        } else {
          setErrorMsg("Please select a file to add.");
        }
      } else {
        setErrorMsg("Please enter all the field values.");
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  return (
    <>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto flex">
          <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col mx-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-gray-900 text-2xl mb-4 font-medium title-font text-center">
              Upload The File
            </h2>
            <form action="" onSubmit={handleOnSubmit}>
              {errorMsg && <p className="errorMsg">{errorMsg}</p>}
              <div className="relative mb-4">
                <label
                  htmlFor="filename"
                  className="leading-7 text-sm text-gray-600"
                >
                  Enter Title
                </label>
                <input
                  onChange={(event) => setTitle(event.target.value)}
                  value={title}
                  type="text"
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
                  onChange={handleInputChange}
                  value={state.description || ""}
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
                  onChange={handleInputChange}
                  value={state.code || ""}
                  id="code"
                  name="code"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-20 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>

              <div>
                <label htmlFor="dropzone-file">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={(e) => onDrop(e.target.files)}
                  />
                </label>
                {file && <div>Selected file: {file.name}</div>}
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
}

export async function getServerSideProps(context) {
  try {
    await connectDB();

    const facultySub = await Subjects.find({});

    const subjectDisplay = facultySub.map((item) => ({
      _id: item.id ? item.id : "",
      subjectname: item.subjectname ? item.subjectname : "",
      code: item.code ? item.code : "",
      department: item.department ? item.department : "",
      authorId: item.authorId ? item.authorId : "",
    }));

    return {
      props: {
        facultySub: subjectDisplay,
      },
    };
  } catch (error) {
    console.error(error.message);
    return {
      props: {
        facultySub: [],
      },
    };
  }
}
