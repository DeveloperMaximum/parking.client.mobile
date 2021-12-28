import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


export const PrivateRoute = ({USER}) => {
    const auth = USER.state.data?.UF_TOKEN;
    return auth ? <Outlet /> : <Navigate to="/auth" />;
};
