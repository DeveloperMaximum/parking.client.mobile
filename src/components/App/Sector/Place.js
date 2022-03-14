import React from 'react';

import { Place as BasePlace } from "../../base/Sector";


export class Place extends BasePlace {

    render() {
        return (
            <>
                <div className={this.state.data.className} {...this.props} onClick={this.handleCell}>
                    {this.state.data.place.icon ? (
                        <div className={"status"}>
                            <i className={`icon ${this.state.data.place.icon}`} />
                        </div>
                    ) : ( <div />)}
                </div>
            </>
        );
    }
}
