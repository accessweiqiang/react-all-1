import React from 'react';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import {Layout} from 'antd';
import UserList from 'container/UserList.jsx';
import Chart from 'component/antvg2/chart.jsx';
import CMap from 'component/antvg2/cmap.jsx';
import TodoDemo from 'container/TodoDemo.jsx';
const { Content } = Layout;

class HomeContend extends React.Component{
	constructor (props){
		super( props);
	}

	render(){
		const {match} = this.props;
		return (
			<Content className="app-content">
	          <div style={{ padding: 24, background: '#fff'}}>
				<Switch>
		            <Route path={`${match.url}/userlist`} component={UserList}/>
		            <Route path={`${match.url}/chart`} component={Chart}/>
		            <Route path={`${match.url}/cmap`} component={CMap}/>
		            <Route path={`${match.url}/todo`} component={TodoDemo}/>
		            <Redirect to={`${match.url}/todo`} push={true}  component={UserList}/>
	            </Switch>
	          </div>
	        </Content>
		)
	}
}

export default withRouter(HomeContend);