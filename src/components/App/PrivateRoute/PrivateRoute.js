import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


export const PrivateRoute = ({USER}) => {
    const jsonUser = USER.get();
    if(!jsonUser?.UF_TOKEN || jsonUser.UF_TOKEN === ''){
        return <Navigate to="/auth" />;
    }
    return <Outlet />;
};
