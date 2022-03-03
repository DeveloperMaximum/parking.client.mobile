import React from 'react';

import { Context } from "../../base/Context";
import { CarItem } from "../index";


export class Place extends React.Component {

	static contextType = Context;

    constructor(props){
        super(props);
        this.state = {
            data: props.data
        };
    }

    handleCell = (e) => {
    	if(this.state.data.CAR_ID){
		    this.context.widget.show({
			    child: () => (<CarItem id={this.state.data.CAR_ID} />)
		    })
	    }
    };

    render() {
        let tileID = 4;
        let icon = null;
        let className = `sector-cell tile tile-${tileID} ${this.state.data.ID}`;
        if(this.state.data?.CAR_ID){
            className += ` busy`;
        }

        if(this.state.data.NECESSITATE_TOTAL > 0){
            icon = 'icon-build';
        }

        return (
            <>
                <div className={className} {...this.props} onClick={this.handleCell}>
                    {icon !== null ? (
                        <div className={"status"}>
                            <i className={`icon ${icon}`} />
                        </div>
                    ) : ( <div />)}
                </div>
            </>
        );
    }
}
