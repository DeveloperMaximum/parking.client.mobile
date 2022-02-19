import React from 'react';


export class Cell extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            data: props.data
        };
    }

    handlePlace = (e) => {
        console.log(e.target);
    };

    render() {
        let className = `sector-cell tile tile-${this.props.data.gid}`;

        return (
            <>
                <div className={this.props.data.className} onClick={this.handlePlace} />
            </>
        );
    }
}
