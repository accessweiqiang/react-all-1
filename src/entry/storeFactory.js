'use strict';
// redux
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
const loggerMiddleware = createLogger();
import DevTools from 'container/DevTools';

import reducers from '../reducers/index.js';



let enhancer;
let middlewares = [thunkMiddleware];
// 而在开发环境中，我们还希望使用一些 redux-devtools 提供的一些 store 增强器。
// UglifyJS 会在构建过程中把一些不会执行的死代码去除掉。
if(process.env.NODE_ENV==='production'){
  enhancer =compose(applyMiddleware(...middlewares));
}else{
  enhancer=compose(
    applyMiddleware(...middlewares,loggerMiddleware),
    DevTools.instrument()
  )

}




function createReduxStore(initialState = []) {
    let store = createStore(reducers, initialState, enhancer);    

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('reducers/index');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
};

const todos = [
  {text:"redux初始值1",completed:false},
  {text:"redux初始值2",completed:true},
  {text:"redux初始值3",completed:false}
]

const store = createReduxStore({todos});
export default store;