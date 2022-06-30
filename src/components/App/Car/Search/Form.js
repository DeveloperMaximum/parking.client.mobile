import React from 'react';


export class Form extends React.Component {


	constructor(props) {
		super(props);
	}

	render(){
		return (
			<form method={"GET"} id="SEARCH-FORM" className="search-form d-block d-flex mt-2">
				<div className={'form-group w-100 mb-0'}>
					<div className="group-inner-left-icon">
						<i className="icon icon-search" />
					</div>
					<input
						min={1}
						type="text"
						autoComplete="off"
						className="form-control shadow"
						placeholder="Поиск автомобиля"
						{...this.props}
					/>
				</div>
			</form>
		)
	}
}
