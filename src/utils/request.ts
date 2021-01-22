import axios from 'axios';

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

const createType = {
    // axios 请求 公共区域
    baseURL: process.env.REACT_APP_BASE_API,
    //超时
    timeout: 1000
}

/**
 * 创建axios实例
 * */
const service = axios.create( createType );

/**
 * 请求拦截器
 * */
service.interceptors.request.use( config => {
    return config;

}, error => {
    Promise.reject((error))
});

/**
 * 响应拦截器
 * */
service.interceptors.response.use( res => {
    const response = res.data;
    return response;

}, error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
})

export default service;
