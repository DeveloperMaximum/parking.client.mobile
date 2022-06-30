import React from 'react';


export class Checkbox extends React.Component {


	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={`card-checkbox rounded shadow mb-3`} onClick={(e) => this.props.onClick(this.props.id, e)}>
				<h5 className="p-3 font-weight-bold">
					{this.props.header}
					<div className="text-muted mt-2 font-weight-normal small">
						{this.props.description}
					</div>
				</h5>
				<div className={this.props.active === true ? `checkbox active` : `checkbox`} />
			</div>
		);
	}
}
