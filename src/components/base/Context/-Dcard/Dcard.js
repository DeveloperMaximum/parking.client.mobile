import React from "react";

import { Context } from "../Context";
import { Dcard as DcardContent } from "../../../App/Car/Dcard";
import { Car } from "../../../App/Api";

export const Dcard = React.createContext({});

export class DcardProvider extends React.Component {

	static contextType = Context;

    constructor(props) {
        super(props);

        this.state = {
	        car: null,
	        info: null,
	        process: false,
	        callback: false
        };
    }

	start = async (props) => {
		await this.setState((prevState) => ({
			...prevState,
			...props,
			process: true
		}));

		await Car.dcard({ CAR_ID: this.state.car.ID }).then(info => {
			this.setState((prevState) => ({
				...prevState,
				info: info
			}));
		});
	};

	stop = async () => {
		if(this.state.callback !== false){
			await this.state.callback();
		}
		await this.setState((prevState) => ({
			car: null,
			info: null,
			process: false,
			callback: false
		}));
	};

    render() {
        return (
            <Dcard.Provider
	            value={{
	            	data: this.state,
	            	start: this.start,
	            	stop: this.stop
	            }}
            >

                {this.props.children}

	            <DcardContent />

            </Dcard.Provider>
        );
    }
}

export const DcardConsumer = Dcard.Consumer;
