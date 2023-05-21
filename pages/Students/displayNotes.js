import React, { useState } from "react";
import File from "@/models/Upload";
import connectDB from "@/middleware/db";
import Link from "next/link";
import { useRouter } from "next/router";
import FileUpload from "@/models/File";
import Rating from "react-rating";
import Rate from "@/models/Rating";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const displayNotes = ({ findNotes, findFile, rating }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const subjectid = id;
  let notesInSubject = [];
  let filesInSubject = [];
  let result = Array.isArray(findNotes);
  let result1 = Array.isArray(findFile);
  console.log(result);
  console.log(result1);

  if (Array.isArray(findNotes) && Array.isArray(findFile)) {
    if (subjectid) {
      notesInSubject = findNotes.filter((notes) => notes.code === subjectid);
      filesInSubject = findFile.filter((files) => files.code === subjectid);

      if (notesInSubject.length > 0 && notesInSubject[0].code) {
        notesInSubject = findNotes.filter(
          (notes) =>
            notes.code === subjectid && notes.code === notesInSubject[0].code
        );
      }

      if (filesInSubject.length > 0 && filesInSubject[0].code) {
        filesInSubject = findFile.filter(
          (files) =>
            files.code === subjectid && files.code === filesInSubject[0].code
        );
      }
    } else {
      notesInSubject = findNotes;
      filesInSubject = findFile;
    }
  } else {
    console.error("findNotes and fileDisplayed must be arrays");
  }

  const filteredData = notesInSubject.filter((item) =>
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (searchQuery) {
    notesInSubject = filteredData;
  } else {
    notesInSubject = findNotes;
  }
  console.log(
    notesInSubject
      .filter((item) => item.code === subjectid)
      .map((notes) => notes.filename)
  );

  function myRating(id) {
    const fileRatings = rating.filter((item) => item.file === id);
    const totalRating = fileRatings.reduce(
      (total, item) => parseFloat(total) + parseFloat(item.rating),
      0
    );
    const averageRating = parseFloat(totalRating) / fileRatings.length;
    return averageRating;
  }

  return (
    <section class="text-gray-600 body-font">
      <form>
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative mt-4 mx-auto w-2/6">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full h-10 p-4 pl-10 text-sm text-gray-500 border border-gray-500 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
        </div>
      </form>
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-4">
          {filteredData.length > 0 &&
            notesInSubject
              .filter((item) => item.code === subjectid)
              .map((notes) => (
                <div key={notes._id} class="xl:w-1/3 md:w-1/2 p-4">
                  <div class="border border-gray-200 p-6 rounded-lg">
                    <Link
                      href={notes.filename}
                      class="text-lg text-gray-900 font-medium title-font mb-2"
                    >
                      {notes.description}
                    </Link>
                    <p class="leading-relaxed text-base">{notes.description}</p>
                    <div className="flex items-center justify-between">
                      <Link
                        href={{
                          pathname: "/Students/viewNotes",
                          query: { path: `${notes.filename}`, file: notes._id },
                        }}
                        className="text-indigo-500 inline-flex items-center mr-4"
                      >
                        Preview
                      </Link>
                      <div className="flex items-center justify-end">
                        {rating.filter((item) => item.file === notes._id)
                          .length || "0"}
                        <Rating
                          className="items-center justify-center ml-2"
                          emptySymbol={
                            <FaRegStar className="text-gray-400" size={14} />
                          }
                          fullSymbol={
                            <FaStar className="text-yellow-400" size={14} />
                          }
                          fractions={2}
                          initialRating={myRating(notes._id)}
                          readonly={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          {filesInSubject.map((items) => (
            <div key={items._id} class="xl:w-1/3 md:w-1/2 p-4">
              <div class="border border-gray-200 p-6 rounded-lg">
                <Link
                  href={items.file_path}
                  class="text-lg text-gray-900 font-medium title-font mb-2"
                >
                  {items.title}
                </Link>
                <p class="leading-relaxed text-base">{items.description}</p>
                <div className="flex items-center justify-between">
                  <Link
                    href={{
                      pathname: "/Students/viewNotes",
                      query: { path: `${items.file_path}`, file: items._id },
                    }}
                    class="text-indigo-500 inline-flex items-center"
                  >
                    Preview
                  </Link>
                  <div className="flex items-center justify-end">
                    {rating.filter((item) => item.file === items._id).length || "0"}
                    <Rating
                      className="items-center justify-center ml-2"
                      emptySymbol={
                        <FaRegStar className="text-gray-400" size={14} />
                      }
                      fullSymbol={
                        <FaStar className="text-yellow-400" size={14} />
                      }
                      fractions={2}
                      initialRating={myRating(items._id)}
                      readonly={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default displayNotes;

export async function getServerSideProps(context) {
  try {
    await connectDB();
    const findNotes = await File.find({});
    const findFile = await FileUpload.find({});
    const rating = await Rate.find({}, { isRated: 0 });

    const userRating = rating.map((item) => ({
      _id: item.id,
      userId: item.userId,
      file: item.file,
      rating: item.rating,
    }));

    const notesDisplayed = findNotes.map((member) => ({
      _id: member.id || "",
      filename: member.filename || "",
      description: member.description || "",
      subject: member.subject || "",
      code: member.code || "",
      department: member.department || "",
      author: member.author || "",
    }));

    const fileDisplayed = findFile.map((filesend) => ({
      _id: filesend.id || "",
      title: filesend.title || "",
      description: filesend.description || "",
      file_path: filesend.file_path || "",
      file_mimetype: filesend.file_mimetype || "",
      subject: filesend.subject || "",
      code: filesend.code || "",
      department: filesend.department || "",
      author: filesend.author || "",
    }));

    return {
      props: {
        findNotes: notesDisplayed,
        findFile: fileDisplayed,
        rating: userRating,
      },
    };
  } catch (error) {
    console.error(error.message);
    return {
      props: {
        findNotes: [],
        findFile: [],
        rating: [],
      },
    };
  }
}
