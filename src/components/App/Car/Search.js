import React from 'react';

import { Context } from "../../base/Context";
import { Car } from "../Api";


export class Search extends React.Component {

    static contextType = Context;

    constructor(props) {
        super(props);
        this.state = {
            controller: false,
            search: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillUnmount() {
        if(this.state.controller?.abort){
            this.state.controller.abort();
        }
        this.setState = (state, callback) => {
            return false;
        }
    }

    handleChange = async (e) => {
        e.persist();
        if(this.state.controller?.abort){
            this.state.controller.abort();
        }
        if(e.target.value === ''){
            this.props.onResult(null);
            this.setState((prevState) => ({
                ...prevState,
                controller: null,
                search: ''
            }));
        }else{
            this.props.onResult(true);
            const controller = new AbortController();
            await this.setState((prevState) => ({
                ...prevState,
                search: e.target.value,
                controller: controller,
            }));
            await Car.search(this.state).then(result => this.props.onResult(result));
        }
    };

    render() {

        return (
            <form method={"GET"} id="SEARCH-FORM" className="search-form d-block d-flex">
                <div className="input-group">
                    <div className="group-inner-left-icon">
                        <i className="icon icon-search" />
                    </div>
                    <div className={'input-group'}>
                        <input name="SEARCH"
                           min={1}
                           onChange={this.handleChange}
                           value={this.state.search || ''}
                           type="text"
                           autoComplete="off"
                           placeholder="Поиск автомобиля"
                           className="form-control"
                        />
                    </div>
                </div>
            </form>
        );
    }
}
