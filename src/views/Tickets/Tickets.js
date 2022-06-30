import React from 'react';

import { Context } from "../../components/App/Context";
import { Ticket } from "../../components/App";
import { Root, Header, Tabs } from "../../components/ui";


export class Tickets extends React.Component {

	static contextType = Context;


	constructor(props){
		super(props);
	}

	componentDidMount = () => {
		this.setState((prevState) => ({
			...prevState,
		}));
	};

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		};
	}

    render() {
        return (
            <Root viewId={"TICKETS"} active={true}>
	            <Header
		            history={this.props.history}
		            title={`Заявки`}
		            back={false}
	            />

                <main>
	                <Tabs tabs={[
		                { name: 'Общие',  children: (
			                <Ticket.List
				                filter={'null'}
			                />
		                )},
		                { name: 'В работе', children: (
			                <Ticket.List
				                filter={'true'}
			                />
		                )},
		                { name: 'Личное', children: (
			                <Ticket.List
				                filter={this.context.data.user.ID}
			                />
		                )}
	                ]}>
	                </Tabs>
                </main>
            </Root>
        );
    }
}
