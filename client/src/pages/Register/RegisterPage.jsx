import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../context/AuthContext";
import { axiosPublic } from "../../hooks/useAxiosInstance";

const imgBBApiKey = import.meta.env.VITE_IMGBB_API_KEY;
const imgBBApi = `https://api.imgbb.com/1/upload?key=${imgBBApiKey}`;

const RegisterPage = () => {
  const { createUser, updateUser, setUser } = useContext(AuthContext);
  const [error, setError] = useState([]);
  const [toggleShow, setToggleShow] = useState(false);
  const [imgUploading, setImgUploading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const role = e.target.role.value;
    const imgFile = e.target.imgUpload.files[0];

    const errors = [];
    if (!displayName) errors.push("Username is required.");
    if (!email.includes("@")) errors.push("Invalid email format.");
    if (!role) errors.push("Role is required.");
    if (!imgFile) errors.push("Profile picture is required.");
    if (password.length < 6)
      errors.push("Password must be at least 6 characters long.");
    if (!/[A-Z]/.test(password))
      errors.push("Password must contain at least one uppercase letter.");
    if (!/[a-z]/.test(password))
      errors.push("Password must contain at least one lowercase letter.");

    if (errors.length > 0) {
      setError(errors);
      return;
    }

    setError([]);

    try {
      setImgUploading(true);

      // Upload Image
      const formData = new FormData();
      formData.append("image", imgFile);

      const res = await axiosPublic.post(imgBBApi, formData);

      if (res.data.success) {
        const imgUrl = res.data.data.display_url;

        // Create user data
        const user = { displayName, email, photoURL: imgUrl, role };

        await createUser(email, password);
        await updateUser({ displayName: name, photoURL: imgUrl });
        await axiosPublic.post("/users", user);

        setUser(user);
        toast.success("Registration successful!", {
          position: "top-center",
        });

        navigate("/");
      } else {
        toast.error("Failed to upload image. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err.message);
      toast.error("Registration failed. Please try again.");
    } finally {
      setImgUploading(false);
    }
  };

  return (
    <div className="h-[100vh] flex items-center justify-center px-5 lg:px-0">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register | Your App</title>
      </Helmet>
      <div className="max-w-screen-lg bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="text-center">
            <h1 className="text-2xl xl:text-4xl font-extrabold text-primary">Register</h1>
            <p className="text-gray-500 text-sm">Create your account below</p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input
              className="w-full px-5 py-3 rounded-lg border border-gray-300"
              type="text"
              name="name"
              placeholder="Enter your username"
            />
            <input
              className="w-full px-5 py-3 rounded-lg border border-gray-300"
              type="email"
              name="email"
              placeholder="Enter your email"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Profile Picture
              </label>
              <input
                className="w-full file-input file-input-bordered"
                type="file"
                name="imgUpload"
                accept="image/*"
              />
            </div>
            <div className="relative">
              <input
                className="w-full px-5 py-3 rounded-lg border border-gray-300"
                type={toggleShow ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
              />
              <div
                className="absolute top-3 right-3 cursor-pointer"
                onClick={() => setToggleShow(!toggleShow)}
              >
                {toggleShow ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            <select
              className="w-full px-5 py-3 rounded-lg border border-gray-300"
              name="role"
              defaultValue=""
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="user">User</option>
              <option value="seller">Seller</option>
            </select>
            <div className="text-sm text-red-500">
              {error.map((err, index) => (
                <p key={index}>{err}</p>
              ))}
            </div>
            <button
              className="w-full bg-primary text-white py-3 rounded-lg"
              type="submit"
              disabled={imgUploading}
            >
              {imgUploading ? "Uploading..." : "Sign Up"}
            </button>
            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-bold">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
