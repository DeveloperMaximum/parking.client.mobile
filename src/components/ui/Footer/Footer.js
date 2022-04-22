import React from 'react';
import { NavLink } from "react-router-dom";


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
                <footer className={this.props.data.sider.display || this.props.isAuth() === false ? `d-flex w-100 text-center disabled` : `d-flex w-100 text-center`}>
                    <menu className="d-flex w-100 text-center static">
                        <NavLink onClick={this.handleClick} data-type="link" activeclassname={'active'} to={"/home"} id={"home"} className={"menu-item flex-fill"}>
                            <i className={"icon-directions_car"} />
                            <div>Парковка</div>
                        </NavLink>

                        <span onClick={() => this.props.camera().then((result) => {
                        	console.log(result)
                        })} data-type="camera" id={"qr"} className={(this.props.data.camera.active === true) ? "menu-item flex-fill active" : "menu-item flex-fill"}>
                            <i className={"icon-qr_code"} />
                            <div>QR-код</div>
                        </span>

                        <NavLink onClick={this.handleClick} data-type="link" activeclassname={'active'} to={"/map"} id={"map"} className={"menu-item flex-fill"}>
                            <i className={"icon-dashboard"} />
                            <div>Карта</div>
                        </NavLink>

                        <span onClick={() => this.props.wmenu()} data-type="wmenu" id={"more"} className={(this.props.data.wmenu.display === true) ? "menu-item flex-fill active" : "menu-item flex-fill"}>
                            <i className={"icon-more_horiz"} />
                            <div>Ещё</div>
                        </span>
                    </menu>
                </footer>
            </>
        );
    }
}
