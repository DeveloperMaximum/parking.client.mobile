import React, { Component } from 'react';

export class Button extends Component {

    render(){
        return (
            <div className="input-group">
                <button className={'btn btn-primary'} {...this.props}>
                    {this.props.children}
                </button>
            </div>
        );
    };
}
