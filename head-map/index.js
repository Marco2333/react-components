import React, {Component} from 'react';

import './index.scss';

class HeadMap extends Component {
	constructor(props) {
		super(props);

		this.state = {
			url: ''
		}
	}

	handleChange = (e) => {
		let fReader = new FileReader();
			fReader.readAsDataURL(e.target.files[0]);

		fReader.onload = (e) => {
			this.setState({
				url: e.target.result
			});

			this.props.handleChange && this.props.handleChange(e.target.result);
		}
	}

	render() {
		const {url} = this.state;

		return (
			<div className="input-file-wrap">
				<input type="file" accept="image/png, image/jpeg" onChange={this.handleChange}/>
				{
					url 
					? <img src={url} alt=""/>
					: <i className="fa fa-cloud-upload"></i>
				}
			</div>
		)
		
	}
}

export default HeadMap;