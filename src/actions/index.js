/*
 * action 类型
 */

import fetch from 'isomorphic-fetch';
export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * 其它的常量
 */

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/*
 * action 创建函数
 */

export function addTodo(text) {
    return function(dispatch) {
        //fetch("http://www.subreddit.com/r/reactjs.json")
        dispatch( { type: ADD_TODO, text:text } )
        
    }

    //return { type: ADD_TODO, text }
}

export function completeTodo(index) {
    return { type: COMPLETE_TODO, index }
}

export function setVisibilityFilter(filter) {
    return { type: SET_VISIBILITY_FILTER, filter }
}