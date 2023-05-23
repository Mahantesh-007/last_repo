import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="text-white bg-gray-900 body-font">
      <div className="container mx-auto px-10 py-5 flex flex-wrap items-center justify-between rounded-lg shadow-md">
        <a className="flex items-center font-medium text-white text-2xl mb-4 md:mb-0">
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
          <span className="ml-3 text-2xl font-semibold">NOTES REPO</span>
        </a>
        <nav className="flex flex-wrap items-center text-lg md:ml-auto">
          <input
            type="checkbox"
            id="nav-toggle"
            className="hidden"
            checked={isMenuOpen}
            onChange={handleToggle}
          />
          <label
            htmlFor="nav-toggle"
            className="cursor-pointer flex items-center md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className={`w-6 h-6 ${isMenuOpen ? 'hidden' : 'block'}`}
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
          <div
            className={`md:flex md:items-center md:ml-4 flex-wrap ${
              isMenuOpen ? 'block' : 'hidden'
            }`}
            id="nav-menu"
          >
            <ul className="list-none md:flex md:flex-row md:justify-center md:space-x-8">
              <li>
                <Link
                  href="/"
                  className="block mt-4 lg:inline-block lg:mt-0 text-white-200  mr-40 mb-2 md:mr-0 md:mb-0 hover:text-gray-300 transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/Students/login"
                  className="block mt-4 lg:inline-block lg:mt-0 text-white-200  mr-40 mb-2 md:mr-0 md:mb-0 hover:text-gray-300 transition-colors duration-300"
                >
                  Student
                </Link>
              </li>
              <li>
                <Link
                  href="/Faculty/login"
                  className="block mt-4 lg:inline-block lg:mt-0 text-white-200  mr-40 mb-2 md:mr-0 md:mb-0 hover:text-gray-300 transition-colors duration-300"
                >
                  Faculties
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/Login"
                  className="block mt-4 lg:inline-block lg:mt-0 text-white-200  mr-40 mb-2 md:mr-0 md:mb-0 hover:text-gray-300 transition-colors duration-300"
                >
                  Admin
                </Link>
              </li>
              <li>
                <Link
                  href="/contact/contact"
                  className="block mt-4 lg:inline-block lg:mt-0 text-white-200  mr-40 mb-2 md:mr-0 md:mb-0 hover:text-gray-300 transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
            <label
              htmlFor="nav-toggle"
              className={`cursor-pointer flex items-center md:hidden ${
                isMenuOpen ? 'block' : 'hidden'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className={`w-6 h-6 ${
                  isMenuOpen ? 'block transition duration-500 ease-in-out' : 'hidden'
                }`}
                viewBox="0 0 24 24"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </label>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
