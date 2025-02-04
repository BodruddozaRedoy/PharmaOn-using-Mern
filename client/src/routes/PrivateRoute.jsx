import React, { useContext } from 'react';
import useAuth from '../hooks/useAuth';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../components/Common/Spinner';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation()
    if(user && loading){
        return <Spinner/>
    } 
    if(!user) return <Navigate to={"/login"} state={{form:location}} replace/>
    return children
};

export default PrivateRoute;