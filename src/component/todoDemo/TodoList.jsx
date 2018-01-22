import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Todo from 'component/todoDemo/Todo';
export default class TodoList extends Component{
	constructor(props){
		super(props);
	}

	static propTypes={
		onTodoClick:PropTypes.func.isRequired,
		todos:PropTypes.arrayOf(PropTypes.shape({
			text:PropTypes.string.isRequired,
			completed:PropTypes.bool.isRequired
		}).isRequired).isRequired
	}

	render(){
		return(
			<ul style={{textAlign:"left"}}>
				{
					this.props.todos.map( (todo,index)=>
						 (
						 	<Todo {...todo} key={index} 
						 	onClick={ ()=>{this.props.onTodoClick(index)} } >
						 	</Todo>
						)   
					)
				}
			</ul>
		)
	}

}