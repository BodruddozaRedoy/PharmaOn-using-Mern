import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-5 items-center">
      {[0, 1, 2, 3].map((i, index) => (
        <div key={index} className="flex flex-col gap-4">
          <div className="skeleton h-80 w-full"></div>
          <div className="skeleton h-7 w-28"></div>
          <div className="skeleton h-6 w-full"></div>
          <div className="skeleton h-10 w-full"></div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;
