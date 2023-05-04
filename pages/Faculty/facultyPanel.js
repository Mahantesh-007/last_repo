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
    <div>
      <h1>Hello Faculty</h1>
      <ul>
        {facultySubject &&
          facultySubject
            .filter((item) => item.authorId === authorId)
            .map((subject) => (
              <li key={subject._id}>{subject.subjectname}
               <Link
                      href={{
                        pathname: "/Faculty/uploadedNotes",
                        query: { id: subject._id  },
                      }}
                      class="text-indigo-500 inline-flex items-center"
                    >
                      View Notes
                     
                    </Link>
                    </li>
            ))}
           
      </ul>
    </div>
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




