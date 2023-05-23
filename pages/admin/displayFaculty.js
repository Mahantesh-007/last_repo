import React, { useEffect } from "react";
import Register from "@/models/adminSignUp";
import connectDB from "@/middleware/db";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function displayFaculty({ facultyMembers }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token.isAdmin === true) {
      router.push("/admin/Login");
    }
  }, [router]);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 1,
    },
  }));
  const handleApprove = async (id) => {
    try {
      console.log(id);
      const response = await fetch(`/api/faculty/faculty?_id=${id}`, {
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
        });
      }
      setTimeout(() => router.push("/admin/displayFaculty"), 1500);
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
    <>
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
              <th className="py-3 px-6 text-center border-b border-gray-300 bg-gray-100">
                Name
              </th>
              <th className="py-3 px-6 text-center border-b border-gray-300 bg-gray-100">
                Email
              </th>
              <th className="py-3 px-6 text-center border-b border-gray-300 bg-gray-100">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {facultyMembers &&
              Object.keys(facultyMembers)
                .filter((faculties) => !facultyMembers[faculties].isFaculty)
                .map(
                  (item) =>
                    facultyMembers[item].department !== null && (
                      <tr
                        key={facultyMembers[item]._id}
                        className="hover:bg-gray-100"
                      >
                        <td className="py-4 px-6 text-center border-b border-gray-300">
                          {facultyMembers[item].username}
                        </td>
                        <td className="py-4 px-6 text-center border-b border-gray-300">
                          {facultyMembers[item].email}
                        </td>
                        <td className="py-4 px-6 text-center border-b border-gray-300">
                          <div className="space-x-2">
                            <button
                              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 ease-in-out"
                              onClick={(e) =>
                                handleApprove(facultyMembers[item]._id)
                              }
                            >
                              Approve
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 ease-in-out"
                              onClick={(e) =>
                                handleDelete(facultyMembers[item]._id)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                )}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default displayFaculty;

export async function getServerSideProps(context) {
  try {
    await connectDB();
    const facultyMembers = await Register.find({});

    const filteredFacultyMembers = facultyMembers.map((member) => ({
      _id: member.id,
      username: member.username,
      email: member.email,
      department: member.department ? member.department : null,
      isFaculty: member.isFaculty,
    }));

    return {
      props: {
        facultyMembers: filteredFacultyMembers,
      },
    };
  } catch (error) {
    console.error(error.message);
    return {
      props: {
        facultyMembers: [],
      },
    };
  }
}
