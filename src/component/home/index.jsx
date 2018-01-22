import React from 'react';
import {withRouter } from 'react-router-dom';
import { Layout, Menu, Icon,Avatar,Dropdown } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import HomeHeader from 'component/home/HomeHeader';
import HomeSlider from 'component/home/HomeSlider';
import HomeContent from 'component/home/HomeContent';


class Home extends React.Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
        <Layout className="app-layout">
            <HomeHeader/>
            <Layout className="app-main">
                <HomeSlider ></HomeSlider>
                <HomeContent ></HomeContent>
            </Layout>
        </Layout>)
  }
}


export default withRouter(Home);