import React from 'react';

export class Status extends React.Component {


	render(){
		let icon = 'mood';
		let text = this.props.car?.STATUS_NAME;

		if(this.props.car?.NECESSITATE_TOTAL > 0){
			icon = 'build';
			text = 'Нуждается в обслуживании';
		}

		return (
			<div className="status-wrapper bg-info">
				<i className={`text-center icon icon-${icon}`} />
				<span>Статус</span>
				<div className="status-text">
					{text}
				</div>
			</div>
		);
	};
}
