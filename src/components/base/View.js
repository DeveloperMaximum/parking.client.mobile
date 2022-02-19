import React from 'react';

import { AppContext } from "../../components/App/AppContext";


export class View extends React.Component {

    static contextType = AppContext;

    viewId;

    constructor(props){
        super(props);
    }

    render() {

        return (
            <>
                <div id={this.props?.viewId} className="root-component">

                        {this.props.children}

                </div>
            </>
        );
    }
}
