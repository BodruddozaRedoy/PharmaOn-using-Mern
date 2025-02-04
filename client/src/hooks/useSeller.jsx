import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosInstance';

const useSeller = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const {data:isSeller, isPending} = useQuery({
        queryKey: ['seller', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/seller/${user?.email}`)
            return res?.data?.isSeller
        }

    })
    return [isSeller, isPending]
};

export default useSeller;