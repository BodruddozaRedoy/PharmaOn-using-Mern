import React, { useRef, useState } from "react";
import useUsers from "../../../hooks/useAllUsers";
import useAxiosInstance from "../../../hooks/useAxiosInstance";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const ManageUser = () => {
  const { users, refetch } = useUsers();
  const axiosSecure = useAxiosInstance()
  const [disabled, setDisabled] = useState(true);
  const [role, setRole] = useState("")
  const role_ = useRef(null)

// console.log(role);

//   update user role 
const handleUpdate = async (email) => {
    const res = await axiosSecure.put(`/users/${email}`, {role})
    if(res.data) toast.success(`User role update to ${role}`)
    setDisabled(!disabled); 
}
  return (
    <div className="bg-accent lg:p-10 rounded-xl">
      <Helmet title="Manage User | PharmaOn"/>

      <h1 className="text-xl font-semibold mb-5">
        Manage User ({users?.length})
      </h1>
      {/* user table  */}
      <div className="overflow-x-auto bg-white rounded-xl">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users?.map((user, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{user.displayName}</td>
                <td className="truncate">{user.email}</td>
                <td className="">
                  <select
                    disabled={disabled}
                    ref={role_}
                    onChange={(e) => setRole(e.target.value)}
                    className={`w-full lg:px-4 py-2 border rounded-md ${
                      disabled
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white text-black cursor-pointer"
                    } appearance-none`}
                    defaultValue={user.role}
                    name=""
                    id=""
                  >
                    <option value="user">user</option>
                    <option value="seller">seller</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td>
                  {disabled ? (
                    <button
                      onClick={() => setDisabled(!disabled)}
                      className="btn bg-primary text-white btn-sm"
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      onClick={() => {handleUpdate(user.email)}}
                      className="btn bg-primary text-white btn-sm"
                    >
                      Update
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
