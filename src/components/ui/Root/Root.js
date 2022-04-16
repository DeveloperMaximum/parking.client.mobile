import React from 'react';


export class Root extends React.Component {

    viewId;

    constructor(props){
        super(props);
    }

    render() {
        return (
            <>
                <div id={this.props?.viewId} className={this.props?.active === true ? `root-component active ${this.props.className}` : `root-component ${this.props.className}`}>
                    {this.props.children}
                </div>
            </>
        );
    }
}
