import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import FileUpload from "@/models/File";
import File from "@/models/Upload";
import connectDB from "@/middleware/db";
import jwt_decode from "jwt-decode";

const uploadedNotes = ({ findNote, findFiles }) => {
  console.log(findFiles);
  const [searchQuery, setSearchQuery] = useState("");
  const [myToken, setMyToken] = useState("");

  const router = useRouter();
  const { id } = router.query;
  const subjectid = id;
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      setMyToken(decodedToken.id);
    }
  }, []);
  // notesInSubject = findNote.filter((notes) => notes.code === subjectid);
  // filesInSubject = findFiles.filter((files) => files.code === subjectid);

  // if (searchQuery) {
  //   notesInSubject = filteredData;
  // } else {
  //   notesInSubject = findNote;
  // }
  // console.log(
  //   notesInSubject
  //     .filter((item) => item.code === subjectid)
  //     .map((notes) => notes.filename)
  // );
  return (
    <div>
      <div>
        {findNote
          .filter(
            (notes) => notes.subject === subjectid && notes.author == myToken
          )
          .map((item) => (
            <div>{item.subject}</div>
          ))}
      </div>
      {/* <div>
        {findFiles.map((item) => (
          <div>{item.subject}</div>
        ))}
      </div> */}
    </div>
  );
};

export default uploadedNotes;

export async function getServerSideProps(context) {
  try {
    await connectDB();
    const findNote = await File.find({});
    const findFiles = await FileUpload.find({});

    const noteDisplayed = findNote.map((member) => ({
      _id: member.id || "",
      filename: member.filename || "",
      description: member.description || "",
      subject: member.subject || "",
      code: member.code || "",
      department: member.department || "",
      author: member.author || "",
    }));

    const filesDisplayed = findFiles.map((filesend) => ({
      _id: filesend.id || "",
      title: filesend.title || "",
      description: filesend.description || "",
      file_path: filesend.file_path || "",
      file_mimetype: filesend.file_mimetype || "",
      subject: filesend.subject || "",
      code: filesend.code || "",
      department: filesend.department || "",
      author: filesend.author || "",
    }));

    return {
      props: {
        findNote: noteDisplayed,
        findFiles: filesDisplayed,
      },
    };
  } catch (error) {
    console.error(error.message);
    return {
      props: {
        findNote: [],
        findFiles: [],
      },
    };
  }
}
