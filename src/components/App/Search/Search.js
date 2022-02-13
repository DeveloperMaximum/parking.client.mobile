import React from 'react';
import { Form } from "../../ui";
import { Request } from "../../utils/Request";
import { AppContext } from "../AppContext";


export class Search extends React.Component {

    static contextType = AppContext;

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

    search = async val => {
        const controller = new AbortController();

        let url = 'car/?LOGIC=SEARCH';
        let keys = ['VIN', 'VIN2', 'G_NUMBER', 'BRAND', 'MODEL'];
        for (let i = 0; i < keys.length; i++) {
            url += '&' + keys[i] + '=' + val;
        }

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
                USER: this.context.user.profile(),
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
