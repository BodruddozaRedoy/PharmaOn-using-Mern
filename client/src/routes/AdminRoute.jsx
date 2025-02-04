import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/Common/Spinner';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = ({children}) => {
    const {user} = useAuth()
    const {loading} = useContext(AuthContext)
    const [isAdmin, isPending] = useAdmin()
    const location = useLocation()
    if(loading || isPending) return <Spinner/>
    if(!user || !isAdmin) return <Navigate to={"/"}/> 
    return children
};

export default AdminRoute;