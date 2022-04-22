import React from "react";

import { Widget, Sider, Wmenu } from "../ui/Widget";
import { Dialog } from "../ui/Dialog";
import { DB, User} from "./Api";
import {Car, Storage} from "./../App";
import { Camera } from "./Camera";
import { Request } from "../utils/Request";
import { Stick } from "../App/Stick";
import {Footer} from "../ui/Footer";
import {Root} from "../ui/Root";

export const Context = React.createContext({});

export class Provider extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            app: {

            },

            camera: {
	            text: false,
	            result: false,
	            active: false,
	            loading: false,
	            scanned: false,
            },

	        widget: {
		        child: false,
		        header: false,
		        display: false,
		        right: {
			        text: false,
			        callback: false
		        }
            },

	        sider: {
		        title: false,
		        child: false,
		        template: true,
		        display: false,
		        callback: () => this.sider(false),
            },

	        wmenu: {
		        display: false
            },

	        dialog: {
		        buttons: [],
	            header: "Внимание!",
	            content: "",
		        child: false,
	            display: false
            },

	        stick: {
		        display: false,
		        text: false
	        },

	        footer: {
		        prev: false,
	        },

            user: {
                USER_ID: Storage.get('USER_ID'),
                UF_TOKEN: Storage.get('UF_TOKEN'),
                UF_LOCATION: Storage.get('UF_LOCATION'),
            },
        };
    }

	componentDidMount = () => {
		return this.setState((prevState) => ({
			...prevState,
		}));
	};

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		}
	}

    appUpdate = async () => {
        return DB.get().then((result) => {
            if(result !== false){
                Object.keys(result).forEach((key) => {
                    Storage.save(key, result[key]);
                });
            }
            return result;
        });
    };

    accessStatus(status){
    	let matrix = Storage.get('ACCESS_STATUSES');
    	let user = Storage.get('USER');
	    for (let role in user.ROLES){
	    	if(matrix[role] && matrix[role].includes(status)){
			    return true;
		    }
	    }
	    return false;
    }

    camera = async (e = false) => {
    	if(e !== false){
		    e.persist();
	    }

	    if(this.state.wmenu.display === true){
		    await this.setState((prevState) => ({
			    ...prevState,
			    wmenu: {
				    ...prevState.wmenu,
				    display: !this.state.wmenu.display
			    }
		    }));
	    }

	    if(this.state.widget.display === true){
		    await this.setState((prevState) => ({
			    ...prevState,
			    widget: {
				    ...prevState.widget,
				    display: false
			    }
		    }));
	    }

    	const scanned = () => {
		    return new Promise((resolve, reject) => {
			    window.QRScanner.scan((err, content) => {
				    this.setState((prevState) => ({
					    ...prevState,
					    camera: {
						    ...prevState.camera,
						    text: `Сканирование...`
					    }
				    }));
				    window.QRScanner.cancelScan();
				    if(err && err.name !== 'SCAN_CANCELED'){
					    if(destroy()){
						    return this.dialog({
							    header: "Ошибка сканирования",
							    content: `${err.name}`,
						    });
					    }
				    }else{
					    return resolve(search(content.result));
				    }
			    });
		    });
	    };

    	const destroy = async () => {
		    document.getElementsByTagName('body')[0].classList.remove('SCANNED');
		    window.QRScanner.getStatus(status => {
			    window.QRScanner.disableLight();
			    window.QRScanner.cancelScan();
			    window.QRScanner.hide();
			    window.QRScanner.destroy();
		    });
		    await this.setState((prevState) => ({
			    ...prevState,
			    camera: { text: false, active: false, loading: false, scanned: false, result: false }
		    }));
		    return true;
	    };

    	const search = async (content) => {
		    // todo: refKey это последний элемент URL
		    let urlArray = content.split('/');
		    let refKey = urlArray[urlArray.length - 1];

		    this.setState((prevState) => ({
			    ...prevState,
			    camera: {
				    ...prevState.camera,
				    text: `Поиск автомобиля`
			    }
		    }));

		    return Request({
			    URL: `car/?REF_KEY=${refKey}`,
		    }).then(async (result) => {
			    if(result.success !== true || result?.data.length !== 1){
				    this.setState((prevState) => ({
					    ...prevState,
					    camera: {
						    ...prevState.camera,
						    text: `Автомобиль с данным QR не найден в системе`,
					    }
				    }));
				    // todo: QR считан, но автомобиль не найден... что дальше?
				    return false;
			    }

			    /* колбэк после успешного скнаирования и поиска автомобиля */
			    return destroy().then(() => {
			    	// todo: здесь нужна условная конструкция, так как после нахождения автомобиля всегда происходит какое то действие
				    /* закрываем камеру, и подсвечиваем активную ссылку */
				    this.toggleFooterLink(true);
				    this.setState((prevState) => ({
					    ...prevState,
					    camera: { text: false, active: false, loading: false, scanned: false, result: result.data[0] }
				    }));

				    return result.data[0];
			    });
		    });
	    };

    	if(this.state.camera.active === false){
		    await this.toggleFooterLink();
		    document.getElementsByTagName('body')[0].classList.add('SCANNED');
		    await this.setState((prevState) => ({
			    ...prevState,
			    camera: { text: 'Готовим камеру', active: true, loading: true, scanned: false, result: false }
		    }));
		    return new Promise((resolve, reject) => {
			    window.QRScanner.prepare(() => {
				    if(!document.getElementsByTagName('body')[0].classList.contains('SCANNED')){
					    return destroy();
				    }
				    window.QRScanner.show(() => {
					    this.setState((prevState) => ({
						    ...prevState,
						    camera: { text: false, active: true, loading: false, scanned: true, result: false }
					    }));
					    let result = scanned().then((r) => r);
					    if(result === false) scanned().then((r) => r)

					    return resolve(result);
				    });
			    });
		    });
	    }else{
		    await this.toggleFooterLink(true);
		    await destroy();
		    return true;
	    }
    };

    login = async (user = {}) => {
	    Storage.save('UF_TOKEN', user.UF_TOKEN);

	    return DB.get().then((result) => {
		    if(result !== false){
			    Object.keys(result).forEach((key) => {
				    Storage.save(key, result[key]);
			    });
		    }

		    Storage.save('USER', user);
		    Storage.save('USER_ID', user.ID);
		    Storage.save('UF_LOCATION', user.UF_LOCATION);

		    this.setState((prevState) => ({
			    ...prevState,
			    user: {
				    ...prevState.user,
				    USER_ID: Storage.get('USER_ID'),
				    UF_TOKEN: Storage.get('UF_TOKEN'),
				    UF_LOCATION: Storage.get('UF_LOCATION')
			    }
		    }));
		    return result;
	    });
    };

    logout = () => {
        Storage.clear();
        this.setState((prevState) => ({
            ...prevState,
            user: {
                ...prevState.user,
                USER_ID: Storage.get('USER_ID'),
                UF_TOKEN: Storage.get('UF_TOKEN'),
                UF_LOCATION: Storage.get('UF_LOCATION')
            }
        }));
    };

    isAuth = () => ((typeof this.state.user.UF_TOKEN === "string") && (typeof this.state.user.USER_ID === "string") && (typeof this.state.user.UF_LOCATION === "string"));

	location = async (id) => {
		return await User.location({ID: id}).then(async result => {
			Storage.save('UF_LOCATION', result.UF_LOCATION);
			await this.setState((prevState) => ({
				...prevState,
				user: {
					...prevState.user,
					UF_LOCATION: Storage.get('UF_LOCATION')
				}
			}));
		});
    };

	wmenu = async () => {
		if(this.state.camera.active === true){
			await this.camera();
			await this.toggleFooterLink(true);
		}else{
			await this.toggleFooterLink(this.state.wmenu.display);
		}

	    await this.setState((prevState) => ({
		    ...prevState,
		    wmenu: {
			    ...prevState.wmenu,
			    display: !this.state.wmenu.display
		    }
	    }));
    };

    widget = async (props = false) => {
	    if(props === false){
	    	props = {
			    child: false,
			    header: false,
			    display: false,
			    right: {
				    text: false,
				    callback: false
			    }
		    };
	    }
	    await this.setState((prevState) => ({
		    ...prevState,
		    widget: {
			    ...prevState.widget,
			    display: !this.state.widget.display,
			    ...props
		    }
	    }));
    };

    dialog = async (props = false) => {
	    if(props === false){
		    props = {
			    buttons: {},
			    header: "Внимание!",
			    content: "",
			    child: false,
			    display: false
		    };
	    }
        await this.setState((prevState) => ({
            ...prevState,
	        dialog: {
                ...prevState.dialog,
                display: true,
                ...props
            }
        }));
	    return true;
    };

	sider = async (props = false) => {
		if(props === false){
			props = {
				title: false,
				child: false,
				template: true,
				display: false,
				callback: () => this.setState((prevState) => ({
					...prevState,
					sider: {
						...prevState.sider,
						title: false,
						child: false,
						template: true,
						display: false,
					}
				})),
			};
		}
        await this.setState((prevState) => ({
            ...prevState,
	        sider: {
                ...prevState.sider,
		        display: true,
                ...props
            }
        }));
    };

	stick = async (props = false) => {
		if(props === false){
			props = {
				text: false,
				display: false
			};
		}
		await this.setState((prevState) => ({
			...prevState,
			stick: {
				...prevState.stick,
				display: true,
				...props
			}
		}), () => {
			setTimeout(async () => {
				await this.setState((prevState) => ({
					...prevState,
					stick: {
						...prevState.stick,
						display: false,
						...props
					}
				}));
			}, 1500)
		});


	};

	toggleFooterLink = async (restore = false) => {
		let elem = document.querySelector('footer menu .active');
		if(elem && elem.nodeName === 'A'){
			await this.setState((prevState) => ({...prevState, footer: { prev: elem}}));
			this.state.footer.prev.classList?.remove('active');
		}else if(restore === true && this.state.footer.prev !== false){
			this.state.footer.prev.classList.add('active');
			await this.setState((prevState) => ({...prevState, footer: { prev: false}}));
		}
		return elem;
	};

    render() {

        return (
            <Context.Provider value={{
                data: this.state,
                login: this.login,
	            logout: this.logout,
	            isAuth: this.isAuth,
                camera: this.camera,
	            location: this.location,
	            wmenu: this.wmenu,
	            sider: this.sider,
	            widget: this.widget,
	            dialog: this.dialog,
	            stick: this.stick,
                accessStatus: this.accessStatus,
            }}>


	            <Sider
		            {...this.state.sider}
		            close={() => this.setState((prevState) => ({
			            ...prevState,
			            sider: {
				            ...prevState.sider,
				            title: false,
				            child: false,
				            template: true,
				            display: false,
			            }
		            }))}
	            />

                {this.props.children}

                <Stick
	                {...this.state.stick}
	                close={async () => await this.setState((prevState) => ({
		                ...prevState,
		                stick: {
			                ...prevState.stick,
			                display: false,
			                text: false
		                }
	                }))}
                />

	            <Widget
		            {...this.state.widget}
		            close={() => this.setState((prevState) => ({
			            ...prevState,
			            widget: {
				            ...prevState.widget,
				            child: false,
				            header: false,
				            display: false,
				            right: {
					            text: false,
					            callback: false
				            }
			            }
		            }))}
	            />

	            <Dialog
		            {...this.state.dialog}
		            dialog={this.dialog}
		            close={async () => await this.setState((prevState) => ({
			            ...prevState,
			            dialog: {
				            ...prevState.dialog,
				            buttons: {},
				            header: "Внимание!",
				            content: "",
				            child: false,
				            display: false
			            }
		            }))}
	            />

                <Wmenu
	                {...this.state.wmenu}
	                close={() => this.wmenu()}
                />

	            <Camera
		            {...this.state.camera}
		            close={async () => await this.setState((prevState) => ({
			            ...prevState,
			            camera: {
				            text: false,
				            result: false,
				            active: false,
				            loading: false,
				            scanned: false,
			            }
		            }))}
	            />

	            <Footer
		            {...{
			            data: this.state,
			            camera: this.camera,
			            wmenu: this.wmenu,
			            widget: this.widget,
			            isAuth: this.isAuth,
			            toggleLink: this.toggleFooterLink,
		            }}
		            close={async () => await this.setState((prevState) => ({
			            ...prevState,
			            footer: {
				            prev: false
			            }
		            }))}
	            />


            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;
