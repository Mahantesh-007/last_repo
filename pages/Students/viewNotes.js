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
    const match = url.match(/[-\w]{25,}/);
    if (match) {
      return match[0];
    }
  }
  return null;
}

function DrivePreview({ fileId }) {
  return (
    <div>
      {" "}
      <iframe
        name="display-frame"
        src={`https://drive.google.com/file/d/${fileId}/preview`}
        className="w-100 h-56 border border-black"
      />
    </div>
  );
}

function OtherPreview({ path }) {
  return (
    <div>
      {" "}
      <iframe
        name="display-frame"
        src={path}
        className="w-100 h-56 border border-black"
      />
    </div>
  );
}

export default function ViewNotes({ totalRating }) {
  const router = useRouter();
  const { path, file } = router.query;
  const fileId = extractDriveFileId(path);
  const [rating, setRating] = useState(0);
  const [authorId, setAuthorId] = useState("");
  console.log(totalRating);
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
          console.log(response.data);
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
          console.log(response.data);
          window.location.reload();
        });
    }
  }

  const showStar = totalRating.some(
    (item) => authorId === item.userId && file === item.file
  ) ? (
    <Rating
      emptySymbol={<FaRegStar className="text-gray-400" size={28} />}
      fullSymbol={<FaStar className="text-yellow-400" size={28} />}
      fractions={2}
      initialRating={existingItem.rating}
      onClick={(rate) => (
        setRating(rate), handleUpdate(rate, existingItem._id)
      )}
    />
  ) : (
    <Rating
      emptySymbol={<FaRegStar className="text-gray-400" size={28} />}
      fullSymbol={<FaStar className="text-yellow-400" size={28} />}
      fractions={2}
      initialRating={rating}
      onClick={(rate) => (setRating(rate), handleRating(rate))}
    />
  );

  if (fileId) {
    return (
      <section>
        <div>
          <DrivePreview fileId={fileId} />
        </div>
        {showStar}

        <p>Rating: {rating || existingItem?.rating || "No rating found"}</p>
      </section>
    );
  } else {
    return <OtherPreview path={path} />;
  }
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
        totalRating: ratingDone, // Corrected key name
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
