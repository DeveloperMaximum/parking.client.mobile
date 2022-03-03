import React from 'react';
import {Consumer} from "../../../base/Context";


export class Place extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data: props.data
        };
    }

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
	            <Consumer>
		            {({ car }) => (
		                <div className={className} {...this.props} onClick={async () => {
		                	if(!this.state.data?.CAR_ID){
				                await car.place(this.state.data.ID).then(car._data.callback);
			                }
		                }}>
		                    {icon !== null ? (
		                        <div className={"status"}>
		                            <i className={`icon ${icon}`} />
		                        </div>
		                    ) : ( <div />)}
		                </div>
		            )}
	            </Consumer>
            </>
        );
    }
}
