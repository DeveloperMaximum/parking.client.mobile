import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';

import { Context } from "../../base/Context";


export const PrivateRoute = ({ component: Component, ...rest }) => {

    const { isAuth } = useContext(Context);

    return (<Route {...rest} render={props => (
        (!isAuth()) ? (
            <Redirect to={{
                pathname: '/auth',
                state: { from: props.location }
            }} />
        ) : (
            <Component {...rest} {...props} />
        )
    )}/>)
};
