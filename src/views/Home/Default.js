import React from 'react';
import {Redirect, Route} from "react-router";


export class Default extends React.Component {

    render(){
        return (<Route render={props => (
            <Redirect to={{
                pathname: '/home',
                state: { from: props.location }
            }} />
        )}/>)
    }
}
