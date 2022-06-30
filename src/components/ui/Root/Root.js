import React from 'react';


export class Root extends React.Component {


    render() {
    	let className = `root-component vw-100 vh-100 overflow-hidden d-flex flex-column`;
    	className += this.props?.active ? ` active ` : ` `;
    	if(this.props?.className) className += this.props?.className;

        return (
            <div id={this.props?.viewId} className={className}>

                {this.props.children}

            </div>
        );
    }
}
