import Subjects from "@/models/Subject";
import React, { useEffect, useState } from "react";
import connectDB from "@/middleware/db";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FacultyPanel = ({ facultySubject }) => {
  const router = useRouter();
  const [authorId, setAuthorId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/Faculty/login");
      return;
    }
    const decodedToken = jwt_decode(token);
    if (!decodedToken.isFaculty) {
      router.push("/");
      return;
    }
    setAuthorId(decodedToken.id);
  }, [router]);

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const response = await fetch(`/api/faculty/subject?_id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        toast.success("Delete Successful", {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "bg-red-500",
          theme: "light",
        });
        const data = await response.json();
        setTimeout(() => {
          router.push("/Faculty/facultyPanel");
        }, 1000);
        console.log(data);
      } else {
        toast.error("Failed", {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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
        className="toast-container"
        toastClassName="bg-red-500"
        theme="light"
      />

      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            {facultySubject &&
              facultySubject
                .filter((item) => item.authorId === authorId)
                .map((subject) => (
                  <div key={subject.id} class="xl:w-1/3 md:w-1/2 p-4">
                    <div class="border border-gray-200 p-6 rounded-lg">
                      <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
                        {subject.subjectname}
                      </h2>
                      <p class="leading-relaxed text-base">{subject.code}</p>
                      <div className="flex items-center justify-between">
                        <Link
                          href={{
                            pathname: "/Faculty/uploadedNotes",
                            query: { id: subject._id },
                          }}
                          class="text-indigo-500 inline-flex items-center"
                        >
                          View Notes
                          <svg
                            class="w-4 h-4 ml-2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                          </svg>
                        </Link>

                        <div className="flex items-center justify-end">
                          <MdDelete
                            size={24}
                            color="red"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDelete(subject._id)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FacultyPanel;

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
