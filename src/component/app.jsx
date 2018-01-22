import React from 'react';
import {BrowserRouter as Router , HashRouter ,  Route,Link,Switch ,withRouter} from 'react-router-dom';
import {syncHistoryWithStore} from 'react-router-redux'
import reducer from '../reducers/index.js';
import Home from 'container/Home.jsx';
import Login from 'container/Login.jsx';
import Regist from 'container/Regist';
//import PrivateRoute from 'component/common/PrivateRoute.jsx';
import HocPrivateRoute from 'component/common/HocPrivateRoute.jsx';
const  PrivateRoute =  HocPrivateRoute(Route);


 class App extends React.Component{
	constructor (props){
		super( props);
	}
	
	componentDidMount(){
		const {history} = this.props;
		history.listen(function(location,action){
			console.log(location,action)
		});
	}

	render(){

		const props = this.props;
		return(
		    <Switch>
				<Route {...props} path="/login" component={Login} />
				<Route {...props} path="/regist" component={Regist} />
				<PrivateRoute  path="/home"  component={Home} />
				<Route  {...props}  component={Login} />
		    </Switch>
		)
	}
}

export default  withRouter(App);
