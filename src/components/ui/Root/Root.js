import React from 'react';


export class Root extends React.Component {


    render() {
    	let className = this.props?.active === true ? `root-component active ` : `root-component `;
    	if(this.props?.className) className += this.props?.className;
        return (
            <>
                <div id={this.props?.viewId} className={className}>

                    {this.props.children}

                </div>
            </>
        );
    }
}
