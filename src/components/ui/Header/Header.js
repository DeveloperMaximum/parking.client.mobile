import React from 'react';

import * as Storage from "../../utils/Storage";


export class Header extends React.Component {


	handleTitle = (e) => {
		if(this.props?.back){
			if(typeof this.props?.back === 'function'){
				return this.props?.back(e);
			}
		}
		if(this.props?.onClick){
			return this.props?.onClick(e);
		}
		if(this.props?.history){
			return this.props.history.push(`/`);
		}
	};

	handleProfile = () => {
		this.props.history.push(`/profile`)
	};

    render() {

        return (
            <header className={`p-3 shadow w-100 ${this.props?.className}`}>

                <div className="d-flex justify-content-between">
	                {!this.props?.profile || this.props?.profile === false ? (
		                <div className="d-flex" onClick={this.handleTitle}>
			                {!this.props?.back ? (<></>) : (<i className="icon icon-chevron_left d-inline-block" />)}
			                <h1 className="d-inline-block mb-0">{this.props?.title ? this.props.title : 'Назад'}</h1>
		                </div>
	                ) : (
		                <div className="d-flex" onClick={this.handleProfile}>
			                <h1 className="d-inline-block mb-0">{Storage.get('USER').NAME}</h1>
			                <i className="icon icon-chevron_right d-inline-block" />
		                </div>
	                )}

	                {!this.props?.right || this.props?.right === false ? (<></>) : ( <div className={"header-right"}> {this.props.right} </div> )}
                </div>

                {this.props.children}

            </header>
        );
    }
}
