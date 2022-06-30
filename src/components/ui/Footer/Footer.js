import React from 'react';


export class Footer extends React.Component {


    render() {
        return (
            <footer className={this.props?.disabled === true ? `d-flex w-100 top-shadow text-center disabled` : `d-flex w-100 top-shadow text-center`}>

                {this.props.children}

            </footer>
        );
    }
}
