import React, { useEffect } from "react";
import Register from "@/models/adminSignUp";
import connectDB from "@/middleware/db";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      
      if (response.ok) {
        toast.success("Success", {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })};
        setTimeout(()=>(
          router.push("/admin/displayStudents")
        ),1500);
     
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
       <ToastContainer
        position="top-center"
        autoClose={500}
        limit={1}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="overflow-x-auto">
    <table className="min-w-full border-collapse">
      <thead>
        <tr>
          <th className="py-3 px-6 text-center border-b border-gray-300 bg-gray-100">Name</th>
          <th className="py-3 px-6 text-center border-b border-gray-300 bg-gray-100">USN</th>
          <th className="py-3 px-6 text-center border-b border-gray-300 bg-gray-100">Email</th>
          <th className="py-3 px-6 text-center border-b border-gray-300 bg-gray-100">Actions</th>
        </tr>
      </thead>
      <tbody>
        {studentMembers &&
          Object.keys(studentMembers).filter(students =>!studentMembers[students].isStudent)
          .map((item) => (
            studentMembers[item].usn !== null && (
              <tr key={studentMembers[item]._id} className="hover:bg-gray-100">
                <td className="py-4 px-6 text-center border-b border-gray-300">{studentMembers[item].username}</td>
                <td className="py-4 px-6 text-center border-b border-gray-300">{studentMembers[item].usn}</td>
                <td className="py-4 px-6 text-center border-b border-gray-300">{studentMembers[item].email}</td>
                <td className="py-4 px-6 text-center border-b border-gray-300">
                  <div className="space-x-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 ease-in-out" onClick={(e) => handleApprove(studentMembers[item]._id)}>
                      Approve
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 ease-in-out" onClick={(e) => handleDelete(studentMembers[item]._id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )
          ))}
      </tbody>
    </table>
  </div>
    </div>
  );
}

export default displayStudent;


export async function getServerSideProps(context) {
  try {
    await connectDB();
    const studentMembers = await Register.find({});

    const filteredFacultyMembers = studentMembers.map((member) => ({
      _id: member.id, 
      username: member.username,
      email: member.email,
      usn: member.usn ? member.usn : null,
      isStudent : member.isStudent
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
