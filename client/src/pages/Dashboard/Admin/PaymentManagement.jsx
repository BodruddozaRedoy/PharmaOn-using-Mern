import React from "react";
import useAxiosInstance from "../../../hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const PaymentManage = () => {
  const axiosSecure = useAxiosInstance();
  const { data: payments = [], refetch } = useQuery({
    queryKey: ["payments-history"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  const handleAccept = async (id) => {
    const res = await axiosSecure.patch(`/payments/${id}`, {status: "paid"})
    if(res.data){
      toast.success("Payment Accepted")
      refetch()
    }
  }
  return (
    <div className="">
      <Helmet title="Payment Management | PharmaOn"/>

      <h1 className="text-xl font-semibold mb-3">Payment Management</h1>
      {/* table  */}
      <div className="overflow-x-auto bg-white rounded-xl lg:p-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Transaction Id</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {payments?.map((i, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{i.transactionId}</td>
                <td>{i.price?.toFixed(2)}</td>
                <td className="flex gap-3">
                  {i.status === "pending" ? (
                    <button className="btn btn-sm bg-warning text-white">
                      Pending
                    </button>
                  ) : (
                    <button className="btn btn-sm bg-success text-white">
                      Paid
                    </button>
                  )}
                </td>
                <td>
                  <button disabled={i.status !== 'pending'} onClick={() => handleAccept(i._id)} className="btn btn-sm bg-primary text-white">
                    {i.status === 'pending' ? 'Accept Payment' : 'Accepted'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentManage;
