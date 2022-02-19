import React from 'react';


export class Header extends React.Component {

    render() {

        return (
            <>
                <header>

                    {this.props.children}

                </header>
            </>
        );
    }
}
