import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosInstance from './useAxiosInstance';
import useAuth from './useAuth';

const useAllUsers = () => {
    const axiosSecure = useAxiosInstance()
    const {user} = useAuth()
    const {data:users=[], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get("/users")
            return res.data
        }
    })
    const currentUser = users.find(prev => prev.email === user.email)
    return {users, refetch, currentUser}
};

export default useAllUsers;