import React from 'react';

import { AppContext } from "../../components/App/AppContext";
import { Request } from "../../components/utils/Request";
import { Tapbar } from "../../components/App";

export class Location extends React.Component {

    static contextType = AppContext;

    constructor(props){
        super(props);
        this.state = {
            active: false,
            locations: [],
        };
    }

    componentDidMount = async () => {
        return await Request({
            METHOD: 'GET',
            URL: 'map',
            USER: this.context.user.profile(),
        }).then((result) => {
            if(result.success === true){
                this.setState((prevState) => ({
                    ...prevState,
                    locations: result.data
                }));
            }
        });
    };

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return false;
        }
    }

    setActiveCheckbox = async (target) => {
        console.log(target)
        document.querySelector('.checkbox.active')?.classList.remove('active');
        await this.setState((prevState) => ({
            ...prevState,
            active: target.childNodes[1]
        }));
        target.querySelector('.checkbox')?.classList.add('active');
    };

    setLocation = async (e, id = false) => {
        e.persist();
        await this.setActiveCheckbox(e.target);
        await this.context.user.setLocation(id);
    };

    render() {

        const profile = this.context.user.profile();

        return (
            <>
                <div id="LOCATION" className="root-component">
                    <header>
                        <div className="d-flex" onClick={() => this.props.history.push(`/settings`)}>
                            <i className="icon icon-chevron_left d-inline-block" />
                            <h1 className="d-inline-block d-inline-block">Сменить локацию</h1>
                        </div>
                    </header>

                    <main>

                        <div className="map-wrapper">

                        </div>

                        <div className="location-wrapper">
                            <div className="title">Выберите локацию</div>
                            <div className="items">
                                {this.state.locations.map((item, index) => (
                                    <div className="item" key={index} onClick={(e) => this.setLocation(e, item.ID)}>
                                        <div className="name">
                                            {item.NAME}
                                        </div>
                                        <div className={(profile.UF_LOCATION === item.ID) ? 'checkbox active' : 'checkbox'}>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </main>

                </div>
                <Tapbar history={this.props.history} />
            </>
        );
    }
}
