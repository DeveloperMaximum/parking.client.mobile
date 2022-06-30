import React from 'react';

export class Status extends React.Component {


	render(){
		const icon = (this.props.car?.NECESSITATE_TOTAL > 0) ? 'build bg-danger text-light' : 'mood bg-blue text-light';

		return (
			<div className="status-wrapper alert alert-info">
				<i className={`text-center icon icon-${icon}`} />
				<span className='text-muted'>Статус</span>
				<div className="text-body">
					{this.props.car?.STATUS_NAME}
				</div>
			</div>
		);
	};
}
