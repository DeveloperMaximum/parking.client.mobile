import React from 'react';
import { Redirect } from "react-router";

import * as Storage from "../../components/utils/Storage";
import { Context } from "../../components/App/Context";


export class Default extends React.Component {

	static contextType = Context;


    render(){

	    let activeScreen = Storage.get('DEFAULT_HOME');
	    if(activeScreen === false){
		    activeScreen = 'SECTORS';
		    window.dispatchEvent(new CustomEvent(`app.home`, { detail: {
			    home: activeScreen
		    }}));
	    }

	    if(activeScreen === 'SECTORS'){
		    return (
			    <Redirect to={{
				    pathname: '/home/parking'
			    }} />
		    )
	    }else{
		    return (
			    <Redirect to={{
				    pathname: '/home/filter'
			    }} />
		    )
	    }
    }
}
