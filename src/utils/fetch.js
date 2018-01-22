import axios from 'axios';
import React from 'react';
import { message, Modal } from 'antd';
import store from '../entry/storeFactory.js';
import storage from "./storage.js";
const confirm = Modal.confirm;
// 创建axios实例
const service = axios.create({
    baseURL: '/devData', // api的base_url
    timeout: 5000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
    // Do something before request is sent
    let token = window.localStorage.getItem("token");
    if (token) {
        config.headers['token'] = token; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
     }
    return config;
}, error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
    response => {
        /**
         * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
         * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
         */
        const res = response.data;
        message.destroy();
        if (res.code !== "0000") {
            // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
            if (res.code === "50008" || res.code === "50012" || res.code === "50014") {
                confirm({
                    title: '提示',
                    content: res.msg,
                    okText:"确定",
                    cancelText:"取消",
                    onOk() {
                        storage.removeItem("token");
                        window.location.reload();
                    },
                    onCancel() {
                    }
                });
            }else{
                message.warning(res.msg);
            }
            return Promise.reject(res);
        } else {
            return Promise.resolve(res);
        }
    },
    error => {

        /*if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);*/
        let err = null;
        if (error.response) {
            err = error.response.data
        } else if (error.data) {
            err = { error: error.data }
        }
        console.log(err)
        message.error(err || err.msg, 3);
        return Promise.reject(err);
    }
);

export default service;