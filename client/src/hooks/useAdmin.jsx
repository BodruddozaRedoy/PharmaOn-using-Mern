import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosInstance';

const useAdmin = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const {data:isAdmin, isPending} = useQuery({
        queryKey: ['admin', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`)
            return res?.data?.isAdmin
        }

    })
    return [isAdmin, isPending]
};

export default useAdmin;