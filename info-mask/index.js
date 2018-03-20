import React, {Component} from 'react';

import './style.scss';

class InfoMask extends Component {
	render() {
		return (
			<div className="info-mask">
				<div className="info-detail">
					<p><i className="fa fa-exclamation-circle"></i>{this.props.info}</p>
					<button onClick={this.props.handleClick}>知道了</button>
				</div>
			</div>
		)
	}
}

export default InfoMask;