import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { axiosPublic } from './useAxiosInstance';

const useAllProducts = () => {
    const {data:products=[], isLoading:productLoading, refetch:productRefetch} = useQuery({
        queryKey: ['all-products'],
        queryFn: async () => {
            const res = await axiosPublic.get("/products")
            // console.log(res.data);
            return res.data
            
        }
    })
    return [ products, productLoading, productRefetch ]
};

export default useAllProducts;