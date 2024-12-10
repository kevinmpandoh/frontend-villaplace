interface StarProps {
  filled: boolean;
}

const Star = ({ filled }: StarProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={filled ? "gold" : "none"}
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="gold"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
    />
  </svg>
);

export default Star;
