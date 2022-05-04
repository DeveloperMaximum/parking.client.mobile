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
				<Root viewId={"SIDER"} active={this.props.display} className={"sider"}>
					{ this.props?.template !== false ? (
						<>
							<Header
								title={ this.props.title !== false ? this.props.title : `Назад` }
								back={this.props.close}
							/>
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
