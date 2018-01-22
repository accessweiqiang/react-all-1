import 'react-hot-loader/patch';
import 'babel-polyfill';
//样式
import "style/index.scss"
//mockjs
import '../mock/index.js'
//react
import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router , HashRouter} from 'react-router-dom';
import {browserHistory } from 'react-router'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
// top entry
import App from 'component/app.jsx';
import $ from 'jquery';
import store from './storeFactory.js';
const appRender = Component => {
    render(
    <AppContainer>
      <Provider store={store}>
          <Router >
            <div>
                <Component />
            </div>
          </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  )
}
 
appRender(App)

 
// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept();
}