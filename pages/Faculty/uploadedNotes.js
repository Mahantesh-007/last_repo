import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";

const uploadedNotes = () => {
  const router = useRouter();
  const { id } = router.query;
  const subjectid = id;
  let subjectsInDepartment = [];
  return (
    <div>
      <h1>subject id : {subjectid}</h1>
      <Link
        href={{
          pathname: "/Faculty/facultyUpload",
          query: { id: subjectid },
        }}
        class="text-indigo-500 inline-flex items-center"
      >
        Upload 
      </Link>
      <Link
        href={{
          pathname: "/Faculty/fileUpload",
          query: { id: subjectid },
        }}
        class="text-indigo-500 inline-flex items-center"
      >
        Upload 
      </Link>
    </div>
  );
};

export default uploadedNotes;
