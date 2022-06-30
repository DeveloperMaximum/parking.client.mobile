import React, { useContext } from 'react';
import { Route as ReactRoute, Redirect } from 'react-router-dom';

import { Context } from "../App/Context";


export const Route = ({ component: Component, ...rest }) => {

    const { isAuth } = useContext(Context);

    return (
    	<ReactRoute
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
