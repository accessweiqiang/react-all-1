import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';

class Footer extends Component{
	static propTypes ={
		onFilterChange:PropTypes.func.isRequired,
		filter:PropTypes.oneOf(['SHOW_ALL','SHOW_COMPLETED','SHOW_ACTIVE']).isRequired
	}
	constructor(props){
		super(props);
		this.renderFilter = this.renderFilter.bind(this);
	}
	renderFilter(filter,name){
		if(filter===this.props.filter){
			return name
		}

		return (
			<a href="#" onClick={e=>{
				e.preventDefault();
				this.props.onFilterChange(filter)
			}}>
				{name}
			</a>
		)
	}
	render(){
		return (
			<p>
				Show:
				{' '}
				{this.renderFilter('SHOW_ALL','All')}
				{', '}
				{this.renderFilter('SHOW_COMPLETED','Completed')}
				{', '}
				{this.renderFilter('SHOW_ACTIVE','Active')}
				.
			</p>
		)
	}
}

export default Footer;