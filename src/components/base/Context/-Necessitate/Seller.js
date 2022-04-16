import React from "react";

import { Context } from "../Context";
import { NecessitateSeller } from "../../../App/Car/NecessitateSeller";
import { Car } from "../../../App/Api";

export const Seller = React.createContext({});

export class SellerProvider extends React.Component {

	static contextType = Context;

    constructor(props) {
        super(props);

        this.state = {
	        car: null,
	        necessitates: null,
	        process: false,
	        callback: false
        };
    }

	stop = async () => {
    	if(this.state.callback !== false){
    		await this.state.callback();
	    }
		await this.setState((prevState) => ({
			car: null,
			necessitates: null,
			process: false,
			callback: false
		}));
	};

	start = async (props) => {
		await this.setState((prevState) => ({
			...prevState,
			...props,
			process: true
		}));

		await Car.necessitates({ CAR_ID: this.state.car.ID }).then(necessitates => {
			this.setState((prevState) => ({
				...prevState,
				necessitates: necessitates
			}));
		});
	};

    render() {
        return (
            <Seller.Provider
	            value={{
	            	data: this.state,
		            stop: this.stop,
		            start: this.start
	            }}
            >

                {this.props.children}

	            <NecessitateSeller />

            </Seller.Provider>
        );
    }
}

export const SellerConsumer = Seller.Consumer;
