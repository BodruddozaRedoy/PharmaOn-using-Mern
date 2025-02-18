import React from "react";
import { Link } from "react-router-dom";

const offers = [
  {
    title: "Special discount",
    desc: "Buy our categorized discount products",
    color: "#f1f5e8"
  },
  {
    title: "Special discount",
    desc: "Buy our categorized discount products",
    color: "#fcf0eb"
  },
  {
    title: "Special discount",
    desc: "Buy our categorized discount products",
    color: "#f0f0d7"
  },
];

const Offers = () => {
  return (
    <div className="flex flex-col mt-10  gap-7 items-center">
        <div className={`flex flex-col items-center rounded-xl gap-10 p-5 bg-[#f1f5e8] dark:bg-gray-600 w-full`}>
          <div>
            <h1 className="font-semibold text-xl mb-2">Delivery discount</h1>
            <p className="text-content">Buy our categorized discount products</p>
          </div>
          <Link to={"/shop"}>
            <button className="btn btn-sm bg-[#10b981] text-white">
              Shop Now
            </button>
          </Link>
        </div>
        <div className={`flex flex-col items-center rounded-xl gap-10 p-5 bg-[#fcf0eb] dark:bg-gray-600 w-full`}>
          <div>
            <h1 className="font-semibold text-xl mb-2">Monthly discount</h1>
            <p className="text-content">Buy our categorized discount products</p>
          </div>
          <Link to={"/shop"}>
            <button className="btn btn-sm bg-error text-white">
              Shop Now
            </button>
          </Link>
        </div>
        <div className={`flex flex-col items-center rounded-xl gap-10 p-5 bg-[#f0f0d7] dark:bg-gray-600 w-full`}>
          <div>
            <h1 className="font-semibold text-xl mb-2">Daily discount</h1>
            <p className="text-content">Buy our categorized discount products</p>
          </div>
          <Link to={"/shop"}>
            <button className="btn btn-sm bg-primary text-white">
              Shop Now
            </button>
          </Link>
        </div>
    </div>
  );
};

export default Offers;
