import React, { useContext } from "react";
import Navbar from "../components/Common/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Common/Footer/Footer";
import Headroom from "react-headroom";
import { AuthContext } from "../context/AuthContext";
import Spinner from "../components/Common/Spinner";

const MainLayout = () => {
  const { loading } = useContext(AuthContext);
  return (
    <div className="relative">
      {loading ? (
        <Spinner />
      ) : (
        <div className="relative">
          <nav className="">
            <Headroom>
              <Navbar />
            </Headroom>
          </nav>
          <main>
            <Outlet />
          </main>
          <footer className="">
            <Footer />
          </footer>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
