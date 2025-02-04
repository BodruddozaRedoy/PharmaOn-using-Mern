import React, { useState } from "react";
import useAxiosInstance, { axiosPublic } from "./useAxiosInstance";
import useAuth from "./useAuth";
import toast from "react-hot-toast";
import useCart from "./useCart";

const useAddToCart = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true)
  const [ cart, refetch ] = useCart()
  const axiosSecure = useAxiosInstance()
  // const [cart, setCart] = useState()

  const addToCart = async (item) => {
    // console.log(item);
    const cartInfo = {
      name: item.name,
      company: item.company,
      img: item.imgUpload || item.imgUrl,
      quantity: 1,
      price: item.newPrice,
      totalPrice: item.newPrice,
      userEmail: user.email,
      itemOwner: item?.userEmail
    };
    const res = await axiosSecure.post(`/cart`, cartInfo);
    if(res.data){
        refetch()
        setLoading(false)
        toast.success(`${item.name} added to cart`)
    }
    // console.log(res.data);
  };
  return { addToCart, loading };
};

export default useAddToCart;
