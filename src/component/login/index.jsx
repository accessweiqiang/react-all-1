import React from 'react';
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import {Link} from 'react-router-dom';
import {login} from 'apis/login';
import storage from 'utils/storage';

const FormItem = Form.Item;



class Login extends React.Component{

	handleSubmit = (e) => {
		const {history} = this.props;
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	      	const {password,username} = values;
	      	login(username,password)
	      	.then(res=>{
	      		console.log(res);
	      		if(res.code==="0000"){
	      			message.info(res.msg);
	      			storage.setItem("token",res.data.token);
	      			storage.setItem("username",res.data.username);
	      			history.push('/home')
	      		}else{
	      			message.warning(res.msg);
	      		}
	      	})
	      	.catch(res=>{
	      		console.log(res);
	      	})

	      }
	    });
	}

	render(){
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="login-wrap">
				<Form onSubmit={this.handleSubmit} className="login-form">
					<h1  style={{textAlign:'center',marginBottom:'40px'}}>用户登录</h1>
			        <FormItem>
			          {getFieldDecorator('username', {
			            rules: [{ required: true, message: '请输入用户名!' }],
			          })(
			            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
			          )}
			        </FormItem>
			        <FormItem>
			          {getFieldDecorator('password', {
			            rules: [{ required: true, message: '请输入密码!' }],
			          })(
			            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
			          )}
			        </FormItem>
			        <FormItem>
			          
			          <Button type="primary" htmlType="submit" className="login-form-button">
			            登录
			          </Button>
			          {getFieldDecorator('remember', {
			            valuePropName: 'checked',
			            initialValue: true,
			          })(
			            <Checkbox>记住我</Checkbox>
			          )}
			          <Link to="/regist" style={{float:"right"}}>立即注册</Link>
			        </FormItem>
			      </Form>
			</div>
		)
	}
}

export default Form.create()(Login);