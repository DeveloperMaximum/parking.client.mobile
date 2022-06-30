import React from 'react';

import * as Storage from "../../../utils/Storage";
import { Context } from "../../../App/Context";
import { Car } from "../../Api";
import { Status } from "./Status";
import { Props } from "./Props";
import { Endbtn } from "./Endbtn";
import { Actions } from "./Actions";


export class Item extends React.Component {

	static contextType = Context;

	statuses;


    constructor(props){
        super(props);

	    this.statuses = Storage.get('STATUS');

        this.state = {
	        loading: true,
            id: props.id,
            car: null
        };
    }

    componentDidMount = async () => {
        return Car.Get(this.props.id).then((result) => {
            this.setState((prevState) => ({
                ...prevState,
                car: {
	                ID: result.ID,
	                BRAND_NAME: result.BRAND_NAME,
	                MODEL_NAME: result.MODEL_NAME,
	                YEAR: Number(result.YEAR),
	                VIN: result.VIN,
	                VIN2: result.VIN2,
	                G_NUMBER: result.G_NUMBER,
	                MILEAGE: Number(result.MILEAGE),
	                BODY_NAME: result.BODY_NAME,
	                TRANSMISSION_NAME: result.TRANSMISSION_NAME,
	                RESPONSIBLE_ID: Number(result.RESPONSIBLE_ID),
	                RESPONSIBLE_NAME: result?.RESPONSIBLE_NAME,
	                RESPONSIBLE_LAST_NAME: result?.RESPONSIBLE_LAST_NAME,
	                PRICE: Number(result.PRICE),
	                PLACE_ID: Number(result.PLACE_ID),
	                INNER_ID: Number(result.INNER_ID),
	                STATUS_ID: Number(result.STATUS_ID),
	                STATUS_CODE: result.STATUS_CODE,
	                STATUS_NAME: this.statuses[result.STATUS_CODE]?.NAME,
	                SECTOR_ID: Number(result.SECTOR_ID),
	                SECTOR_NAME: result?.SECTOR_ID && result.SECTOR_ID > 0 ? Storage.get('SECTOR')[result.SECTOR_ID].NAME : null,
	                NECESSITATE_TOTAL: Number(result.NECESSITATE_TOTAL),
	                HISTORY_STATUS_DATE_CREATE: result.HISTORY_STATUS_DATE_CREATE,
                },
	            loading: false
            }));
        })
    };

	componentWillUnmount() {
		if(this.props?.parentDidMount){
			this.props.parentDidMount();
		}
		this.setState = (state, callback) => {
			return false;
		}
	}

    render(){

        return (
            <div className={"car overflow-y-scroll h-100"}>
                {this.state.loading === true ? (
                    <div className={"spinner"} />
                ) : (
                    <>
                        <div className={"car-props shadow"}>

                            <Status
	                            car={this.state.car}
                            />

                            <>
	                            <h2 className="d-inline-block">{this.state.car.BRAND_NAME} {this.state.car.MODEL_NAME} {(this.state.car?.YEAR) ? '(' + this.state.car.YEAR + ')' : ''}</h2>

	                            <Props
		                            car={this.state.car}
		                            history={this.props.history}
		                            parentDidMount={this.componentDidMount}
	                            />
                            </>
                        </div>

                        <div className="p-3">

                            <Endbtn
	                            car={this.state.car}
	                            history={this.props.history}
	                            parentDidMount={this.componentDidMount}
                            />

                            <Actions
	                            car={this.state.car}
	                            history={this.props.history}
	                            parentDidMount={this.componentDidMount}
                            />

                        </div>
                    </>
                )}
            </div>
        );
    }
};
