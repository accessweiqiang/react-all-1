import React from 'react';
import PropTypes from 'prop-types';
import TodoList from 'component/todoDemo/TodoList';
import AddTodo from 'component/todoDemo/AddTodo';
import Footer from 'component/todoDemo/Footer';
import {Row,Col,Divider} from 'antd';
import {Route} from 'react-router-dom';
export default class TodoDemo extends React.Component {
	static propTypes={
		visibleTodos:PropTypes.arrayOf( 
			PropTypes.shape({
			text:PropTypes.string.isRequired,
			completed:PropTypes.bool.isRequired
			}).isRequired
		).isRequired,
		visibilityFilter:PropTypes.oneOf(['SHOW_ALL','SHOW_COMPLETED','SHOW_ACTIVE']).isRequired
	}

	constructor(props){
		super(props);
	}



	render() {
		const {addTodo,visibleTodos,visibilityFilter,completeTodo,setVisibilityFilter,match} = this.props;
		return (
		  <div>
		  	<Row gutter={18}>
				<Col span={8}></Col>
				<Col span={8}>
					<h1>to do list demo</h1>
					<Divider/>
					<AddTodo onAddClick={text=>{ ( addTodo(text) );} }></AddTodo>
					<Divider/>
		    		<TodoList  todos={visibleTodos} onTodoClick={
		    			index=> completeTodo(index) 
		    		}></TodoList>
					<Divider/>
					<Footer filter={visibilityFilter} 
					onFilterChange={
						nextFilter =>{
							setVisibilityFilter(nextFilter ) 
						}
					}
					></Footer>
				</Col>
				<Col span={8}></Col>
			</Row>
		  </div>
		);
	}
}
