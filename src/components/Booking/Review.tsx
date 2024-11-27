import React, { useState } from "react";

interface ReviewProps {
  villaId: string;
}

const Review: React.FC<ReviewProps> = ({ villaId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleSubmit = () => {
    if (rating && comment) {
      // onSubmit({ rating, comment });
      setRating(0);
      setComment("");
      // onClose();
    } else {
      alert("Harap isi rating dan komentar");
    }
  };

  return (
    <div>
      <div className="mb-4">
        <p className="mb-2">Rating:</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`text-2xl ${
                star <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => handleRatingClick(star)}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="comment" className="block mb-2">
          Komentar:
        </label>
        <textarea
          id="comment"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={handleSubmit}
          className="flex justify-end font-semibold text-white bg-[#089562] hover:bg-green-800 rounded text-sm px-3 py-1.5 me-2 dark:bg-green-600 dark:hover:bg-green-700"
        >
          Kirim
        </button>
      </div>
    </div>
  );
};

export default Review;
