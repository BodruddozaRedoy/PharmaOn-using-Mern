import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosInstance, { axiosPublic } from './useAxiosInstance';

const useCart = () => {
    const axiosSecure = useAxiosInstance()
    const {user} = useAuth()
    const {data:cart=[], refetch} = useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/cart/${user.email}`)
            // console.log(res.data);
            return res.data
        }
    })
    return [cart, refetch]
};

export default useCart;