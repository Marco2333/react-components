import React, {Component} from 'react';

import './index.scss';

class Pagination extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current: 1,
			pageSize: 5
		}
	}

	componentDidUpdate = (prevProps, prevState) => {
		let {pageSize} = this.state;

		if(this.props.total == 0) {
			return;
		}

		if(this.props.total <= (this.state.current - 1) * pageSize) {
			this.setState({
				current: 1
			});

			let onChange = this.props.onChange;

			onChange && onChange(1, pageSize);
		}
	}
	
	handleClick = (i) => {
		this.setState({
			current: i
		});
		
		let onChange = this.props.onChange,
			{pageSize} = this.state;

		onChange && onChange(i, pageSize);
	}

	handleDecrease = () => {
		if(this.state.current === 1) {
			return;
		}

		let current = this.state.current - 1,
			{pageSize} = this.state;

		this.setState({
			current
		});

		let onChange = this.props.onChange;
		onChange && onChange(current, pageSize);
	}

	handleIncrease = () => {
		let {total = 0} = this.props,
			{pageSize} = this.state;

		if(this.state.current === Math.ceil(total / pageSize)) {
			return;
		}

		let current = this.state.current + 1;

		this.setState({
			current
		});

		let onChange = this.props.onChange;
		onChange && onChange(current, pageSize);
	}

	render() {
		let {total = 0} = this.props,
			{current, pageSize} = this.state;

		let pageArr = [],
			pageCount = Math.ceil(total / pageSize);

		if(pageCount > 8) {
			if(current > 4) {
				pageArr.push(
					<span className="pagination-item" key={1} onClick={(e) => {this.handleClick(1)}}>1</span>,
					<span className="pagination-blank" key={-1}>...</span>
				);

				if(current + 2 - pageCount >= 1) {
					pageArr.push(<span className="pagination-item" key={current - 3} onClick={(e) => {this.handleClick(current - 3)}}>{current - 3}</span>);
				}

				for(let i = current - 2;i <= current + 2 && i <= pageCount;i++) {
					pageArr.push(<span className={`pagination-item ${i == current ? 'active' : ''}`} key={i} onClick={(e) => {this.handleClick(i)}}>{i}</span>);
				}
				if(current + 2 < pageCount) {
					if(current + 3 != pageCount) {
						pageArr.push(<span className="pagination-blank" key={-2}>...</span>);
					}
					pageArr.push(<span className="pagination-item" key={pageCount} onClick={(e) => {this.handleClick(pageCount)}}>{pageCount}</span>);
				}
			}
			else {
				for(let i = 1;i <= current + 2 || i <= 4;i++) {
					pageArr.push(<span className={`pagination-item ${i == current ? 'active' : ''}`} key={i} onClick={(e) => {this.handleClick(i)}}>{i}</span>);
				}
				pageArr.push(<span className="pagination-blank" key={-1}>...</span>);
				pageArr.push(<span className="pagination-item" key={pageCount} onClick={(e) => {this.handleClick(pageCount)}}>{pageCount}</span>);
			}
		}

		else {
			for(let i = 0;i < pageCount;i++) {
				pageArr.push(<span className={`pagination-item ${i + 1 == current ? 'active' : ''}`} key={i + 1} onClick={(e) => {this.handleClick(i + 1)}}>{i + 1}</span>);
			}
		}

		return (
			<div className="pagination">
				<span className={`pagination-item ${current === 1 ? 'inactive' : ''}`} onClick={this.handleDecrease}>
					<i className="fa fa-angle-left"></i>
				</span>
				{
					pageArr
				}
				<span className={`pagination-item ${current === pageCount ? 'inactive' : ''}`} onClick={this.handleIncrease}>
					<i className="fa fa-angle-right"></i>
				</span>
			</div>
		)
	}
}

export default Pagination;