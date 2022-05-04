import React from 'react';
import { NavLink } from "react-router-dom";

import * as UI from "../../ui/Footer";


export class Footer extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            prev: false,
        };
    }

    componentDidMount() {
	    this.setState((prevState) => ({
		    ...prevState,
	    }));
    }

    toggleLinkActive = async (restore = false) => {
        let elem = document.querySelector('footer menu .active');
        if(elem && elem.nodeName === 'A'){
            await this.setState((prevState) => ({...prevState, prev: elem}));
            this.state.prev.classList?.remove('active');
        }else if(restore === true && this.state.prev !== false){
            this.state.prev.classList.add('active');
            await this.setState((prevState) => ({...prevState, prev: false}));
        }
        return elem;
    };

    handleClick = async (e) => {
	    e.persist();

	    let type = e.target.getAttribute('data-type');

	    if(type === 'link'){
		    if(this.props.data.widget.display === true){
			    await this.props.widget(false);
		    }

		    if(this.props.data.wmenu.display === true){
			    await this.props.wmenu(false);
		    }

		    if(this.props.data.camera.active === true){
			    await this.props.camera(false);
		    }
	    }
    };

    render() {

        return (
            <>
                <UI.Footer disabled={(this.props.data.sider.display || this.props.isAuth() === false)}>
                    <menu className="d-flex w-100 text-center">
	                    {this.props.data.user.DEFAULT_HOME === 'SECTORS' ? (
		                    <NavLink onClick={this.handleClick} data-type="link" activeclassname={'active'} to={"/home"} className={"menu-item flex-fill"}>
			                    <i className={"icon-directions_car"} />
			                    <div>Парковка</div>
		                    </NavLink>
	                    ) : (
		                    <NavLink onClick={this.handleClick} data-type="link" activeclassname={'active'} to={"/home"} className={"menu-item flex-fill"}>
			                    <i className={"icon-directions_car"} />
			                    <div>Поиск</div>
		                    </NavLink>
	                    )}

                        <span onClick={() => this.props.camera()} className={(this.props.data.camera.active === true) ? "menu-item flex-fill active" : "menu-item flex-fill"}>
                            <i className={"icon-qr_code"} />
                            <div>QR-код</div>
                        </span>

                        <NavLink onClick={this.handleClick} data-type="link" activeclassname={'active'} to={"/tickets"} className={"menu-item flex-fill"}>
                            <i className={"icon-assignment"} />
                            <div>Заявки</div>
                        </NavLink>

                        <span onClick={() => this.props.wmenu()} className={(this.props.data.wmenu.display === true) ? "menu-item flex-fill active" : "menu-item flex-fill"}>
                            <i className={"icon-more_horiz"} />
                            <div>Ещё</div>
                        </span>
                    </menu>
                </UI.Footer>
            </>
        );
    }
}
