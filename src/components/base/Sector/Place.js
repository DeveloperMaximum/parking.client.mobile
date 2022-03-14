import React from 'react';

import { Context } from "../../base/Context";
import { CarItem } from "../../App";


export class Place extends React.Component {

	static contextType = Context;

    constructor(props){
        super(props);
        this.state = {
            data: props.data
        };
    }

    handleCell = (e) => {
    	if(this.state.data.place?.info?.CAR_ID){
		    this.context.widget({
			    child: () => (
			    	<CarItem id={this.state.data.place.info.CAR_ID} history={this.props.history} />
		        )
		    })
	    }
    };
}
