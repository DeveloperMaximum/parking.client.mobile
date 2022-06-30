import React from "react";

import { Widget, Sider, Wmenu } from "../ui/Widget";
import { Footer } from "./Footer";
import { DB, User} from "./Api";
import * as Storage from "./../utils/Storage";
import { Camera } from "./Camera";
import { Request } from "../utils/Request";

export const Context = React.createContext({});

export class Provider extends React.Component {


	file = null;


    constructor(props) {
        super(props);

        this.state = {
	        back: {
				func: (e) => console.error,
				history: (e) => console.error
            },

	        themes: {
		        current: 'light',
		        light: {
			        key: 'light',
			        display: 'Темная тема',
			        next: 'dark'
		        },
		        dark: {
			        key: 'dark',
			        display: 'Светлая тема',
			        next: 'light'
		        }
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

	        footer: {
		        prev: false,
	        },

            user: {
                ID: Storage.get('USER_ID'),
                UF_TOKEN: Storage.get('UF_TOKEN'),
                UF_LOCATION: Storage.get('UF_LOCATION'),
            },
        };

	    this.state.themes.current = Storage.get('THEME');
	    if(!this.state.themes.current) this.state.themes.current = 'light';
	    document.querySelector('#CSS').setAttribute('href',
		    document.querySelector('#CSS').getAttribute('href').replace(/(light|dark)/gi, this.state.themes.current)
	    );
    }

	componentDidMount = () => {
		window.addEventListener('app.theme', this.theme);
		window.addEventListener('app.login', this.login);
		window.addEventListener('app.logout', this.logout);
		window.addEventListener('app.update', this.update);

		if(!this.isAuth()){
			//window.dispatchEvent(new CustomEvent(`app.logout`));
		}

		if(window.device.platform.toLowerCase() === 'android') {
			document.addEventListener("backbutton", this.back, false);

			if (this.props.push === 'TEST') {
				this.dialog({
					header: "Запустился через push-уведомления",
					content: "Это тестовое уведомление. По идее, в зависимости от типа сообщения, должно что то происходить. Надо обсуждать"
				}).then(r => r);
			}
		}

		return this.setState((prevState) => ({
			...prevState,
		}));
	};

	componentWillUnmount() {
		window.removeEventListener('app.theme', this.theme);
		window.removeEventListener('app.login', this.login);
		window.removeEventListener('app.logout', this.logout);
		window.removeEventListener('app.update', this.update);

		this.setState = (state, callback) => {
			return false;
		}
	}

	back = async (event) => {
		if(typeof event !== 'object'){
			await this.setState((prevState) => ({
				...prevState,
				app: {
					...prevState.app,
					func: event,
				}
			}));
		}else{
			event.preventDefault();
			this.state.app.func(event);
		}
	};

	theme = async (e) => {
		Storage.save('THEME', e.detail.theme);

		document.querySelector('#CSS').setAttribute('href',
			document.querySelector('#CSS').getAttribute('href').replace(/(light|dark)/gi, e.detail.theme)
		);

		await this.setState((prevState) => ({
			...prevState,
			themes: {
				...prevState.themes,
				current: e.detail.theme
			}
		}));
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

    camera = async (e = false, callback = false) => {
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

    	const scanned = async (scannedCallback) => {
		    window.QRScanner.scan(async (err, content) => {
			    this.setState((prevState) => ({
				    ...prevState,
				    camera: {
					    ...prevState.camera,
					    text: `Сканирование...`
				    }
			    }));
			    window.QRScanner.cancelScan();
			    if(err && err.name !== 'SCAN_CANCELED'){
				    if(await destroy()){
					    return this.dialog({
						    header: "Ошибка сканирования",
						    content: `${err.name}`,
					    });
				    }
			    }else{
				    if(err && err.name === 'SCAN_CANCELED') {
					    return false;
				    }
				    await search(content).then((r) => {
					    if(callback !== false && r !== false){
						    return scannedCallback(r)
					    }else{
					    	return scanned(scannedCallback)
					    }
				    });
			    }
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
		    if(content?.result) content = content.result;

		    let urlArray = content.split('/');
		    let refKey = urlArray[urlArray.length - 1];

		    this.setState((prevState) => ({
			    ...prevState,
			    camera: {
				    ...prevState.camera,
				    text: `Поиск автомобиля`
			    }
		    }));

		    return await Request({
			    URL: `car/?REF_KEY=${refKey}`,
		    }).then((result) => {
			    if(result.success !== true || result?.data?.ITEMS.length !== 1){
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
			    destroy().then(() => {
			    	// todo: здесь нужна условная конструкция, так как после нахождения автомобиля всегда происходит какое то действие
				    /* закрываем камеру, и подсвечиваем активную ссылку */
				    this.toggleFooterLink(true);
				    if(callback === false){
					    this.setState((prevState) => ({
						    ...prevState,
						    camera: { text: false, active: false, loading: false, scanned: false, result: result.data.ITEMS[0] }
					    }));
				    }
			    });
			    return result.data.ITEMS[0];
		    });
	    };

    	if(this.state.camera.active === false){
		    this.back(() => this.camera(false, false));

		    await this.toggleFooterLink();
		    document.getElementsByTagName('body')[0].classList.add('SCANNED');
		    await this.setState((prevState) => ({
			    ...prevState,
			    camera: { text: 'Готовим камеру', active: true, loading: true, scanned: false, result: false }
		    }));
		    window.QRScanner.prepare(async () => {
			    if(!document.getElementsByTagName('body')[0].classList.contains('SCANNED')){
				    return destroy();
			    }
			    window.QRScanner.show(async () => {
				    this.setState((prevState) => ({
					    ...prevState,
					    camera: { text: false, active: true, loading: false, scanned: true, result: false }
				    }));

				    return await scanned(callback);
			    });
		    });
	    }else{
		    this.back(false);
		    await this.toggleFooterLink(true);
		    await destroy();
		    return true;
	    }
    };

	update = async () => {
		window.dispatchEvent(new CustomEvent(`app.dialog`, { detail: {
			header: "Внимание",
			content: "Ваша версия кеша не соответствует серверной и требует обновления.",
			onClose: async () => {
				return DB.Get().then(result => {
					if (result !== false) {
						Object.keys(result).forEach((key) => {
							Storage.save(key, result[key]);
						});
						window.location.reload(true);
					}
				});
			}
		}}));
	};

    login = async (user) => {
	    Storage.save('USER', user);
	    Storage.save('USER_ID', user?.ID);
	    Storage.save('UF_TOKEN', user?.UF_TOKEN);
	    Storage.save('UF_LOCATION', user?.UF_LOCATION);
	    Storage.save('UF_PUSH_TOKEN', user?.UF_PUSH_TOKEN);

	    navigator.splashscreen.show();
	    const update = await this.update();
	    navigator.splashscreen.hide();

	    await this.setState((prevState) => ({
		    ...prevState,
		    user: {
			    ...prevState.user,
			    ID: user.ID,
			    UF_TOKEN: user.UF_TOKEN,
			    UF_LOCATION: user.UF_LOCATION
		    }
	    }));
    };

    logout = () => {
	    return User.Logout().then((result) => {
		    if(result.success === true){
			    localStorage.clear();
			    this.setState((prevState) => ({
				    ...prevState,
				    user: {
					    ...prevState.user,
					    ID: false,
					    UF_TOKEN: false,
					    UF_LOCATION: false
				    }
			    }));
		    }else{
			    return `Не удалось выйти из приложения`
		    }
		    return true;
	    });
    };

    isAuth = () => {
    	return (
		    (this.state.user.ID !== "" && this.state.user.ID !== false) ||
		    (this.state.user.UF_TOKEN !== "" && this.state.user.UF_TOKEN !== false) ||
		    (this.state.user.UF_LOCATION !== "" && this.state.user.UF_LOCATION !== false)
	    )
    };

	location = async (id) => {
		return await User.Location(id).then(result => {
			if(result === true){
				Storage.save('UF_LOCATION', id);
				return this.setState((prevState) => ({
					...prevState,
					user: {
						...prevState.user,
						UF_LOCATION: id
					}
				}), () => true);
			}
			return result;
		});
    };

	wmenu = async () => {
		if(this.state.camera.active === true){
			await this.camera();
			await this.toggleFooterLink(true);
		}else{
			await this.toggleFooterLink(this.state.wmenu.display);
		}
		if(this.state.widget.display === true && this.state.wmenu.display === true){
			await this.widget();
		}

		if(this.state.wmenu.display === false){
			this.back(async () => {
				await this.toggleFooterLink(true);
				this.wmenu()
			});
		}else{
			this.back(false);
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
		    this.back(false);
	    }

	    if(!this.state.widget.display){
		    this.back(() => this.widget());
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

	sider = async (props = false) => {
		if(props === false){
			props = {
				title: false,
				child: false,
				template: true,
				display: false,
				callback: () => {
					this.setState((prevState) => ({
						...prevState,
						sider: {
							...prevState.sider,
							title: false,
							child: false,
							template: true,
							display: false,
						}
					}))
				},
			};
			if(this.state.widget.display === true){
				this.back(() => this.widget());
			}else{
				this.back(false);
			}
		}

		if(this.state.sider.display === false){
			this.back(() => this.sider());
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
	            file: this.file,
                data: this.state,
                login: this.login,
	            logout: this.logout,
	            isAuth: this.isAuth,
                camera: this.camera,
	            location: this.location,
	            wmenu: this.wmenu,
	            sider: this.sider,
	            widget: this.widget,
                accessStatus: this.accessStatus,
            }}>

	            <div className={`wrapper-root-component root-component vw-100 vh-100 overflow-hidden d-flex flex-column ${this.state.sider.display === false ? 'active' : ''}`}>
		            {this.props.children}
	            </div>

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

                <Wmenu
	                {...this.state.wmenu}
	                {...{
		                data: this.state,
	                }}
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
