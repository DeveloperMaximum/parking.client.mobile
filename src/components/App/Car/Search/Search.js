import React from 'react';

import { CarList } from "../../../App";

import { Context } from "../../../base/Context";
import { Car } from "../../Api";
import { Header } from "../../../ui/Header";

let props = {
	beforeForm: false,
	onClickItem: false
};

export class Search extends React.Component {

    static contextType = Context;
	template = 'page';

    constructor(props) {
        super(props);

	    this.state = {
		    page: 1,
		    search: false,
		    handleMore: false,
		    controller: false,
		    cars: null
	    };
    }

	onHandleChange = async (query = false, page = false) => {
		if(this.state.controller?.abort){
			this.state.controller.abort();
		}
		if(typeof page === 'number' || page instanceof Number){
			const controller = new AbortController();
			this.setState((prevState) => ({
				...prevState,
				handleMore: true,
				controller: controller
			}), () => Car.search(this.state.search, controller, page).then(cars => {
				this.setState((prevState) => ({
					...prevState,
					page: page,
					handleMore: false,
					cars: this.state.cars.concat(cars),
				}));
			}));
		}
		if(typeof query === 'string' || query instanceof String){
			if(query === ''){
				this.setState((prevState) => ({
					...prevState,
					controller: false,
					cars: null,
					page: 1
				}));
			}else{
				const controller = new AbortController();
				this.setState((prevState) => ({
					...prevState, cars: true,
					controller: controller
				}), () => Car.search(query, controller).then(cars => {
					this.setState((prevState) => ({
						...prevState,
						controller: controller,
						search: query,
						cars: cars,
						page: 1
					}));
				}));
			}
		}
	};

    renderSearchForm(){
    	return (
		    <form method={"GET"} id="SEARCH-FORM" className="search-form d-block d-flex">
			    <div className="input-group">
				    <div className="group-inner-left-icon">
					    <i className="icon icon-search" />
				    </div>
				    <div className={'input-group'}>
					    <input name="SEARCH"
					           min={1}
					           onChange={(e) => this.onHandleChange(e.target.value)}
					           type="text"
					           autoComplete="off"
					           placeholder="Поиск автомобиля"
					           className="form-control"
					    />
				    </div>
			    </div>
		    </form>
	    )
    }

    renderCarList(){
    	return (
    		<>
			    {this.state.cars !== null ? (
				    <CarList
					    onHandleMore={(e) => this.onHandleChange(false, this.state.page + 1)}
					    loadingMore={this.state.handleMore}
					    history={this.props.history}
					    items={this.state.cars}
					    onClick={this.props?.onClickItem}
				    />
			    ) : (
				    <>
					    {this.props.children}
				    </>
			    )}
		    </>
	    )
    }

    render() {
	    if(this.props.template === 'page') {
		    return (
			    <>
				    <Header>
					    {this.props.beforeForm}
					    {this.renderSearchForm()}
				    </Header>
				    <main>
					    <div className={"content-wrapper"}>
						    {this.renderCarList()}
					    </div>
				    </main>
			    </>
		    );
	    }else{
		    return (
			    <>
				    {this.props.beforeForm}
				    {this.renderSearchForm()}
				    {this.renderCarList()}
			    </>
		    );
	    }
    }
}
