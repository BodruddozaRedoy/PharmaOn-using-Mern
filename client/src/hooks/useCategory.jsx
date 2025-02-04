import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { axiosPublic } from './useAxiosInstance';

const useCategory = () => {
const {data:categories=[], isLoading, refetch} = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
        const res = await axiosPublic.get("/categories")
        return res.data
    }
})

    return [categories, isLoading, refetch]
};

export default useCategory;