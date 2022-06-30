import React from 'react';

import { Button } from "../Button";

export class Form extends React.Component {

    textSubmit;

    constructor(props){
        super(props);
        this.state = {
            loading: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return false;
        }
    }

    handleSubmit = async (e) => {
        this.setState({ loading: true });
        let validate = this.validate(e);
        await this.props.onSubmit(validate).then( async r => {
            this.setState({ loading: false });
        });
    };

    validate = (e) => {
        e.preventDefault();
        let textsFields = ['text', 'password'];

        let fields = [];
        let errors = false;

        for (let i = 0; i < e.target.elements.length; i++) {
            if(e.target.elements[i].name === '') continue;
            if(e.target.elements[i].min){
                let type = e.target.elements[i].type;

                if(textsFields.indexOf(type) > -1){
                    errors = (e.target.elements[i].value.length < e.target.elements[i].min);
                    if(errors === true){
                        e.target.elements[i].classList.add('is-invalid');
                        e.target.elements[i].classList.remove('border-primary');
                    }else{
                        e.target.elements[i].classList.add('border-primary');
                        e.target.elements[i].classList.remove('is-invalid');
                    }
                }
            }

            fields[e.target.elements[i].name] = e.target.elements[i].value;
        }
        return (errors === true) ? false : fields;
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}
                  method={this.props.method}
                  action={this.props.action}
                  id={this.props.id}
                  className={this.props.className}
            >

                {this.props.children}

                <Button
                    type={"submit"}
                    form={this.props.id}
                    disabled={this.state.loading}
                    className={this.state.loading === true ? "btn btn-primary btn-loading" : 'btn btn-primary'}
                >
                    {this.props.textSubmit}
                </Button>
            </form>
        );
    }
}
