import React from 'react';
import { Swipe } from "./Swipe";


export class Tabs extends React.Component {


	constructor(props){
		super(props);
		this.state = {
			active: 0
		};

		this.ref = React.createRef();
		this.handleSwipe = this.handleSwipe.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		this.setState((prevState) => ({
			...prevState,
		}));

		Swipe(this.ref.current);
		this.ref.current.addEventListener("swipe-left", this.handleSwipe, true);
		this.ref.current.addEventListener("swipe-right", this.handleSwipe, true);
	}

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		};

		Swipe(this.ref.current, {}, true);
		this.ref.current.removeEventListener("swipe-left", this.handleSwipe);
		this.ref.current.removeEventListener("swipe-right", this.handleSwipe);
	}

	handleSwipe(e){
		console.log(e.target);
		let tab = this.ref.current.querySelector('.nav-item.active');

		if(e.detail.dir === 'left'){
			if(tab.nextSibling !== null){
				tab.nextSibling.click();
			}
		}else if(e.detail.dir === 'right'){
			if(tab.previousSibling !== null){
				tab.previousSibling.click();
			}
		}
	}

	handleClick = async (e) => {
		e.persist();
		if(e.target.classList.contains('active')) return;

		let tabContent = e.target.parentNode.parentNode;
		e.target.parentNode.querySelector('.active').classList.remove('active');
		tabContent.querySelector('.tab-pane.active').classList.remove('active');

		e.target.classList.add('active');
		tabContent.querySelectorAll('.tab-pane')[e._targetInst.key].classList.add('active');
	};

	render() {

		return (
			<div ref={this.ref} className={'h-100'}>
				<div className={"nav nav-tabs flex-row text-center shadow position-fixed w-100 pr-3 pl-3"}>
					{this.props.tabs.map((tab, i) => (
						<div className={`nav-item flex-fill ${i === this.state.active ? 'nav-item flex-fill active ' : 'nav-item flex-fill'}`} key={i} onClick={this.handleClick}>{tab.name}</div>
					))}
				</div>

				<div className="tab-content min-vw-100 vw-100 overflow-x-hidden h-100 d-flex flex-row position-relative">
					{this.props.tabs.map((tab, i) => (
						<div key={i} className={`tab-pane w-100 h-100 overflow-x-hidden ${i === this.state.active ? ' active ' : ' '}`}>
							{tab.children}
						</div>
					))}
				</div>
			</div>
		);
	}
}
