import React from 'react';


export class Form extends React.Component {


	constructor(props) {
		super(props);
	}

	render(){
		return (
			<form method={"GET"} id="SEARCH-FORM" className="search-form d-block d-flex">
				<div className="input-group">
					<div className="group-inner-left-icon">
						<i className="icon icon-search" />
					</div>
					<div className={'input-group'}>
						<input
							min={1}
							type="text"
							autoComplete="off"
							className="form-control"
							placeholder="Поиск автомобиля"
							onChange={this.props.onChange}
						/>
					</div>
				</div>
			</form>
		)
	}
}
