import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useState, useRef, useEffect } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  const subjectid = id;
  const [file, setFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState("");
  const [author, setAuthor] = useState("");
  const [departmentid, setDepartmentid] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const dropRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    if (!token || decodedToken.isFaculty == false) {
      console.log(decodedToken);
      router.push("/Faculty/login");
    } else {
      setAuthor(decodedToken.id);
      setDepartmentid(decodedToken.department);
    }
  }, [router]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
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
    dropRef.current.style.border = "2px dashed #e9ebeb";
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

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("code", code);
    formData.append("subject", subjectid);
    formData.append("department", departmentid);
    formData.append("author", author);

    try {
      const response = await fetch(`/api/faculty/fileUpload`, {
        method: "POST",
        body: formData,
      });

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
        setTitle("");
        setDescription("");
        setCode("");
        setSelectedFile("");
      }
      
      else {
        const data = await response.json();
        console.log(data);
      }
     
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  }

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
            <Form className="search-form" onSubmit={handleOnSubmit}>
              {errorMsg && <p className="errorMsg">{errorMsg}</p>}
              <div className="relative mb-4">
                <Row>
                  <Col>
                    <label
                      htmlFor="title"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Enter Title
                    </label>
                    <Form.Group controlId="title">
                      <Form.Control
                        type="text"
                        name="title"
                        value={title || ""}
                        placeholder="Enter title"
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
              <div className="relative mb-4">
                <Row>
                  <Col>
                    <label
                      htmlFor="description"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Enter Description
                    </label>
                    <Form.Group controlId="description">
                      <Form.Control
                        type="text"
                        name="description"
                        value={description || ""}
                        placeholder="Enter description"
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-20 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
              <div className="relative mb-4">
                <Row>
                  <Col>
                    <label
                      htmlFor="code"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Enter Code
                    </label>
                    <Form.Group controlId="code">
                      <Form.Control
                        type="text"
                        name="code"
                        value={code || ""}
                        placeholder="Enter Subject Code"
                        onChange={(e) => {
                          setCode(e.target.value);
                        }}
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
              <div className="upload-section">
                <label
                  htmlFor="file"
                  className="flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Upload File</span>

                  <input
                    className="hidden"
                    type="file"
                    id="file"
                    name="file"
                    onChange={handleImageChange}
                  />
                </label>
                {selectedFile && (
                  <div className="mt-4">
                    <strong className="text-gray-800">Selected file:</strong>{" "}
                    {selectedFile.name}
                  </div>
                )}

                {previewSrc ? (
                  isPreviewAvailable ? (
                    <div className="image-preview">
                      <img
                        className="preview-image"
                        src={previewSrc}
                        alt="Preview"
                      />
                    </div>
                  ) : (
                    <div className="preview-message">
                      <p>No preview available for this file</p>
                    </div>
                  )
                ) : (
                  <div className="preview-message">
                    <p>Image preview will be shown here after selection</p>
                  </div>
                )}
              </div>
              <div className="flex justify-centre">
                <Button
                  variant="primary"
                  type="submit"
                  className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg my-5"
                >
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
}
