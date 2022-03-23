import React from 'react';

import { Context } from "../../base/Context";


export class Root extends React.Component {

    viewId;

    constructor(props){
        super(props);
    }

    render() {
		let className = this.props?.active === true ? `root-component active ${this.props.className}` : `root-component ${this.props.className}`;
        return (
            <>
                <div id={this.props?.viewId} className={className}>

                    {this.props.children}

                </div>
            </>
        );
    }
}
