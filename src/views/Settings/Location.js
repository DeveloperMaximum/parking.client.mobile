import React from 'react';

import { AppContext } from "../../components/App/AppContext";
import { View } from "../../components/base/View";
import { Header } from "../../components/base/Header";
import { Footer } from "../../components/base/Footer";

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
        this.setState((prevState) => ({
            ...prevState,
            locations: this.context.user.profile().OPERATOR.LOCATIONS
        }));
    };

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return false;
        }
    }

    setLocation = async (e, id = false) => {
        e.persist();

        const target = e.target;
        const { confirm } = this.context;
        await confirm.show({
            header: "Смена локации",
            content: `Вы хотите изменить выбранную локацию на ${e.target.innerText} ?`,
            success: "Да, изменить",
            cancel: "Нет",
            callback: async () => {
                return this.context.user.setLocation(id).then((result) => {
                    if(result === true){
                        document.querySelector('.checkbox.active')?.classList.remove('active');
                        target.nextSibling?.classList.add('active');
                        this.setState((prevState) => ({
                            ...prevState,
                            active: target.nextSibling
                        }));
                        return "Локация сменена";
                    }
                    return "Не удалось сменить локацию";
                });
            }
        });
    };

    render() {

        const profile = this.context.user.profile();

        return (
            <View
                viewId={"LOCATION"}
            >
                <Header>
                    <div className="d-flex" onClick={() => this.props.history.push(`/settings`)}>
                        <i className="icon icon-chevron_left d-inline-block" />
                        <h1 className="d-inline-block d-inline-block">Смена локации</h1>
                    </div>
                </Header>

                <main>
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

                <Footer history={this.props.history} />
            </View>
        );
    }
}
