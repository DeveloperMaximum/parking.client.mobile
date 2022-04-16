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
				            {({ dialog }) => (
				                <div className={this.props.data.className} {...this.props} onClick={async () => {
					                await dialog({
						                header: "Вы уверены?",
						                content: `Вы уверены, что хотите припарковать автомобиль на парковочном месте ${this.props.data.place.info.INNER_ID}?`,
						                buttons: {
							                moved: {
								                text: 'Да',
								                callback: async () => {
									                return await place(this.props.data.place.info.ID).then(callback);
								                },
							                }
						                }
					                });
				                }}>
				                    {this.props.data.place.icon ? (
				                        <div className={"status"}>
				                            <i className={`icon ${this.props.data.place.icon}`} />
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
