import React from 'react';


export class Widget extends React.Component {

	render(){
		return (
			<div className={this.props.display !== false ? "widget widget-high display" : "widget widget-high"}>

				<div className="modal-backdrop fade show footer-widget" onClick={this.props.close} />

				<div className={"widget-content"}>
					{this.props.header === false ? ( this.props.child && this.props.child() ) : (
						<>
							<header className="d-flex justify-content-between w-100 widget-meta shadow">
								<div className="d-flex" onClick={this.props.close}>
									<i className="icon icon-chevron_left d-inline-block" />
								</div>

								<div className="d-flex">
									<h1 className="d-inline-block d-inline-block mb-0">{this.props.header}</h1>
								</div>

								<div className="d-flex align-items-center text-blue" onClick={() => {
									if(this.props.right.callback){
										this.props.right.callback();
									}
								}}>
									<span className="d-inline-block mr-3">{this.props.right.text}</span>
								</div>
							</header>

							<main>
								{ this.props.child && this.props.child() }
							</main>
						</>
					)}
				</div>

			</div>
		);
	}
}
