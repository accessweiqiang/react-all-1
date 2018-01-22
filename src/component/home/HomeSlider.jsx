import React from 'react';
import {NavLink,withRouter} from 'react-router-dom';
import {Layout,Icon,Menu} from 'antd';
const { Sider } = Layout;


class HomeSlider extends React.Component{
	constructor( props ){
		super(props)
	}

	state = {
	    collapsed: false,
	};

	toggle = () => {
	    this.setState({
	      collapsed: !this.state.collapsed,
	    });
	}

	render(){
    const {match} = this.props;
		return (
			<Sider trigger={null}
        collapsible
        collapsed={this.state.collapsed}
        className="app-slider">
          <div className="trigger"
            onClick={this.toggle}
            >
            <Icon
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            />
          </div>
          <Menu
            mode="inline"
            theme="dark"
          >
            <Menu.Item key="1">
              <NavLink activeClassName="navlink-active" to={`${match.url}/userlist`}>
                <Icon type="user" />
                <span>用户管理</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink activeClassName="navlink-active" to={`${match.url}/chart`}>
                <Icon type="bar-chart" />
                <span>antv-柱形图</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink activeClassName="navlink-active" to={`${match.url}/cmap`}>
                <Icon type="cloud" />
                <span>antv-地图</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="4">
              <NavLink activeClassName="navlink-active" to={`${match.url}/todo`}>
                <Icon type="upload" />
                <span>TodoDemo</span>
              </NavLink>
            </Menu.Item>
          </Menu>
    	</Sider>
		)
	}

}

export default withRouter(HomeSlider);