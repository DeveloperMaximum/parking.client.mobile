import React from 'react';

export class Status extends React.Component {


	render(){
		const icon = (this.props.car?.NECESSITATE_TOTAL > 0) ? 'build' : 'mood';

		return (
			<div className="status-wrapper bg-info">
				<i className={`text-center icon icon-${icon}`} />
				<span>Статус</span>
				<div className="status-text">
					{this.props.car?.STATUS_NAME}
				</div>
			</div>
		);
	};
}
