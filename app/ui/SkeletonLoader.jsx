"use client";

const SkeletonLoader = ({ width, height, borderRadius, className }) => {
  return (
    <div
      className={`animate-pulse bg-gray-300 rounded ${className}`}
      style={{ width, height, borderRadius }}
    ></div>
  );
};

export default SkeletonLoader;