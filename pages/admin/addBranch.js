import Departments from "@/models/Department";
import { useState } from "react";
import connectDB from "@/middleware/db";

function AddDepartment({departmentFind}) {
  const [department, setDepartment] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/admin/createBranch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ department }),
      });

      if (!response.ok) {
        throw new Error("Failed to create department.");
      }

      const data = await response.json();
      console.log(data.message); // Department created successfully!

      // Reset the form
      setDepartment("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create a new Department
        </h2>
      </div>

      <form
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor="department"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Department
          </label>
          <div className="mt-2">
            <input
              id="department"
              name="department"
              type="text"
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create
          </button>
        </div>
      </form>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Department ID</th>
            <th className="px-4 py-2">Department Name</th>
          </tr>
        </thead>
        <tbody>
          {departmentFind.map((department) => (
            <tr key={department._id}>
              <td className="border px-4 py-2">{department._id}</td>
              <td className="border px-4 py-2">{department.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AddDepartment;

export async function getServerSideProps(context) {
  try {
    await connectDB();
    const departmentFind = await Departments.find({});

    const departmentCreated = departmentFind.map((member) => ({
      _id: member.id,
      department: member.department,
    }));

    return {
      props: {
        departmentFind: departmentCreated, // Corrected key name
      },
    };
  } catch (error) {
    console.error(error.message);
    return {
      props: {
        departmentFind: [],
      },
    };
  }
}