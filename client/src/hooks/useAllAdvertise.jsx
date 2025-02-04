import React from "react";
import useAuth from "./useAuth";
import useAxiosInstance from "./useAxiosInstance";
import { useQuery } from "@tanstack/react-query";

const useAllAdvertise = () => {
    const {user} = useAuth()
  const axiosSecure = useAxiosInstance();

  const { data: ads = [], refetch } = useQuery({
    queryKey: ["ads"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/advertise`);
      return res.data;
    },
  });
  return {ads, refetch}
};
export default useAllAdvertise;
