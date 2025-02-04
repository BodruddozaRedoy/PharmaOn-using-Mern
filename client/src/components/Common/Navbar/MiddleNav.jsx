import React, { useContext } from "react";
import MainBtn from "../../../shared/MainBtn";
import { AuthContext } from "../../../context/AuthContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useCart from "../../../hooks/useCart";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../../hooks/useAxiosInstance";

const MiddleNav = () => {
  const { user, logOut } = useContext(AuthContext);
  const { data: loggedUser } = useQuery({
    queryKey: ["loggedUser"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/user/${user.email}`);
      return res.data;
    },
  });
  // console.log(loggedUser);

  const [cart] = useCart();
  const handleLogout = () => {
    logOut().then((result) => {
      localStorage.clear("token");
      toast.success("Logged Out Successfully");
    });
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  return (
    <div className="py-5 px-5 md:px-10 flex items-center justify-between border-b w-full">
      {/* Navbar start  */}
      <Link to={"/"}>
        <div className="flex items-center gap-3">
          <img className="w-[40px]" src="/pharmaon-icon.svg" alt="" />
          <h1 className="font-bold text-primary font-lexend text-2xl">
            PharmaOn
          </h1>
        </div>
      </Link>
      {/* Navbar middle  */}
      <div className="hidden lg:flex gap-4">
        {/* <div className="join">
          <div>
            <div>
              <input
                className="input w-[500px] input-bordered join-item"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="indicator">
            <button className="btn join-item bg-primary hover:bg-secondary text-accent">
              Search
            </button>
          </div>
        </div> */}
        <select defaultValue={'english'} className="select select-bordered w-full max-w-xs hidden lg:flex">
          <option value={'english'}>
            English
          </option>
          <option>Bengali</option>
          <option>Arabic</option>
        </select>
      </div>
      {/* Navbar end  */}
      <div className="flex items-center gap-3">
        {
          user && (<div className="dropdown dropdown-end ">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {cart.length}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-accent z-[1] mt-3 w-52 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">{cart.length} Items</span>
                <span className="text-primary">
                  Subtotal: ${subtotal?.toFixed(2)}
                </span>
                <div className="card-actions">
                  <Link to={"/cart"}>
                    <button className="btn bg-primary w-full text-accent">
                      View cart
                    </button>
                  </Link>
  
                  {/* <button className="btn bg-primary text-accent btn-block">
                    <Link to={"/cart"}>View cart</Link>
                  </button> */}
                </div>
              </div>
            </div>
          </div>)
        }
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="ring-primary ring-offset-base-100 w-20 rounded-full ring ring-offset-2">
              <img
                className="object-cover w-full"
                alt={user?.name}
                src={
                  user?.photoURL ||
                  "https://img.icons8.com/?size=100&id=kDoeg22e5jUY&format=png&color=000000"
                }
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-accent font-semibold rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={`/update-profile`}>Profile</Link>
            </li>
            <li>
              <Link
                to={
                  loggedUser?.role === "admin"
                    ? "/dashboard/admin-homepage"
                    : loggedUser?.role === "seller"
                    ? "/dashboard/seller-homepage"
                    : loggedUser?.role === "user"
                    ? "/dashboard/user-payment-history"
                    : "/login"
                }
              >
                Dashboard
              </Link>
            </li>
            {user && (
              <li onClick={handleLogout}>
                <a href="">Logout</a>
              </li>
            )}
          </ul>
        </div>
        {!user && (
          <Link to={"/login"}>
            <MainBtn text={"Join Us"} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default MiddleNav;
