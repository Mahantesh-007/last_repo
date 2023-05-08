import React, { useState } from "react";
import File from "@/models/Upload";
import connectDB from "@/middleware/db";
import Link from "next/link";
import { useRouter } from "next/router";

const displayNotes = ({ findNotes }) => {

  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const subjectid = id;
  let notesInSubject = [];
  
  if (Array.isArray(findNotes)) {
    if (subjectid) {
      notesInSubject = findNotes.filter((notes) => notes.code === subjectid);
      if (notesInSubject.length > 0 && notesInSubject[0].code) {
        notesInSubject = findNotes.filter(
          (notes) =>
            notes.code === subjectid && notes.code === notesInSubject[0].code
        );
      }
    } else {
      notesInSubject = findNotes;
    }
  }

  const filteredData = notesInSubject.filter((item) =>
  item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    

  if (searchQuery) {
    notesInSubject = filteredData;
    
  }
console.log(searchQuery);
 
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
          {filteredData &&
            notesInSubject.map((notes) => (
              <div key={notes._id} class="xl:w-1/3 md:w-1/2 p-4">
                <div class="border border-gray-200 p-6 rounded-lg">
                <Link
                    href={{
                      pathname: "/Students/viewNotes",
                      query: { path : `${notes.filename}`,file : notes._id }
                    }}
                    class="text-indigo-500 inline-flex items-center"
                  >Preview</Link>
                  <Link
                    href={notes.filename}
                    class="text-lg text-gray-900 font-medium title-font mb-2"
                  >
                    {notes.description}
                  </Link>
                  <p class="leading-relaxed text-base">{notes.description}</p>
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

    const notesDisplayed = findNotes.map((member) => ({
      _id: member.id || "",
      filename: member.filename || "",
      description: member.description || "",
      subject: member.subject || "",
      code: member.code || "",
      department: member.department || "",
    }));

    
    return {
      props: {
        findNotes: notesDisplayed,
      },
    };
  } catch (error) {
    console.error(error.message);
    return {
      props: {
        findNotes: [],
      },
    };
  }
}
