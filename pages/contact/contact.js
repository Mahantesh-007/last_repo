import Link from "next/link";
import Footer from "@/components/Footer";

const ContactPage = () => {
  return (
    <div
      className="flex flex-col justify-between min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1488998427799-e3362cec87c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
      }}
    >
      <div className="flex flex-col justify-center items-center h-full">
        <div className="w-full sm:max-w-md px-6 py-12 bg-white bg-opacity-90 rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Contact Us
          </h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-bold">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-bold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-gray-700 font-bold"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="flex flex-col items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                Submit
              </button>
              <Link href="/">
                <span className="mt-2 text-sm text-blue-500 hover:text-blue-600">
                  Back to Home
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
