import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosInstance from "../../../hooks/useAxiosInstance";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet";

const SellerPaymentHistory = () => {
  const axiosSecure = useAxiosInstance();
  const { user } = useAuth();
  const { data: payments = [], refetch } = useQuery({
    queryKey: ["seller-payment-history"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });
  // console.log(payments);

  return (
    <div className="">
      <Helmet title="Payment History | PharmaOn"/>

      <h1 className="font-semibold text-xl mb-3">Seller Payment History</h1>
      {/* payment history table  */}
      <div className="overflow-x-auto bg-white p-5 rounded-xl">
        {payments.length === 0 ? (
          <div>No payments found</div>
        ) : (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No.</th>
                <th>Transaction Id</th>
                <th>Customer Email</th>
                {/* <th>Products</th> */}
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {payments?.map((i, index) => (
                <tr>
                  <th>1</th>
                  <td>{i.transactionId}</td>
                  <td>{i.email}</td>
                  {/* <td>{i.cartData.map(name => name.name)}</td> */}
                  <td>{i.cartData.length}</td>
                  <td>{i.price}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SellerPaymentHistory;
