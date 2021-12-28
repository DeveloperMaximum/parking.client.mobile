import React, { Component } from 'react';


export class Button extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="input-group">
                <button type={this.props.type} className={'btn btn-primary btn-' + this.props.variant} disabled={this.props.disabled}>
                    {this.props.text}
                </button>
            </div>
        );
    };
}
