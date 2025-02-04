import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
    const {user, updateUser, loading} = useContext(AuthContext)
      return {user, updateUser, loading}
};

export default useAuth;