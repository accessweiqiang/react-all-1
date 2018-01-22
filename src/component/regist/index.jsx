import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,message,Modal } from 'antd';
import {Link } from 'react-router-dom';
import { validatePhone as doValidatePhone } from 'utils/validate';
import {regist as doRegist } from 'apis/login';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const modalConfirm = Modal.confirm;
require("star"); 


class RegistrationForm extends React.Component {

  state = {
  }

  handleSubmit = (e) => {
    const {history} = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values);
      if (!err) {
        const {agreement,password,confirm} = values;
        if(!agreement){
           message.warning('请阅读协议');
           return false;
        }
        if(password!==confirm){
          message.warning("两次密码不一致");
          return false;
        }
        doRegist(values)
        .then((res)=>{
            console.log("返回数据",res);
            if(res.code=="0000"){
              modalConfirm({
                title: '提示',
                content: '恭喜，注册成功，立即登录？',
                okText:"确定",
                cancelText:"取消",
                onOk() {
                  history.push("/login")
                },
                onCancel() {
                }
              });
            }else{
              message.warning(res.msg);
            }
        })
        .catch((error)=>{
            message.error(error.msg)
        });


        
      }
    });
  } 

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  
  validatePhone = (rule,value,callback)=>{
    const form = this.props.form;
    if (value && !doValidatePhone( value) ) {
      callback("手机号码格式错误!");
    }else{
      callback();
    }

  }

  componentDidMount(){
		var window_width = $(window).width();
		var window_height = $(window).height();
		$('#star').regAnimation({
		  window_width: window_width,
		  window_height: window_height,
		  window_background: '#fff',
		  star_count: '100',
		  star_color: '#02c5ff',
		  star_depth: '600'
		});
	}

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (

    <div className="regist-wrap">
      <canvas id="star"></canvas>
      <Form className='regist-form' onSubmit={this.handleSubmit}>
      	<h1>用户注册</h1>
      	<FormItem
          {...formItemLayout}
          label={(
            <span>
              用户名&nbsp;
              <Tooltip title="取个响亮的名字">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="邮箱"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="输入密码"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.checkConfirm,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="确认密码"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password"  />
          )}
        </FormItem>
        
        <FormItem
          {...formItemLayout}
          label="手机号"
        >
          {getFieldDecorator('phone', {
            rules: [{ 
              required: true, message: 'Please input your phone number!' },
              {
              validator: this.validatePhone,
              }],
          })(
            <Input  />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" className="regist-form-button">注册</Button>
        </FormItem>
        <FormItem {...tailFormItemLayout}>
	    	<Row gutter={8}>
				<Col span={12}>
					{getFieldDecorator('agreement', {
			            valuePropName: 'checked',
                  initialValue:true
			          })(
			            <Checkbox >已经阅读<a href="">协议</a></Checkbox>
			          )}
				</Col>
				<Col span={12} style={{textAlign:'right'}}>
          			<Link to="/login">有账号？立即登录</Link>
				</Col>
	    	</Row>
        
        </FormItem>
      </Form>
    </div>

    );
  }
}

export default Form.create()(RegistrationForm);