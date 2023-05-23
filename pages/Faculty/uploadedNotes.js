import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
import File from "@/models/Upload";
import FileUpload from "@/models/File";
import connectDB from "@/middleware/db";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";

const uploadedNotes = ({ findNotes, findFile }) => {
  const router = useRouter();
  const [authorid, setAuthorid] = useState("");
  const { id } = router.query;
  const subjectid = id;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    setAuthorid(decodedToken.id);
  }, [router]);

  return (
    <>
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-4">
          {findNotes
            .filter((notes) => notes.author === authorid)
            .filter((items)=>items.subject === subjectid)
            .map((notes) => (
              <div key={notes._id} class="xl:w-1/3 md:w-1/2 p-4">
                <div class="border border-gray-200 p-6 rounded-lg">
                  <Link
                    href={notes.filename}
                    class="text-lg text-gray-900 font-medium title-font mb-2"
                  >
                    {notes.description}
                  </Link>
                  <p class="leading-relaxed text-base">{notes.code}</p>
                  <Link
                    href={{
                      pathname: "/Faculty/viewNotes",
                      query: { path: `${notes.filename}`, file: notes._id },
                    }}
                    class="text-indigo-500 inline-flex items-center"
                  >
                    Preview
                  </Link>
                </div>
              </div>
            ))}
            {findFile
            .filter((notes) => notes.author === authorid)
            .filter((items)=>items.subject === subjectid)
            .map((notes)=> (
              <div key={notes._id} class="xl:w-1/3 md:w-1/2 p-4">
                <div class="border border-gray-200 p-6 rounded-lg">
                  <Link
                    href={notes.file_path}
                    class="text-lg text-gray-900 font-medium title-font mb-2"
                  >
                    {notes.title}
                  </Link>
                  <p class="leading-relaxed text-base">{notes.code}</p>
                  <Link
                    href={{
                      pathname: "/Faculty/viewNotes",
                      query: { path: `${notes.file_path}`, file: notes._id },
                    }}
                    class="text-indigo-500 inline-flex items-center"
                  >
                    Preview
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
      
    </>
  );
};

export default uploadedNotes;

export async function getServerSideProps(context) {
  try {
    await connectDB();
    const findNotes = await File.find({});
    const findFile = await FileUpload.find({});

    const notesDisplayed = findNotes.map((member) => ({
      _id: member.id || "",
      filename: member.filename || "",
      description: member.description || "",
      subject: member.subject || "",
      code: member.code || "",
      department: member.department || "",
      author: member.author || "",
    }));

    const fileDisplayed = findFile.map((filesend) => ({
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
        findNotes: notesDisplayed,
        findFile: fileDisplayed,
      },
    };
  } catch (error) {
    console.error(error.message);
    return {
      props: {
        findNotes: [],
        findFile: [],
      },
    };
  }
}
