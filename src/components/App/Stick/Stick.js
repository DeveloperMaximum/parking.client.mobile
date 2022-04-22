import React from 'react';


export class Stick extends React.Component {


	constructor(props){
		super(props);
	}

	componentDidMount = async () => {

	};

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		}
	}

    render() {
        return (
            <>
	            {this.props.display !== true ? (<></>) : (
		            <div className="stick">{this.props.text}</div>
	            )}
            </>
        );
    }
}
