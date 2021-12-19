import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const AppRoute = ({ component: Component, USER, ...rest }) => {
    return (
        <Route {...rest} render={
            props => {
                if (USER.state.data?.UF_TOKEN) {
                    return (<Component {...rest} {...props} USER={USER} />)
                } else {
                    return <Redirect to={
                        {
                            pathname: '/auth',
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }
        } />
    )
};

export default AppRoute;
