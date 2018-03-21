import React, {Component} from 'react';

import './style.scss';

class MultiSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			drop: false,
			selected: [],
			values: []
		}
	}

	handleBlur = (e) => {
		this.setState({
			drop: false
		})
	}

	handleClick = (e) => {
		this.setState({
			drop: !this.state.drop
		})
	}

	handleDelete = (e, id) => {
		this.props.handleDelete(id);
		e.stopPropagation();
	}

	render() {
		let {selected, values} = this.props;

		let rest = [],
			selectedObj = {};

		selected.forEach((v) => {
			selectedObj[v.id] = true;
		});

		values.forEach((v) => {
			if(!selectedObj[v.id]) {
				rest.push(v);
			}
		});

		const dropStyle = this.state.drop 
		? {
			minHeight: '1px'
		}
		: {
			border: 'none',
			height: 0
		}

		const wrapStyle = {
			width: "380px",
			...this.props.style
		}

		return (
			<div className="multi-select-wrap" tabIndex="1000" style={wrapStyle} onClick={this.handleClick} onBlur={this.handleBlur}>
				<div className="multi-selected-values">
					<ul>
					{
						selected.map((item) => (
							<li key={item.id}>
								<span>{item.value}</span>
								<i className="fa fa-times-circle" onClick={(e) => {this.handleDelete(e, item.id)}}></i>
							</li>
						))
						
					}
					{
						selected.length === 0 ? <span className="multi-select-placeholder">{this.props.placeholder}</span> : ''
					}
					</ul>
					<div className="multi-select-drop">
						{
							this.state.drop
							? <i className="fa fa-angle-up"></i>
							: <i className="fa fa-angle-down"></i>
						}
					</div>
				</div>
				<div className="multi-rest-values" style={dropStyle}>
					{
						rest.map((item) => (
							<p key={item.id} onClick={(e) => {this.props.handleSelect(item)}}>
								<span>{item.value}</span>
							</p>
						))
					}
				</div>
			</div>
		)
	}
}

export default MultiSelect;