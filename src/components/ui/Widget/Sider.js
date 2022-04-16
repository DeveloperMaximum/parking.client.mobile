import React from 'react';

import { Root } from "../../ui/Root";
import { Header } from "../../ui/Header";
import { Consumer } from "../../base/Context";


export class Sider extends React.Component {

	render(){
		return (
			<Consumer>
				{({ data, sider }) => (
					<>
						<Root viewId={"SIDER"} active={data.sider.display} className={"d-none"}>
							{ data.sider.template === false ? (
								data.sider.child && data.sider.child()
							) : (
								<>
									<Header onClick={async (e) => sider()}>
										<div className="d-flex" onClick={async (e) => sider()}>
											<i className="icon icon-chevron_left d-inline-block" />
											<h1 className="d-inline-block d-inline-block">{ data.sider.title !== false ? data.sider.title : `Назад` }</h1>
										</div>
									</Header>
									<main className="vh-100">
										{ data.sider.child && data.sider.child() }
									</main>
								</>
							)}
						</Root>
					</>
				)}
			</Consumer>
		);
	}
}
