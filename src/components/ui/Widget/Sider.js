import React from 'react';

import { Root } from "../../ui/Root";
import { Header } from "../../ui/Header";


export class Sider extends React.Component {


	constructor(props){
		super(props);
	}

	render(){
		return (
			<>
				<Root viewId={"SIDER"} active={this.props.display} className={"d-none"}>
					{ this.props?.template !== false ? (
						<>
							<Header onClick={this.props.close}>
								<div className="d-flex" onClick={this.props.close}>
									<i className="icon icon-chevron_left d-inline-block" />
									<h1 className="d-inline-block d-inline-block">{ this.props.title !== false ? this.props.title : `Назад` }</h1>
								</div>
							</Header>
							<main className="vh-100">
								{ this.props.child && this.props.child() }
							</main>
						</>
					) : (
						this.props.child && this.props.child()
					)}
				</Root>
			</>
		);
	}
}
