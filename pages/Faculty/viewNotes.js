import { useRouter } from "next/router";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import axios from "axios";
import Rating from "react-rating";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import connectDB from "@/middleware/db";
import Rate from "@/models/Rating";

function extractDriveFileId(url) {
  if (url && typeof url === "string") {
    const matchLocal = url.match(/^public\\uploads\\[-\w]+\.pdf$/);
    //const matchDrive = url.match(/[-\w]{25,}(?=[^/]*$)/);
    if (matchLocal) {
      console.log(matchLocal);
      return (
        <div>
          <iframe
            name="display-frame"
            src={`../${url.slice(7)}`}
            className="w-100 h-56 border border-black"
          />
        </div>
      );
    } else {
      const matchDrive = url.match(/[-\w]{25,}/)[0];
      return (
        <div
          className="pt-4"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <iframe
            name="display-frame"
            className=" aspect-square w-1/3"
            src={`https://drive.google.com/file/d/${matchDrive}/preview`}
          />
        </div>
      );
    }
  }
}

export default function ViewNotes({ totalRating }) {
  const router = useRouter();
  const { path, file } = router.query;
  const fileId = extractDriveFileId(path);
  console.log(fileId);

  const [rating, setRating] = useState(0);
  const [authorId, setAuthorId] = useState("");

  const existingItem = totalRating.find(
    (item) => item.userId === authorId && item.file === file
  );
  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);

    setAuthorId(decodedToken.id);
  }, [router]);

  function handleRating(rate) {
    if (rate > 0) {
      axios
        .post("/api/student/rating", {
          rating: rate,
          file: file,
          userId: authorId,
        })
        .then((response) => {
          window.location.reload();
        });
    }
  }
  function handleUpdate(rate, _id) {
    if (rate > 0) {
      axios
        .put("/api/student/rating", {
          id: _id,
          rating: rate,
          file: file,
          userId: authorId,
        })
        .then((response) => {
          window.location.reload();
        });
    }
  }

  const showStar = totalRating.some(
    (item) => authorId === item.userId && file === item.file
  ) ? (
    <div className="pt-4" style={{ display: "flex", justifyContent: "center" }}>
      <Rating
        className="items-center justify-center"
        emptySymbol={<FaRegStar className="text-gray-400" size={28} />}
        fullSymbol={<FaStar className="text-yellow-400" size={28} />}
        fractions={2}
        initialRating={existingItem.rating}
        onClick={(rate) => (
          setRating(rate), handleUpdate(rate, existingItem._id)
        )}
      />
    </div>
  ) : (
    <div className="pt-4" style={{ display: "flex", justifyContent: "center" }}>
    <Rating
    className="items-center justify-center"
      emptySymbol={<FaRegStar className="text-gray-400" size={28} />}
      fullSymbol={<FaStar className="text-yellow-400" size={28} />}
      fractions={2}
      initialRating={rating}
      onClick={(rate) => (setRating(rate), handleRating(rate))}
    />
    </div>
  );

  return (
    <section>
      <div>
        <div>{extractDriveFileId(path)}</div>
      </div>
      {showStar}

      <p
        div
        className="pt-2"
        style={{ display: "flex", justifyContent: "center" }}
      >
        Rating: {rating || existingItem?.rating || "No rating found"}
      </p>
    </section>
  );
}

export async function getServerSideProps(context) {
  try {
    await connectDB();
    const findRatings = await Rate.find({});

    const ratingDone = findRatings.map((member) => ({
      _id: member.id,
      userId: member.userId,
      file: member.file,
      rating: member.rating,
      isRated: member.isRated,
    }));

    return {
      props: {
        totalRating: ratingDone,
      },
    };
  } catch (error) {
    console.error(error.message);
    return {
      props: {
        totalRating: [],
      },
    };
  }
}
