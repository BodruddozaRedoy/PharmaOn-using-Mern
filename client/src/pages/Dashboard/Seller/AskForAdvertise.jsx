import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosInstance, { axiosPublic } from "../../../hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAllAdvertise from "../../../hooks/useAllAdvertise";
import useCategory from "../../../hooks/useCategory";
import { Helmet } from "react-helmet";

const AskForAdvertise = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosInstance()
  const [categories, isLoading, refetch] = useCategory();
  const { ads, refetch: addRefetch } = useAllAdvertise();
  const filteredAds = ads?.filter((prev) => prev.userEmail === user.email);

  const handleAdd = () => {
    document.getElementById("my_modal_5").showModal();
  };

  const handleAddSubmit = async (data) => {
    // console.log(data);
    const status = "pending";
    const ad = {
      ...data,
      status,
    };
    const res = await axiosSecure.post("/advertise", ad);
    if (res.data) {
      toast.success("Advertise request sent to admin");
      document.getElementById("my_modal_5").close();
      addRefetch();
    }
  };

  return (
    <div className="lg:p-10 ">
      <Helmet title="Ask Ad | PharmaOn"/>

      <h1 className="text-xl font-semibold mb-3">Advertisement list</h1>
      <button onClick={handleAdd} className="btn bg-primary text-white mb-3">
        Add Advertise
      </button>
      <div className="overflow-x-auto bg-white p-5 rounded-xl">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Medicine Image</th>
              <th>Medicine Name</th>
              <th>Category</th>
              <th>Short Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {filteredAds?.map((i, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>
                  <div className="mask mask-squircle h-12 w-12">
                    <img src={i.imgUrl} alt="Avatar Tailwind CSS Component" />
                  </div>
                </td>
                <td>{i.name}</td>
                <td>{i.category}</td>
                <td>{i.description}</td>
                <td className="flex gap-3">
                  {i.status === "pending" ? (
                    <button className="btn btn-sm bg-warning text-white">
                      Pending
                    </button>
                  ) : (
                    <button className="btn btn-sm bg-success text-white">
                      Activated
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Advertise</h3>
          <form action="" onSubmit={handleSubmit(handleAddSubmit)}>
            {/* user email  */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">User Email</span>
              </div>
              <input
                type="text"
                {...register("userEmail", { required: true })}
                placeholder="Type here"
                value={user.email}
                readOnly
                className="input input-bordered"
              />
              {errors.userEmail && (
                <span className="text-error">User email is required</span>
              )}
            </label>
            {/* name */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Medicine Name</span>
              </div>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Type here"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-error">Name is required</span>
              )}
            </label>
            {/* description */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Short Description</span>
              </div>
              <input
                type="text"
                {...register("description", { required: true })}
                placeholder="Type here"
                className="input input-bordered"
              />
              {errors.description && (
                <span className="text-error">Description is required</span>
              )}
            </label>
            {/* category */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Category</span>
              </div>
              <select
                {...register("category", { required: true })}
                className="select select-bordered"
              >
                <option disabled selected>
                  Pick one
                </option>
                {categories?.map((category, index) => (
                  <option value={category.slug} key={index}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="text-error">Category is required</span>
              )}
            </label>
            {/* img url  */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Image Url</span>
              </div>
              <input
                type="text"
                {...register("imgUrl")}
                placeholder="Type here"
                className="input input-bordered"
              />
              {errors.imgUrl && (
                <span className="text-error">Image URL is required</span>
              )}
            </label>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button type="submit" className="btn bg-primary text-white">
                Add
              </button>
              <button
                type="button"
                onClick={() => document.getElementById("my_modal_5").close()}
                className="btn bg-error text-white"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AskForAdvertise;
