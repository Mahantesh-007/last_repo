import Link from "next/link";
import { useRouter } from "next/router";

const AdminHead = () => {
  const router = useRouter();
  function navigateToPage(event) {
    router.push(event.target.value);
  }

  const logoutMain = (e) => {
    localStorage.removeItem("token");
    router.push("/admin/Login");
  };

  return (
    <header className="bg-gray-900">
      <div className="container mx-auto flex flex-wrap items-center justify-between py-6 px-4 md:px-6">
        <a className="flex items-center text-white mr-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10  bg-indigo-500 p-2 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl font-bold">Notes Repository</span>
        </a>
        <nav className="md:flex md:items-center md:justify-center">
          <div className="relative mt-4 md:mt-0">
            <select
              className="bg-gray-800 text-white border-0 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              onChange={navigateToPage}
            >
              <option value="">Approval</option>
              <option value="/admin/displayFaculty">Faculty Approval</option>
              <option value="/admin/displayStudents">Student Approval</option>
            </select>
          </div>
          <button
            className="inline-flex items-center bg-indigo-500 border-0 py-2 px-4 ml-4 mt-4 md:mt-0 md:ml-6 rounded-md text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={logoutMain}
          >
            Logout
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14"></path>
            </svg>
          </button>
          <button className="ml-4 p-2 rounded-full bg-gray-800 text-gray-100 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 20a4 4 0 00-4-4H8a4 4 0 00-4 4v1a4 4 0 004 4h4a4 4 0 004-4v-1z"
              />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default AdminHead;
