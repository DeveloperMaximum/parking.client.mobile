import React from 'react';

import { Consumer } from "../../../base/Context";
import { ParkingConsumer } from "../../../base/Context/Parking";
import { Place as BasePlace } from "../../../base/Sector";


export class Place extends BasePlace {

    render() {
        return (
            <>
	            <ParkingConsumer>
		            {({ place, callback }) => (
			            <Consumer>
				            {({ confirm }) => (
				                <div className={this.state.data.className} {...this.props} onClick={async () => {
					                await confirm({
						                header: "Вы уверены?",
						                content: `Вы уверены, что хотите припарковать автомобиль на парковочном месте ${this.props.data.place.info.INNER_ID}?`,
						                success: "Да",
						                cancel: "Нет",
						                callback: async () => {
							                return await place(this.state.data.place.info.ID).then(callback);
						                },
					                });
				                }}>
				                    {this.state.data.place.icon ? (
				                        <div className={"status"}>
				                            <i className={`icon ${this.state.data.place.icon}`} />
				                        </div>
				                    ) : ( <div />)}
				                </div>
				            )}
			            </Consumer>
		            )}
	            </ParkingConsumer>
            </>
        );
    }
}
