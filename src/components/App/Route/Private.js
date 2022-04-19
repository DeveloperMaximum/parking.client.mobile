import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { App } from "../Context";


export const Private = ({ component: Component, ...rest }) => {

    const { isAuth } = useContext(App);

    return (
    	<Route
		    {...rest}
		    render={ props => (
		        (!isAuth()) ? (
		            <Redirect to={{
		                pathname: '/auth',
		                state: { from: props.location }
		            }} />
		        ) : (
		            <Component {...rest} {...props} />
		        )
	        )
	    }/>
    )
};
