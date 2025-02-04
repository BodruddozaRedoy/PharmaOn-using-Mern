import React from "react";
import useAllAdvertise from "../../../hooks/useAllAdvertise";
import useAxiosInstance from "../../../hooks/useAxiosInstance";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

const BannerAdvertise = () => {
  const { ads, refetch } = useAllAdvertise();
  const axiosSecure = useAxiosInstance()

  // const {data:[ads]} = useQuery({
  //   queryKey: ['ads'],
  //   queryFn: async () => {
  //     const res = axiosSecure.get("/advertise")
  //   }
  // })

  const handleAdd = async (id) => {
    const status = "activated"
    const res = await axiosSecure.patch(`/advertise/${id}`,{status})
    if(res.data){
      toast.success("Activated to slide")
      refetch()
    }
  }

  const handleRemove = async (id) => {
    const status = "pending"
    const res = await axiosSecure.patch(`/advertise/${id}`,{status})
    if(res.data){
      toast.success("Removed from slide")
      refetch()
    }
  }
  return (
    <div className="lg:p-10">
      <Helmet title="Banner Advertise | PharmaOn"/>

      <h1 className="text-xl font-semibold mb-3">Banner Advertise</h1>
      <div className="overflow-x-auto bg-white rounded-xl ">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Medicine Image</th>
              <th>Medicine Name</th>
              <th>Description</th>
              <th>Seller Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {ads.map((i, index) => (
              <tr>
                <th>{index + 1}</th>
                <td><img className="w-12 h-12 rounded" src={i.imgUrl} alt="" /></td>
                <td>{i.name}</td>
                <td className="truncate">{i.description}</td>
                <td>{i.userEmail}</td>
                <td>
                  {i.status === "pending" ? (
                    <button onClick={() => handleAdd(i._id)} className="btn btn-sm bg-success text-white">
                      Add to Slide
                    </button>
                  ) : (
                    <button onClick={() => handleRemove(i._id)} className="btn btn-sm bg-error text-white">
                      Remove from Slide
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

export default BannerAdvertise;
