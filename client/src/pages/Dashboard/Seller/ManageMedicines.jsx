import React from "react";
import { useForm } from "react-hook-form";
import useCategory from "../../../hooks/useCategory";
import useAxiosInstance, { axiosPublic } from "../../../hooks/useAxiosInstance";
import axios from "axios";
import useAllProducts from "../../../hooks/useAllProducts";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const imgBBApiKey = import.meta.env.VITE_IMGBB_API_KEY;
const imgBBApi = `https://api.imgbb.com/1/upload?key=${imgBBApiKey}`;

const ManageMedicines = () => {
  const [categories, isLoading, refetch] = useCategory();
  const {user} = useAuth()
  const axiosSecure = useAxiosInstance();
  const [ products, productLoading, productRefetch ] = useAllProducts();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const filteredProduct = products?.filter(prev => prev.userEmail === user.email)

  const handleAddSubmit = async (data) => {
    // console.log(data);
    const file = data.image[0];
    const formData = new FormData();
    formData.append("image", file);
    const resImg = await axiosPublic.post(imgBBApi, formData);
    // console.log(resImg.data.data.display_url);
    const imgUpload = resImg.data.data.display_url;
    const product = {
      ...data,
      imgUpload,
    };
    const res = await axiosSecure.post("/products", product);
    if(res.data){
      toast.success("Product added")
      document.getElementById("my_modal_5").close()
      productRefetch()
    }
  };

  const handleAddMedicine = () => {
    document.getElementById("my_modal_5").showModal();
  };
  return (
    <div>
      <Helmet title="Manage Medicine | PharmaOn"/>

      <h1 className="font-semibold text-xl mb-3">Manage Medicines</h1>
      <button
        onClick={handleAddMedicine}
        className="btn bg-primary text-white mb-3"
      >
        Add Medicine
      </button>

      {/* table  */}
      <div className="overflow-x-auto bg-white rounded-xl">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Image</th>
              <th>Name</th>
              <th>Generic Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Company</th>
              <th>Unit</th>
              <th>Unit Price</th>
              <th>Discounted Price</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {filteredProduct?.map((i, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>
                  <img src={i.imgUpload || i.imgUrl} alt="Category" className="w-12 h-12 rounded" />
                </td>
                <td>{i.name}</td>
                <td>{i.genericName}</td>
                <td className="truncate">{i.description}</td>
                <td>{i.category}</td>
                <td>{i.company}</td>
                <td>{i.unit}</td>
                <td>{i.unitPrice}</td>
                <td>{i.newPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Category</h3>
          <form onSubmit={handleSubmit(handleAddSubmit)}>
            {/* user name */}
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
            {/* item name  */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Name</span>
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
            {/* item generic name  */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Generic Name</span>
              </div>
              <input
                type="text"
                {...register("genericName", { required: true })}
                placeholder="Type here"
                className="input input-bordered"
              />
              {errors.genericName && (
                <span className="text-error">Generic Name is required</span>
              )}
            </label>
            {/* description  */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Description</span>
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
            {/* img uploading  */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Upload Image</span>
              </div>

              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
              />
              {errors.image && (
                <span className="text-error">Image is required</span>
              )}
            </label>
            {/* category  */}
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
            {/* company */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Company</span>
              </div>
              <select
                {...register("company", { required: true })}
                className="select select-bordered"
              >
                <option disabled selected>
                  Pick one
                </option>
                <option value={"Incepta"}>Incepta</option>
                <option value={"Opsonin Pharma"}>Opsonin Pharma</option>
                <option value={"Square Pharmaceuticals"}>
                  Square Pharmaceuticals
                </option>
                <option value={"Popular Pharmaceuticals"}>
                  Popular Pharmaceuticals
                </option>
                <option value={"Beximco Pharma"}>Beximco Pharma</option>
                <option value={"Sk+F"}>Sk+F</option>
              </select>
              {errors.company && (
                <span className="text-error">Company is required</span>
              )}
            </label>
            {/* unit  */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Unit</span>
              </div>
              <input
                type="text"
                {...register("unit", { required: true })}
                placeholder="Type here with Ml or Mg"
                className="input input-bordered"
              />
              {errors.unit && (
                <span className="text-error">Unit is required</span>
              )}
            </label>
            {/* unit price  */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Unit Price</span>
              </div>

              <input
                type="number"
                {...register("unitPrice", { required: true })}
                placeholder="Type here"
                className="input input-bordered"
              />
              {errors.unitPrice && (
                <span className="text-error">Unit Price is required</span>
              )}
            </label>
            {/* discount percentage */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Discount Percentage</span>
              </div>

              <input
                type="number"
                {...register("discountPercentage", { required: true })}
                placeholder="Type here"
                defaultValue={0}
                className="input input-bordered"
              />
              {errors.discountPercentage && (
                <span className="text-error">
                  Discount Percentage is required
                </span>
              )}
            </label>
            {/* available  */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Available</span>
              </div>

              <input
                type="number"
                {...register("available", { required: true })}
                placeholder="Type here"
                className="input input-bordered"
              />
              {errors.available && (
                <span className="text-error">Available is required</span>
              )}
            </label>

            <div className="modal-action">
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

export default ManageMedicines;
