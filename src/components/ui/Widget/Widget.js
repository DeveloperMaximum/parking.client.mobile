import React from 'react';


export class Widget extends React.Component {

	render(){
		return (
			<>
				<div className={this.props.display !== false ? "widget widget-high display" : "widget widget-high"}>

					<div className="modal-backdrop fade show footer-widget" onClick={this.props.close} />

					<div className="content">

						<div className="d-flex justify-content-between widget-meta">
							<div className="d-flex" onClick={this.props.close}>
								<i className="icon icon-chevron_left d-inline-block" />
							</div>

							<div className="d-flex">
								<h1 className="d-inline-block d-inline-block">{this.props.header}</h1>
							</div>

							<div className="d-flex" onClick={ async () => {
								if(this.props.right.callback){
									await this.props.right.callback();
								}
							}}>
								<span className="d-inline-block mr-3">{this.props.right.text}</span>
							</div>
						</div>

						{ this.props.child && this.props.child() }
					</div>
				</div>
			</>
		);
	}
}
