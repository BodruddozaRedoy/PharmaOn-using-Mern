import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosInstance from "../../../hooks/useAxiosInstance";
import { Helmet } from "react-helmet";
import SalesOverviewChart from "../../../components/Common/Overview/SalesChannelChart";
import CategoryDistributionChart from "../../../components/Common/Overview/CategoryDistributionChart";
import SalesChannelChart from "../../../components/Common/Overview/SalesChannelChart";

const AdminHomepage = () => {
  const axiosSecure = useAxiosInstance();
  const { data: payments = [], refetch } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });
  // console.log(payments);

  const totalSales = payments?.reduce((acc, item) => acc + item.price, 0);
  const filteredPending = payments.filter((prev) => prev.status === "pending");
  const filteredPaid = payments.filter((prev) => prev.status !== "pending");
  const pendingSales = filteredPending?.reduce(
    (acc, item) => acc + item.price,
    0
  );
  const paidSales = filteredPaid?.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="">
      <Helmet title="Admin Home | PharmaOn" />

      <h1 className="font-semibold text-xl">Admin Homepage</h1>
      <div className="bg-white rounded-xl lg:p-10 mt-3 lg:grid grid-cols-3 gap-5 space-y-5 md:space-y-0">
        <div className="p-10 rounded-xl bg-success text-white">
          <h1 className="font-semibold text-xl text-center">Total Sales</h1>
          <p className="text-center">${totalSales?.toFixed(2)}</p>
        </div>
        <div className="p-10 rounded-xl bg-warning text-white">
          <h1 className="font-semibold text-xl text-center">Total Pending</h1>
          <p className="text-center">${pendingSales?.toFixed(2)}</p>
        </div>
        <div className="p-10 rounded-xl bg-primary text-white">
          <h1 className="font-semibold text-xl text-center">Total Paid</h1>
          <p className="text-center">${paidSales?.toFixed(2)}</p>
        </div>
      </div>

      {/* <SalesOverviewChart/> */}
      <SalesChannelChart/>
      <CategoryDistributionChart/>
    </div>
  );
};

export default AdminHomepage;
