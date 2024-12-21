import React from "react";

interface RatingStarProps {
  rating: number;
}

import Star from "./Star";

const RatingStar = ({ rating }: RatingStarProps) => {
  const roundedRating = Math.round(rating);
  const totalStars = 5;
  return (
    <div className="flex">
      {Array.from({ length: totalStars }, (_, index) => (
        <Star key={index} filled={index < roundedRating} />
      ))}
    </div>
  );
};

export default RatingStar;
