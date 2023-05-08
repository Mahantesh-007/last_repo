import Rating from "react-rating";
import React, { useState } from "react";
import {FaRegStar,FaStar,FaStarHalfAlt } from 'react-icons/fa';
import axios from "axios";

const ReactRating = () => {
  const [rating, setRating] = useState(0);
  function handleRating(rate) {
    if (rate > 0) {
      axios.post("/api/student/rating", { rating: rate }).then(response => {
        console.log(response.data);
      });
    }
  }
  return (
    <section>
      <Rating
        emptySymbol= {<FaRegStar className="text-gray-400" size={28}/>}
        fullSymbol={<FaStar className="text-yellow-400" size={28}/>}
        fractions={2}
        initialRating={rating}
        onClick={rate => (setRating(rate),handleRating(rate))}
      />
       <p>Rating: {rating}</p>
    </section>
  );
};

export default ReactRating;
