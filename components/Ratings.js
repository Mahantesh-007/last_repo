import { useState } from 'react';
import axios from 'axios';

export default function Rating({ userId, fileId }) {
  const [rating, setRating] = useState(0);
  const [isRated, setIsRated] = useState(false);

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleRatingSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/student/rating', {
        UserId: userId,
        FileId: fileId,
        Rating: rating
      });
      setIsRated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRatingUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`/api/student/rating${response.data._id}`, {
        UserId: userId,
        FileId: fileId,
        Rating: rating
      });
      setIsRated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRatingReset = (event) => {
    event.preventDefault();
    setRating(0);
    setIsRated(false);
  };

  const renderRatingForm = () => {
    return (
      <form onSubmit={handleRatingSubmit}>
        <label htmlFor="rating">Rate this file:</label>
        <input
          type="number"
          id="rating"
          name="rating"
          min="1"
          max="5"
          value={rating}
          onChange={handleRatingChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    );
  };

  const renderRatingUpdateForm = () => {
    return (
      <form onSubmit={handleRatingUpdate}>
        <label htmlFor="rating">Update your rating:</label>
        <input
          type="number"
          id="rating"
          name="rating"
          min="1"
          max="5"
          value={rating}
          onChange={handleRatingChange}
          required
        />
        <button type="submit">Update</button>
        <button onClick={handleRatingReset}>Cancel</button>
      </form>
    );
  };

  const renderRatingMessage = () => {
    return (
      <div>
        You have rated this file {rating} stars.{' '}
        <button onClick={() => setIsRated(false)}>Update rating</button>
      </div>
    );
  };

  return (
    <div>
      {isRated ? renderRatingMessage() : renderRatingForm()}
      {isRated && renderRatingUpdateForm()}
    </div>
  );
}
