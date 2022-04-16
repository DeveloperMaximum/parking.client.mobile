import React from 'react';

import { Place as BasePlace } from "../../base/Sector";


export class Place extends BasePlace {

    render() {
        return (
            <>
                <div className={this.props.data.className} onClick={this.handleCell}>
                    {this.props.data.place.icon ? (
                        <div className={"status"}>
                            <i className={`icon ${this.props.data.place.icon}`} />
                        </div>
                    ) : ( <div />)}
                </div>
            </>
        );
    }
}
