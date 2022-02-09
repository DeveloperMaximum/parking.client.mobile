import React from 'react';
import { Form, Input } from "../../ui";
import { Request } from "../../utils/Request";


export class Search extends React.Component {

    APP;

    constructor(props) {
        super(props);
        this.state = {
            controller: null,
            search: ''
        };
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
    }

    handleChangeSearch(e) {
        e.persist();
        if(this.state.controller?.abort){
            this.state.controller.abort();
        }
        if(e.target.value === ''){
            this.props.onChange(null);
            this.setState((prevState) => ({
                ...prevState,
                controller: null,
                search: ''
            }));
        }else{
            this.search(e.target.value).then(result => {
                if(result?.status){
                    if(result.status === 204){
                        this.props.onChange([]);
                    }
                }
                if(this.props?.onChange && result?.data){
                    this.props.onChange(result.data);
                }
            });
        }
    }

    handleAbortSearch() {
        // todo
    }

    search = async val => {
        let url = 'car/?LOGIC=SEARCH';
        let keys = ['VIN', 'VIN2', 'G_NUMBER', 'BRAND', 'MODEL'];
        for (let i = 0; i < keys.length; i++) {
            url += '&' + keys[i] + '=' + val;
        }

        const user = this.props.APP.storage.get('USER');
        const controller = new AbortController();
        const signal = controller.signal;
        signal.addEventListener('abort', this.handleAbortSearch);
        this.setState((prevState) => ({
            ...prevState,
            controller: controller,
            search: val,
        }));

        try{
            return Request({
                URL: url,
                METHOD: 'GET',
                CONTROLLER: controller,
                USER: user,
            });
        } catch(error) {
            console.log('Запрос прерван:', error.message);
        }
    };

    render() {

        return (
            <Form method={"GET"} id="SEARCH-FORM" className="d-block d-flex">
                <div className="input-group">
                    <div className="group-inner-left-icon">
                        <i className="icon icon-search" />
                    </div>
                    <div className={'input-group'}>
                        <input name="SEARCH"
                               min={1}
                               onChange={this.handleChangeSearch}
                               value={this.state.search || ''}
                               type="text"
                               autoComplete="off"
                               placeholder="Поиск автомобиля"
                               className="form-control"
                        />
                    </div>
                </div>
            </Form>
        );
    }
}
