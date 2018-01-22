import React,{Component} from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';
import {Form,Input,Button} from 'antd';
import fetch from 'isomorphic-fetch';
const FormItem=Form.Item;

export default class AddTodo extends Component{
	static propTypes ={
		onAddClick:PropTypes.func.isRequired
	}
	constructor(props){
		super(props);
		this.state={
			mystate:"0000"
		}
		this.handlClick = this.handlClick.bind(this);
	} 
	handlClick(e){
		e.preventDefault();
		const node = findDOMNode(this.refs.input);
		const text = node.value.trim();
		if(text){
			let r = this.props.onAddClick(text);
			node.value='';
		}
	}
	render(){
		return (
			<div>
				<Form layout="inline" onSubmit={this.handlClick}>
					<FormItem>
						<Input type="text" ref='input' placeholder="请输入代办事项...."></Input>
					</FormItem>
					<FormItem>
						<Button type="primary" htmlType="submit">添加</Button>
					</FormItem>
				</Form>
			</div>
		)
	}
}

