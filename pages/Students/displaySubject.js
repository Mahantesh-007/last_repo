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

  function abc() {}
  return (
    <section className="text-gray-600 body-font">
      <form>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative mt-4 mx-auto w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full h-10 p-4 pl-10 text-sm text-gray-500 border border-gray-500 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
        </div>
      </form>
      <div className="container px-5 py-12 mx-auto">
        {subjectDisplayed.reduce((uniqueSubjects, subject, index) => {
          const isFirstSubject =
            index === 0 ||
            subject.semester !== subjectDisplayed[index - 1].semester;

          if (isFirstSubject) {
            uniqueSubjects.push(
              <div key={subject.semester} className="mb-8">
                <div className="mb-4">
                  <h2 className="text-gray-900 text-xl font-medium title-font mb-2">
                    Semester {subject.semester}
                  </h2>
                </div>
                <div className="flex flex-wrap -m-4">
                  {subjectDisplayed
                    .filter((subj) => subj.semester === subject.semester)
                    .map((subj) => (
                      <div
                        className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                        key={subj.id}
                      >
                        <div className="border border-gray-200 rounded-lg p-6 h-full">
                          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                            {subj.subjectname}
                          </h2>
                          <p className="leading-relaxed text-base">
                            {subj.code}
                          </p>
                          <Link
                            href={{
                              pathname: "/Students/displayNotes",
                              query: { id: subj.code },
                            }}
                            className="text-indigo-500 inline-flex items-center mt-4"
                          >
                            View Notes
                            <svg
                              className="w-4 h-4 ml-2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
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
            );
          }

          return uniqueSubjects;
        }, [])}
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
