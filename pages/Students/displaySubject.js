import { useRouter } from "next/router";
import React, { useState } from "react";
import Subjects from "@/models/Subject";
import connectDB from "@/middleware/db";
import Link from "next/link";

const displaySubject = ({ subjectFind }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const uniqueSubjects = Object.values(
    subjectFind.reduce((acc, obj) => {
      if (!acc[obj.code]) {
        acc[obj.code] = obj;
      }
      return acc;
    }, {})
  );

  const router = useRouter();
  const { id } = router.query;
  const departmentid = id;

  const filteredData = uniqueSubjects.filter(
    (subject) => subject.department === departmentid
  );

  const subjectDisplayed = searchQuery
    ? filteredData.filter((subject) =>
        subject.subjectname.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredData;

function abc(){

}
  return (
    <section class="text-gray-600 body-font">
      <form>
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative mt-4 mx-auto w-2/6">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full h-10 p-4 pl-10 text-sm text-gray-500 border border-gray-500 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
        </div>
      </form>
      <div class="container px-5 py-24 mx-auto">
        <div class=" m-4">
          {subjectDisplayed.map((subject, index) => (
<div>
            <div key={subject.id} className="xl:w-1/3 md:w-1/2 p-4">
              <div className="">
                {index === 0 ||
                subject.semester !== subjectDisplayed[index - 1].semester ? (
                  <div className="">
                    <h2 className="text-gray-900 text-xl font-medium title-font mb-4 ">
                      Semester {subject.semester}
                    </h2>
                  </div>
                ) : null}
              </div>
              
                </div>
                   
              <div className="flex w-full" >
              
                <div className="">
                  <div class="border border-gray-200 p-6 rounded-lg">
                    <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
                      {subject.subjectname}
                    </h2>
                    <p class="leading-relaxed text-base">{subject.code}</p>
                    <Link
                      href={{
                        pathname: "/Students/displayNotes",
                        query: { id: subject.code },
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
             
              </div>
             </div>
               ))}
        </div>
        
      </div>
    </section>
  );
};

export default displaySubject;

export async function getServerSideProps(context) {
  try {
    await connectDB();
    const subjectFind = await Subjects.find({});

    const subjectDisplayed = subjectFind.map((member) => ({
      _id: member.id,
      subjectname: member.subjectname || "",
      code: member.code,
      department: member.department,
      semester: member.semester,
    }));
    console.log(subjectDisplayed);
    subjectDisplayed.sort((a, b) => {
      const semesterA = parseInt(a.semester.slice(0, -2));
      const semesterB = parseInt(b.semester.slice(0, -2));
      return semesterA - semesterB;
    });

    console.log(subjectDisplayed.sort((a, b) => a.semester - b.semester));
    return {
      props: {
        subjectFind: subjectDisplayed,
      },
    };
  } catch (error) {
    console.error(error.message);
    return {
      props: {
        subjectFind: [],
      },
    };
  }
}
