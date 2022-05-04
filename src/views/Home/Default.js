import React from 'react';
import { Redirect } from "react-router";
import { Context } from "../../components/App/Context";
import {Storage} from "../../components/App";


export class Default extends React.Component {

	static contextType = Context;


    render(){

	    let activeScreen = Storage.get('DEFAULT_HOME');
	    if(activeScreen === false){
		    activeScreen = 'SECTORS';
		    this.context.home(activeScreen).then(r => r);
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
