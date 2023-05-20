import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { CgAddR } from "react-icons/cg";

const FacultyHead = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const subjectid = id;

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logoutMain = (e) => {
    localStorage.removeItem("token");
    router.push("/Faculty/login");
  };

  return (
    <header className="text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Pentagon</span>
        </a>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center"></nav>
       
          <div className="relative px-2">
            <button
              id="dropdownDefaultButton"
              onClick={handleDropdownToggle}
              className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-3 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
              type="button"
            >
              <CgAddR size={28} />
            </button>

            {isDropdownOpen && (
              <div
                id="dropdown"
                className="absolute z-10 mt-5  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 mr-5"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <Link
                      href={{
                        pathname: "/Faculty/facultyUpload",
                        query: { id: subjectid },
                      }}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Upload URL
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={{
                        pathname: "/Faculty/fileUpload",
                        query: { id: subjectid },
                      }}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Upload File
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
      
        <Link href="/Faculty/login">
          <button
            className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0"
            onClick={logoutMain}
          >
            Logout
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </Link>
      </div>
    </header>
  );
};

export default FacultyHead;
