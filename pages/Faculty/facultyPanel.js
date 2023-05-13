import Subjects from "@/models/Subject";
import React, { useEffect, useState } from "react";
import connectDB from "@/middleware/db";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import Link from "next/link";

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

  return (
    <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-wrap -m-4">
    {
      facultySubject && facultySubject.filter((item) => item.authorId === authorId)
      .map((subject) => (
        <div key={subject.id} class="xl:w-1/3 md:w-1/2 p-4">
          <div class="border border-gray-200 p-6 rounded-lg">
            <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
              {subject.subjectname}
            </h2>
            <p class="leading-relaxed text-base">{subject.code}</p>
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
          </div>
        </div>
      ))}
  </div>
</div>
</section>
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

    console.log(displaySubject.authorId);

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

