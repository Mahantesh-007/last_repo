import React, { useState } from "react";
import File from "@/models/Upload";
import connectDB from "@/middleware/db";
import Link from "next/link";
import { useRouter } from "next/router";
import FileUpload from "@/models/File";

const displayNotes = ({ findNotes, findFile }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const subjectid = id;
  let notesInSubject = [];
  let filesInSubject = [];
  let result = Array.isArray(findNotes);
  let result1 = Array.isArray(findFile);
  console.log(result);
  console.log(result1);

  if (Array.isArray(findNotes) && Array.isArray(findFile)) {
    if (subjectid) {
      notesInSubject = findNotes.filter((notes) => notes.code === subjectid);
      filesInSubject = findFile.filter((files) => files.code === subjectid);

      if (notesInSubject.length > 0 && notesInSubject[0].code) {
        notesInSubject = findNotes.filter(
          (notes) =>
            notes.code === subjectid && notes.code === notesInSubject[0].code
        );
      }

      if (filesInSubject.length > 0 && filesInSubject[0].code) {
        filesInSubject = findFile.filter(
          (files) =>
            files.code === subjectid && files.code === filesInSubject[0].code
        );
      }
    } else {
      notesInSubject = findNotes;
      filesInSubject = findFile;
    }
  } else {
    console.error("findNotes and fileDisplayed must be arrays");
  }

  const filteredData = notesInSubject.filter((item) =>
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (searchQuery) {
    notesInSubject = filteredData;
  } else {
    notesInSubject = findNotes;
  }
  console.log(
    notesInSubject
      .filter((item) => item.code === subjectid)
      .map((notes) => notes.filename)
  );

  return (
    <section class="text-gray-600 body-font">
      <div>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-4">
          {filteredData.length > 0 &&
            notesInSubject
              .filter((item) => item.code === subjectid)
              .map((notes) => (
                <div key={notes._id} class="xl:w-1/3 md:w-1/2 p-4">
                  <div class="border border-gray-200 p-6 rounded-lg">
                    <Link
                      href={notes.filename}
                      class="text-lg text-gray-900 font-medium title-font mb-2"
                    >
                      {notes.description}
                    </Link>
                    <p class="leading-relaxed text-base">{notes.description}</p>
                    <Link
                      href={{
                        pathname: "/Students/viewNotes",
                        query: { path: `${notes.filename}`, file: notes._id },
                      }}
                      class="text-indigo-500 inline-flex items-center"
                    >
                      Preview
                    </Link>
                  </div>
                </div>
              ))}
          {filesInSubject.map((items) => (
            <div key={items._id} class="xl:w-1/3 md:w-1/2 p-4">
              <div class="border border-gray-200 p-6 rounded-lg">
                <Link
                  href={items.file_path}
                  class="text-lg text-gray-900 font-medium title-font mb-2"
                >
                  {items.title}
                </Link>
                <p class="leading-relaxed text-base">{items.description}</p>
                <Link
                  href={{
                    pathname: "/Students/viewNotes",
                    query: { path: `${items.file_path}`, file: items._id },
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
    </section>
  );
};

export default displayNotes;

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
