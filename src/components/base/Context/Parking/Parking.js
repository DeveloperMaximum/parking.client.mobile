import React from "react";

import { Context } from "../Context";
import { Request } from "../../../utils/Request";
import { Sector } from "../../../App/Api";
import { Parking as CarParking } from "../../../App/Car/Parking";

export const Parking = React.createContext({});

export class ParkingProvider extends React.Component {

	static contextType = Context;

    constructor(props) {
        super(props);

        this.state = {
	        callback: false,
	        process: false,
	        sectors: null,
	        car_id: 0,
	        sector_id: 0,
	        place_id: 0
        };
    }

	sector = async (sector_id) => {
		await this.setState((prevState) => ({
			...prevState,
			sector_id: sector_id
		}));
	};

	place = async (place_id) => {
		await this.setState((prevState) => ({
			...prevState,
			place_id: place_id
		}));
	};

	stop = async () => {
		await this.setState((prevState) => ({
			callback: false,
			process: false,
			sectors: null,
			car_id: 0,
			sector_id: 0,
			place_id: 0
		}));
	};

	start = async (props) => {
		await this.setState((prevState) => ({
			...prevState,
			process: true,
			car_id: props.car_id,
			callback: () => {
				return Request({
					URL: `car/${this.state.car_id}/parking`,
					METHOD: `PUT`,
					BODY: {
						PLACE_ID: this.state.place_id
					}
				}).then((result) => {
					let place_id = this.state.place_id;
					if(result.success !== true){
						return result.message;
					}
					this.stop();
					props.callback();
					return `Автомобиль успешно припаркован на парковочном месте ${place_id}`;
				});
			},
		}));
		await Sector.get({DETAILED: 'Y'}).then(sectors => {
			this.setState((prevState) => ({
				...prevState,
				sectors: sectors
			}));
		});
    };

    render() {
        return (
            <Parking.Provider
	            value={{
	            	data: this.state,
		            stop: this.stop,
		            start: this.start,
		            sector: this.sector,
		            place: this.place,
		            callback: this.state.callback
	            }}
            >

                {this.props.children}

	            <CarParking />

            </Parking.Provider>
        );
    }
}

export const ParkingConsumer = Parking.Consumer;
