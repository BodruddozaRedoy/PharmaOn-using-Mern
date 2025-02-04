import React, { useState } from "react";
import useCategory from "../../../hooks/useCategory";
import useAxiosInstance from "../../../hooks/useAxiosInstance";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const ManageCategory = () => {
  const [categories, isLoading, refetch] = useCategory();
  const axiosSecure = useAxiosInstance();
  const [editStates, setEditStates] = useState({});
  const [editableData, setEditableData] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Handle per-row edit state toggle
  const handleEditToggle = (id) => {
    setEditStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    setEditableData((prevState) => ({
      ...prevState,
      [id]: categories.find((cat) => cat._id === id),
    }));
  };

  // Handle input changes for editable fields
  const handleInputChange = (id, field, value) => {
    setEditableData((prevState) => ({
      ...prevState,
      [id]: { ...prevState[id], [field]: value },
    }));
  };

  // Handle category update
  const handleUpdate = async (id) => {
    const updatedCategory = editableData[id];
    try {
      const res = await axiosSecure.patch(`/categories/${id}`, updatedCategory);
      if (res.data) {
        toast.success("Category updated successfully");
        setEditStates((prevState) => ({ ...prevState, [id]: false }));
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update category");
    }
  };

  // Handle category deletion
  const handleDelete = async (id) => {
    try {
      const res = await axiosSecure.delete(`/categories/${id}`);
      if (res.data) {
        toast.success("Category deleted");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  // Handle adding a new category
  const handleAddSubmit = async (category) => {
    try {
      const res = await axiosSecure.post("/categories", category);
      if (res.data) {
        toast.success("Category added successfully");
        setIsAddModalOpen(false);
        reset();
        refetch();
      }
    } catch (error) {
      toast.error("Failed to add category");
    }
  };

  return (
    <div className="bg-accent rounded-xl lg:p-10">
      <Helmet title="Manage Category | PharmaOn"/>

      <h1 className="font-semibold text-xl mb-3">Manage Category</h1>
      <div className="p-5 bg-white rounded-xl">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn bg-primary text-white mb-3"
        >
          Add Category
        </button>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Image</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category._id}>
                  <th>{index + 1}</th>
                  <td>
                    {editStates[category._id] ? (
                      <input
                        type="text"
                        value={editableData[category._id]?.img || ""}
                        onChange={(e) =>
                          handleInputChange(category._id, "img", e.target.value)
                        }
                        className="input input-bordered"
                      />
                    ) : (
                      <img
                        src={category.img}
                        alt="Category"
                        className="w-12 h-12 rounded"
                      />
                    )}
                  </td>
                  <td>
                    {editStates[category._id] ? (
                      <input
                        type="text"
                        value={editableData[category._id]?.name || ""}
                        onChange={(e) =>
                          handleInputChange(category._id, "name", e.target.value)
                        }
                        className="input input-bordered"
                      />
                    ) : (
                      category.name
                    )}
                  </td>
                  <td>
                    {editStates[category._id] ? (
                      <input
                        type="text"
                        value={editableData[category._id]?.slug || ""}
                        onChange={(e) =>
                          handleInputChange(category._id, "slug", e.target.value)
                        }
                        className="input input-bordered"
                      />
                    ) : (
                      category.slug
                    )}
                  </td>
                  <td>
                    {editStates[category._id] ? (
                      <button
                        onClick={() => handleUpdate(category._id)}
                        className="btn btn-sm bg-success text-white"
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditToggle(category._id)}
                        className="btn btn-sm bg-warning text-white"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="btn btn-sm bg-error text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Category Modal */}
      {isAddModalOpen && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Category</h3>
            <form onSubmit={handleSubmit(handleAddSubmit)}>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Name</span>
                </div>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Category name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-error">Name is required</span>
                )}
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Slug</span>
                </div>
                <input
                  type="text"
                  {...register("slug", { required: true })}
                  placeholder="Category slug"
                  className="input input-bordered"
                />
                {errors.slug && (
                  <span className="text-error">Slug is required</span>
                )}
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Image URL</span>
                </div>
                <input
                  type="text"
                  {...register("img", { required: true })}
                  placeholder="Image URL"
                  className="input input-bordered"
                />
                {errors.img && (
                  <span className="text-error">Image URL is required</span>
                )}
              </label>
              <div className="modal-action">
                <button type="submit" className="btn bg-primary text-white">
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="btn bg-error text-white"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageCategory;
