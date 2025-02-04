import React, { useContext, useRef, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
import toast, { Toaster } from "react-hot-toast";

import { Helmet } from "react-helmet";
import { AuthContext } from "../../context/AuthContext";
import { axiosPublic } from "../../hooks/useAxiosInstance";

const LoginPage = () => {
  const { loginUser, setUser, googleLogin, setEmail } = useContext(AuthContext);
  const [toggleShow, setToggleShow] = useState(false);
  const inputRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!password) {
      return toast.error("Please type your password", {
        position: "top-center",
        autoClose: 3000,
      });
    }

    loginUser(email, password)
      .then((result) => {
        setUser(result.user);
        // axiosPublic.post("/token", result.user).then((res) => {
        //   localStorage.setItem("token", res.data.token);
        // });
        toast.success("Logged in successfully", {
          position: "top-center",
          autoClose: 3000,
        });
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        toast.error("Invalid credential", {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };
  const handleGmailLogin = () => {
    googleLogin().then((result) => {
      const user_ = result.user;
      const user = {
        displayName: user_.displayName,
        email: user_.email,
        photoURL: user_.photoURL,
        role: "user",
      };
      //TODO: save user to db
      axiosPublic.post("/users", user).then((res) => {
        // axiosPublic.post("/token", user).then((res) => {
        //   localStorage.setItem("token", res.data.token);
        // });
        navigate(location?.state?.form || "/");
        toast.success("Logged in successfully", {
          position: "top-center",
          autoClose: 3000,
        });
      });
    });
  };

  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login | Career Horizon</title>
      </Helmet>
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        {/* <div className="flex-1 bg-primary text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
              }}
            ></div>
          </div> */}
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className=" flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-primary">
                Login
              </h1>
              <p className="text-[12px] text-gray-500">
                Hey enter your details to login your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-xs flex flex-col gap-4"
              >
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-text-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  name="email"
                  ref={inputRef}
                  placeholder="Enter your email"
                />
                <div className="relative">
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-text-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type={toggleShow ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                  />
                  <div
                    className="absolute top-[14px] right-[10px] cursor-pointer select-none"
                    onClick={() => setToggleShow(!toggleShow)}
                  >
                    {toggleShow ? (
                      <FaEye className="text-lg" />
                    ) : (
                      <FaEyeSlash className="text-lg" />
                    )}
                  </div>
                </div>
                <Link
                  // onClick={handelEmail}
                  className="underline text-xs cursor-pointer hover:text-primary text-start"
                >
                  Forget password?
                </Link>
                <button className="mt-5 tracking-wide font-semibold bg-primary text-gray-100 w-full py-4 rounded-lg hover:bg-secondary transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <span className="ml-3">Login</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Don't have an account?{" "}
                  <Link to={"/register"}>
                    <span className="text-primary font-semibold">Register</span>
                  </Link>
                </p>
                <hr />
                <div
                  onClick={handleGmailLogin}
                  className="btn bg-primary hover:bg-secondary text-white"
                >
                  <FaGoogle /> Google
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
