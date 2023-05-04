import { useRouter } from "next/router";
import React, { useState } from "react";
import Subjects from "@/models/Subject";
import connectDB from "@/middleware/db";
import Link from "next/link";

const displaySubject = ({ subjectFind }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();
  const { id } = router.query;
  const departmentid = id;
  let subjectsInDepartment = [];

  if (Array.isArray(subjectFind)) {
    subjectsInDepartment = subjectFind.filter(
      (subject) => subject.department === departmentid
    );
  }
  const filteredData = subjectsInDepartment.filter((item) =>
    item.subjectname.toLowerCase().includes(searchQuery.toLowerCase())
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
        {filteredData.map((item) => (
          <div key={item.id} class="flex flex-wrap -m-4">
            {subjectsInDepartment.map((subject) => (
              <div key={subject.id} class="xl:w-1/3 md:w-1/2 p-4">
                <div class="border border-gray-200 p-6 rounded-lg">
                  <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
                    {subject.subjectname}
                  </h2>
                  <p class="leading-relaxed text-base">{subject.code}</p>
                  <Link
                    href={{
                      pathname: "/Students/displayNotes",
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
        ))}
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
    }));

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
