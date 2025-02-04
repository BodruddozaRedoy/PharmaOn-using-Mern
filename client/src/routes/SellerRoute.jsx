import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/Common/Spinner';
import { AuthContext } from '../context/AuthContext';
import useSeller from '../hooks/useSeller';

const SellerRoute = ({children}) => {
    const {user} = useAuth()
    const {loading} = useContext(AuthContext)
    const [isSeller, isPending] = useSeller()
    const location = useLocation()
    if(loading || isPending) return <Spinner/>
    if(!user || !isSeller) return <Navigate to={"/"}/> 
    return children
};

export default SellerRoute;