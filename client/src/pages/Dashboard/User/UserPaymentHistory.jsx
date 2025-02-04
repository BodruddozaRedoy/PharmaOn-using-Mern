import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosInstance from "../../../hooks/useAxiosInstance";
import useAuth from "../../../hooks/useAuth";

const UserPaymentHistory = () => {
  const {user} = useAuth()
  const axiosSecure = useAxiosInstance();
  const { data: payments = [] } = useQuery({
    queryKey: ["user-payment-history"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment/user/${user.email}`);
      return res?.data;
    },
  });
  // console.log(payments);
  
  // const cartData = payments[0].cartData
  return (
    <div className="">
      <h1 className="font-semibold text-xl mb-3">User Payment History</h1>
      {/* payment history table  */}
      <div className="overflow-x-auto bg-white lg:p-5 rounded-xl">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Transaction Id</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {payments?.map((i, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{i.transactionId}</td>
                <td>${i.price}</td>
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
                {/* <td>
                  {
                    cartData.map()
                  }
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPaymentHistory;
