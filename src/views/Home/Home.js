import React, { Component } from 'react';

import { Form, Input } from "../../components/ui";
import {Request} from "../../components/utils/Request";
import {useEffect} from "react/cjs/react.production.min";


export class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: {
                SEARCH: {
                    value: '',
                    required: false,
                }
            },
            action: "car"
        };
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
    }

    componentDidMount() {
        // todo: монтирование компонента
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return false;
        }
    }

    handleChangeSearch(e) {
        e.persist();
        this.setState((prevState) => ({
            data: {
                ...prevState.data,
                [e.target.name]: {
                    ...prevState.data[e.target.name],
                    value: e.target.value
                }
            }
        }));
        this.search(e.target.value).then(result => {

        });
    }

    search = async val => {
        this.setState((prevState) => ({
            action: 'car/?SEARCH=' + val
        }));
        return Request({
            URL: 'car/?SEARCH=' + val,
            METHOD: 'GET'
        });
    };

    toggleScanner = () => {

        const cancelScanner = () => {
            body.classList.remove('SCANNED');
            setTimeout(function(){
                window.QRScanner.cancelScan(function(status){
                    if(status.showing === true){
                        window.QRScanner.hidden();
                    }
                });
            }, 100);
        };

        const handleScanned = async (value) => {
            this.setState((prevState) => ({
                data: {
                    ...prevState.data,
                    SEARCH: {
                        ...prevState.data.SEARCH,
                        value: value,
                    }
                }
            }));
            this.search(document.getElementsByName("SEARCH")[0].value);
        };

        let body = document.getElementsByTagName('body')[0];
        window.QRScanner.getStatus(function(status){
            if(status.scanning === false){
                window.QRScanner.prepare(function(){
                    window.QRScanner.show();
                    body.classList.add('SCANNED');
                    window.QRScanner.scan(function(err, content){
                        if(err && err.code !== 6){
                            console.log(err);
                            window.QRScanner.destroy();
                        }else{
                            handleScanned(content).then((result) => ({
                                // todo:
                            }));
                        }
                        cancelScanner();
                    });
                });
            }else{
                cancelScanner();
            }
        });
    };

    render(){

        return (
            <div id={"HOME"} className="root-component">
                <header>
                    <h1 className="d-inline-block pt-4 pb-3">{this.props.USER.state.data.NAME}</h1>
                    <i className="icon-chevron_right d-inline-block" />
                    <Form method={"GET"} action={this.state.action || 'car'} id="SEARCH-FORM" className="d-block pb-3 d-flex">
                        <div className="input-group">
                            <div className="group-inner-left-icon">
                                <i className="icon icon-search" />
                            </div>
                            <Input name={"SEARCH"} onChange={this.handleChangeSearch} value={this.state.data.SEARCH.value || ''} min={1} type={"text"} autoComplete="off" placeholder="Поиск по марке и VIN" className="form-control" />
                        </div>
                        <button type="button" className="btn btn-primary position-relative" onClick={this.toggleScanner}>
                            <i className="icon-qr_code" />
                        </button>
                    </Form>
                </header>

                <main>
                    <div className="sectors-wrapper">
                        <div className="sector-filter">
                            <span className="sector-filter-btn">Все</span>
                            <span className="sector-filter-btn danger">
                                Срочно обслужить
                            </span>
                                <span className="sector-filter-btn warning">
                                Срочно обслужить
                            </span>
                                <span className="sector-filter-btn success">
                                Срочно обслужить
                            </span>
                        </div>
                        <div className="sector-list">
                            <div className="sector-item danger">
                                <div className="d-flex">
                                    <div className="sector-name ">Навес тип 1</div>
                                </div>
                                <div className="sector-filled">Сектор заполнен</div>
                                <div className="sector-cars">
                                    <div className="sector-count-cars">
                                        <span>Авто</span>
                                        <span>253</span>
                                    </div>
                                    <div className="sector-count-cars">
                                        <span>Из них с потребностями</span>
                                        <span>23</span>
                                    </div>
                                </div>
                            </div>
                            <div className="sector-item warning">
                                <div className="d-flex">
                                    <div className="sector-name ">Навес тип 3</div>
                                </div>
                                <div className="sector-filled">Сектор заполнен</div>
                                <div className="sector-cars">
                                    <div className="sector-count-cars">
                                        <span>Авто</span>
                                        <span>253</span>
                                    </div>
                                    <div className="sector-count-cars">
                                        <span>Из них с потребностями</span>
                                        <span>23</span>
                                    </div>
                                </div>
                            </div>
                            <div className="sector-item success">
                                <div className="d-flex">
                                    <div className="sector-name ">Навес тип 4</div>
                                </div>
                                <div className="sector-filled">Сектор заполнен</div>
                                <div className="sector-cars">
                                    <div className="sector-count-cars">
                                        <span>Авто</span>
                                        <span>253</span>
                                    </div>
                                    <div className="sector-count-cars">
                                        <span>Из них с потребностями</span>
                                        <span>23</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="d-flex w-100 pt-2 text-center">
                    <div className="flex-fill active">
                        <i className="icon-directions_car"></i>
                        <div>Главная</div>
                    </div>
                    <div className="flex-fill">
                        <i className="icon-directions_car"></i>
                        <div>Тест-драйв</div>
                    </div>
                    <div className="flex-fill">
                        <i className="icon-directions_car"></i>
                        <div>Главная</div>
                    </div>
                    <div className="flex-fill">
                        <i className="icon-directions_car"></i>
                        <div>Главная</div>
                    </div>
                    <div className="flex-fill">
                        <i className="icon-handyman"></i>
                        <div>Еще</div>
                    </div>
                </footer>
            </div>
        );
    }
}
