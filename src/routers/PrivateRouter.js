import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRouter = ({ children, isLogged }) => {

    const { pathname, search } = useLocation();

    console.log('isLogged',isLogged);

    localStorage.setItem('lastPath', pathname + search );
    
    return isLogged
        ? children
        : <Navigate to="/login" />
}

export default PrivateRouter
