import React from 'react';
import { Link,withRouter} from 'react-router-dom';
import {loginout} from 'apis/login';
import {Layout,Menu,Dropdown,Avatar,Icon} from 'antd';
import storage from 'utils/storage';

const { Header} = Layout;

class HomeHeader extends React.Component {

  constructor(props){
    super(props);
  }

  handleMenuClick=(e)=>{
      
      const {history} = this.props;
      if(e.key&&e.key=="2"){
        loginout().then(json=>{
          if(json.code==="0000"){
            storage.removeItem("token");
            history.push('/login');
            setTimeout(() => {
              window.location.reload()
            }, 500)
          }
        })
      }
  }  



  render(){
    const username = storage.getItem("username");
   const userMenu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="2" >
          <span>退出登录</span>
        </Menu.Item>
      </Menu>
    )
    return (
      <Header className="app-header">
        <span className="logo"></span>
        <div className="user-info">
          <Avatar size="small" icon="user"  /> 
          <span style={{margin:"0px 10px "}}>欢迎，{username}</span>
          <Dropdown overlay={userMenu}>
            <span>
               <Icon type="down" />
            </span>
          </Dropdown>
        </div>
      </Header>
    )
  }

}


export default withRouter(HomeHeader);