import React, { useContext } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

export const axiosPublic = axios.create({
    baseURL: window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://pharmaon-server.vercel.app',
})

const axiosSecure = axios.create({
    baseURL:  window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://pharmaon-server.vercel.app',
})

const useAxiosInstance = () => {
    const navigate = useNavigate()
    const {logOut} = useContext(AuthContext)
    
        axiosSecure.interceptors.request.use(function (config){
            const token = localStorage.getItem('token')
            config.headers.authorization = `Bearer ${token}`
            return config
        }, function (error){
            return Promise.reject(error)
        })
    
        axiosSecure.interceptors.response.use(function(config){
            return config
        }, async (error) => {
            const status = error.response.status
            const errorMessage = error.response.data.message
            // toast.error(errorMessage)
            // console.log(errorMessage);
            
            if(status === 401 || status === 403){
                await logOut()
                navigate('/login')
            }
            return Promise.reject(error)
        })
    return axiosSecure
};

export default useAxiosInstance;