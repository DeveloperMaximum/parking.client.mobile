import React from 'react';


export class Item extends React.Component {


	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
	}

	componentDidMount(){
		this.setState((prevState) => ({
			...prevState,
		}));
	}

	render(){

		return (

			<>
				<div className="card">
					<div className="card-header" onClick={() => this.setState((prevState) => ({
						...prevState,
						open: !this.state.open
					}))}>
						<h4 className="mb-0">
							{this.props.title}
						</h4>
					</div>

					<div className={this.state.open === true ? `collapse show` : `collapse`}>
						<div className="card-body">
							{ this.props.child && this.props.child() }
						</div>
					</div>
				</div>
			</>
		);
	};
}
