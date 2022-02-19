import React from 'react';

import { AppContext } from "../AppContext";
import { Request } from "../../utils/Request";


export class Search extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            controller: false,
            search: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillUnmount() {
        this.handleAbort();
        this.setState = (state, callback) => {
            return false;
        }
    }

    handleSearch(value, controller){
        this.setState((prevState) => ({
            ...prevState,
            controller: controller,
            search: value
        }));
    }

    handleAbort(){
        if(this.state.controller?.abort){
            this.state.controller.abort();
        }
    }

    handleChange(e) {
        e.persist();
        this.handleAbort();
        if(e.target.value === ''){
            this.props.onResult(null);
            this.handleSearch('', null);
            return true;
        }

        this.search(e.target.value).then(result => {
            if(result?.status){
                if(result.status === 204){
                    this.props.onResult([]);
                }
            }
            if(this.props?.onResult && result?.data){
                this.props.onResult(result.data);
            }
        });
    }

    search = async val => {

        let url = 'car/?LOGIC=SEARCH';
        let keys = ['VIN', 'VIN2', 'G_NUMBER', 'BRAND', 'MODEL'];
        for (let i = 0; i < keys.length; i++) {
            url += '&' + keys[i] + '=' + val;
        }

        const controller = new AbortController();
        await this.handleSearch(val, controller);

        return Request({
            URL: url,
            CONTROLLER: this.state.controller,
            USER: this.context.user.profile(),
        });
    };

    render() {

        return (
            <form method={"GET"} id="SEARCH-FORM" className="d-block d-flex">
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
