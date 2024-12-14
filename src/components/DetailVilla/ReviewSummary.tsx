import React from "react";
import distributePercentages from "@/utils/distributedPercentage";

interface ReviewSummaryProps {
  averageRating: number;
  commentCount: number;
  starPercentage: number[];
}

const ReviewSummary = ({
  averageRating,
  commentCount,
  starPercentage,
}: ReviewSummaryProps) => {
  const rawStarCounts = [
    starPercentage[4] ?? 1, // 5-star
    starPercentage[3] ?? 1, // 4-star
    starPercentage[2] ?? 1, // 3-star
    starPercentage[1] ?? 1, // 2-star
    starPercentage[0] ?? 1, // 1-star
  ];
  const adjustedPercentages = distributePercentages(rawStarCounts);
  return (
    <div className="flex md:w-2/3 w-full mb-8 justify-center items-center">
      <div className="border-2 p-6 rounded-lg  w-full ">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Rating & Ulasan
        </h2>
        <div className="flex justify-center flex-col items-center mb-4">
          <span className=" text-gray-700 text-lg">
            {averageRating.toFixed(1)} dari 5
          </span>
        </div>
        <p className="text-center text-gray-500 mb-6">
          {commentCount} ulasan dari pengguna
        </p>
        <div className="space-y-2">
          {adjustedPercentages.map((percentage, index) => (
            <div className="flex items-center" key={5 - index}>
              <span className="w-1/4 text-gray-700">{5 - index} star</span>
              <div className="w-3/4 bg-gray-200 rounded-full h-2.5 mr-2">
                <div
                  className="bg-[#B7906C] h-2.5 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="w-1/12 text-gray-700">{percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;
