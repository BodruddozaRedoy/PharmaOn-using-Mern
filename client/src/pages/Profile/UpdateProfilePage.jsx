import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAllUsers from "../../hooks/useAllUsers";
import { useForm } from "react-hook-form";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const UpdateProfilePage = () => {
  const { users, refetch, currentUser } = useAllUsers();
  const { user, updateUser } = useAuth();
  const [edit, setEdit] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosInstance()

  const handleUpdate = async (data) => {
    // console.log(data);
    updateUser(data)
    .then(result => {
        // console.log(result);
        axiosSecure.patch(`/users/${user?.email}`, data)
        .then(res => {
            // console.log(res.data);
            toast.success("Profile Updated")
            setEdit(!edit)
            
        })
        
    })
  };

  return (
    <div className="bg-accent p-10 lg:w-[30%] mx-auto h-auto mt-10 flex flex-col items-center justify-center rounded-xl">
      <Helmet title="Profile | PharmaOn"/>

      <div className="ring-primary ring-offset-base-100 w-40 overflow-hidden rounded-full ring ring-offset-2">
        <img
          className="object-cover w-full"
          alt={user?.displayName}
          src={
            user?.photoURL ||
            "https://img.icons8.com/?size=100&id=kDoeg22e5jUY&format=png&color=000000"
          }
        />
      </div>
      <form
        className="flex flex-col gap-3"
        action=""
        onSubmit={handleSubmit(handleUpdate)}
      >
        {/* img url  */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Photo URL</span>
          </div>
          <input
            type="text"
            {...register("photoURL", { required: true })}
            placeholder="Type here"
            readOnly={!edit}
            defaultValue={user?.photoURL}
            className="input input-bordered"
          />
          {errors.photoURL && (
            <span className="text-error">Photo url is required</span>
          )}
        </label>
        {/* name  */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Profile Name</span>
          </div>
          <input
            type="text"
            {...register("displayName", { required: true })}
            placeholder="Type here"
            defaultValue={user?.displayName}
            readOnly={!edit}
            className="input input-bordered"
          />
          {errors.displayName && (
            <span className="text-error">Profile name is required</span>
          )}
        </label>
        {edit ? (
          <div className="flex gap-3 items-center justify-center">
            <button type="submit" className="btn bg-primary text-white">
            Update
          </button>
          <button onClick={() => setEdit(!edit)} type="button" className="btn bg-warning text-white">
            Discard
          </button>
          </div>
        ) : (
          <button onClick={() => setEdit(!edit)} type="button" className="btn bg-warning text-white">
            Edit
          </button>
        )}
      </form>
    </div>
  );
};

export default UpdateProfilePage;
