import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import TodoDemo from 'component/todoDemo/index';
import {Row,Col,Divider} from 'antd';
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from 'actions/index.js';
import {connect} from 'react-redux';



function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed)
  }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function mapStateToProps(state) {
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  }
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({addTodo,setVisibilityFilter,completeTodo},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoDemo);