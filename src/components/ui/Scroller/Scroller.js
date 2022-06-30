import React from 'react';
import { Swipe } from "./Swipe";


export class Scroller extends React.Component {


	constructor(props){
		super(props);
		this.state = {
			scrollTop: 0,
			scrollHeight: 0
		};

		this.ref = React.createRef();
		this.handleSwipe = this.handleSwipe.bind(this);
	}

	componentDidMount = () => {
		this.setState((prevState) => ({
			...prevState,
		}));

		Swipe(this.ref.current);
		this.ref.current.addEventListener("swipe-down", this.handleSwipe, true);
	};

	componentWillUnmount(){
		this.element = false;
		this.setState = (state, callback) => {
			return false;
		};

		Swipe(this.ref.current, {}, true);
		this.ref.current.removeEventListener("swipe-down", this.handleSwipe, true);
	}

	handleScroll = async (e) => {
		e.persist()
		await this.setState((prevState) => ({ ...prevState, scrollTop: e.target.scrollTop}));
		if(this.props?.nav && this.props.nav === true && e.target.scrollTop > (e.target.scrollHeight / 1.5)){
			this.props?.onNext && this.props.onNext(e);
		}
	};

	handleSwipe(e){
		if(this.state.scrollTop === 0 || this.state.scrollTop < 0){
			this.props?.onSwipe && this.props.onSwipe();
		}
	}

    render() {

        return (
	        <div ref={this.ref} className={`overflow-y-scroll vw-100 h-100`} onScroll={this.handleScroll}>
		        {this.props.children}
	        </div>
        );
    }
}
