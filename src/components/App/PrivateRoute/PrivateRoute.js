import React from 'react';
import { Route, Redirect } from 'react-router-dom';


export const PrivateRoute = ({ component: Component, APP, ...rest }) => {
    return (<Route {...rest} render={props => (
        (APP.auth === false) ? (
            <Redirect to={{
                pathname: '/auth',
                state: { from: props.location }
            }} />
        ) : (
            <Component {...rest} {...props} APP={APP} />
        )
    )}/>)
};
