import React from 'react';

import { Context } from "../../base/Context";
import { CarItem } from "../../App";
import {ParkingProvider} from "../Context/Parking";
import {SellerProvider} from "../Context/Necessitate";
import {Switch} from "react-router";
import {PrivateRoute} from "../PrivateRoute";


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
			    	<>
					    <SellerProvider>
				            <CarItem id={this.state.data.place.info.CAR_ID} history={this.props.history} />
					    </SellerProvider>
				    </>
		        )
		    })
	    }
    };
}
