import React from "react";
import TopNav from "./TopNav";
import MiddleNav from "./MiddleNav";
import BottomNav from "./BottomNav";

const Navbar = () => {
  return (
    <div className="z-80">
      {/* Top Navbar */}
      <TopNav />
      {/* Middle Navbar  */}
      <div className="bg-white">
        <MiddleNav />
      </div>
      {/* Bottom Navbar */}
      <div className="bg-white">
        <BottomNav />
      </div>
    </div>
  );
};

export default Navbar;
