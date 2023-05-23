import React from "react";

function Footer() {
  return (
    <>
      <footer className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-8 mx-auto flex flex-wrap items-center justify-between">
          <a className="flex title-font font-medium items-center justify-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-indigo-500 p-2 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">NOTES REPO</span>
          </a>
          <p className="text-sm text-gray-400 mt-4 md:mt-0">
            © 2023 Notes Repository. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
