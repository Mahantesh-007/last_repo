import React, { useEffect } from "react";
import Register from "@/models/adminSignUp";
import connectDB from "@/middleware/db";
import { useRouter } from "next/router";

function displayStudent({ studentMembers }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token.isAdmin === true) {
      router.push("/Admin/Login");
    }
  }, [router]);

  const handleApprove = async (id) => {
    try {
      console.log(id);
      const response = await fetch(`/api/student/student?_id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const response = await fetch(`/api/faculty/faculty?_id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="p-4">
              <div class="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label for="checkbox-all-search" class="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" class="px-6 py-3 ">
              Name
            </th>
            <th scope="col" class="px-6 py-3">
              USN
            </th>
            <th scope="col" class="px-6 py-3">
              Email
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {studentMembers &&
            Object.keys(studentMembers).map((item) => {
              const student = studentMembers[item];
              return student.usn !== null ? (
                <tr key={student._id}>
                  <td class="p-4">
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </td>
                  <td class="px-6 py-4 text-black">{student.username}</td>
                  <td class="px-6 py-4  text-black">{student.usn}</td>
                  <td class="px-6 py-4  text-black">{student.email}</td>
                  <td class="px-6 py-4">
                    <button
                      type="button"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => handleApprove(student._id)}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      onClick={() => handleDelete(student._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ) : null;
            })}
        </tbody>
      </table>
    </div>
  );
}

export default displayStudent;

// dont touch
export async function getServerSideProps(context) {
  try {
    await connectDB();
    const studentMembers = await Register.find({});

    const filteredFacultyMembers = studentMembers.map((member) => ({
      _id: member.id, // use member.id to get the document id
      username: member.username,
      email: member.email,
      usn: member.usn ? member.usn : null,
    }));

    return {
      props: {
        studentMembers: filteredFacultyMembers,
      },
    };
  } catch (error) {
    console.error(error.message);
    return {
      props: {
        studentMembers: [],
      },
    };
  }
}
