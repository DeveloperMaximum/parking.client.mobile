import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AppContext } from "../index";


export const PrivateRoute = ({ component: Component, ...rest }) => {

    const { user } = useContext(AppContext);

    return (<Route {...rest} render={props => (
        (!user.isAuth()) ? (
            <Redirect to={{
                pathname: '/auth',
                state: { from: props.location }
            }} />
        ) : (
            <Component {...rest} {...props} />
        )
    )}/>)
};
