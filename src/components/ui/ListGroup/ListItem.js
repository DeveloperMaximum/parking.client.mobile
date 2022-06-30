import React from 'react';


export class ListItem extends React.Component {


	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		this.setState((prevState) => ({
			...prevState,
		}));
	}

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		}
	}

	handleClick(e) {
		if(this.props?.onClick){
			this.props.onClick(this.props)
		}
	}

	render(){
		return (
			<div className={`list-group-item pt-3 pb-3 border-${this.props.type}`} onClick={this.handleClick}>
				<h5 className={"font-weight-bold mb-1"}>{this.props.title}</h5>
				<div className={"text-muted d-block small"}>
					{ this.props.description }
				</div>
			</div>
		);
	};
}
