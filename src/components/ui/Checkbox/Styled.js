import React from 'react';

export class Styled extends React.Component {

	constructor(props) {
		super(props);
		this.onHandle = this.onHandle.bind(this);
	}

	onHandle = async (e) => {
		e.persist();
		if(e.target.name === 'active'){
			await this.props.onHandle({
				id: this.props.id,
				active: (e.target.value > 0),
				description: null
			});
		}else if(e.target.name === 'description'){
			await this.props.onHandle({
				id: this.props.id,
				active: true,
				description: e.target.value
			});
		}
	};

	buttonClassName(val = false){
		if(val === true){
			if(this.props.active === true && this.props.changed === false) return `btn active`;
			else if(this.props.changed === true && this.props.active === false) return `btn changed`;
		}
		return `btn`;
	}

	render(){
		return (
			<div className="btn-checkbox">
				<div>
					<div>{this.props.name}</div>
					<div className="btn-group">

						<button
							type="button"
							name="active"
							value={1}
							disabled={this.props.disabled}
							className={this.buttonClassName(true)}
							onClick={this.onHandle}
						>{this.props.true}</button>

						<button
							type="button"
							name="active"
							value={0}
							disabled={this.props.disabled}
							className={this.buttonClassName()}
							onClick={this.onHandle}
						>{this.props.false}</button>

					</div>
				</div>
				<div className={this.props.active === true || this.props.changed === true ? `added` : `added d-none`}>
					<textarea
						rows="3"
						name={`description`}
						value={this.props.description ? this.props.description : ''}
						disabled={this.props.disabled}
						className="w-100 mt-3 mb-3 p-3"
						onChange={this.onHandle}
						placeholder={this.props.placeholder}
					/>
				</div>
			</div>
		);
	};
}
