/**
 * axios的进一步封装;
 */
import axios from 'axios';
import store from '../store';
import router from '../router';

export default function fetchData(options) {
  return new Promise((resolve, reject) => {

    // 以axios的实例作为请求的载体;
    const instance = axios.create({
      // axios的配置;
      // 基础url前缀
      // tips: process.env区分了生产环境和开发环境的不同域名;
      // baseURL: process.env.BASE_API,
      // baseURL: 'http://cnpcportal.sinoapps.cn',
      // timeout: 超时设置;
      timeout: 3000,
      headers: {
        // 'X-Ivanka-Token': store.getters.token
      }
    });

    // 添加请求拦截器;
    instance.interceptors.request.use(
      config => {
        // 发送请求前;
        console.log('发送前')
        return config;
      },
      error => {
        // 请求出错：
        return Promise.reject(error);
      }
    );

    // 添加响应拦截器;
    instance.interceptors.response.use(
      response => {
        console.log('获取相应数据')
        return response;
      },
      error => {
        console.log('响应失败')
        return Promise.reject(error);
      }
    );

    // axios请求处理;
    return instance(options)
      .then(response => response.data)
      .then(result => {
        return resolve(result);
        // 判断响应 --> 并进行统一性的处理;
        // if (result.code !== 0) {
        //   console.log(options);  // 调试;
        //   // 统一进行的错误处理;


        //   reject(result);
        // } else {
        //   resolve(result);
        // }
      })
      .catch(error => {
        console.log(error); // 调试使用;
        reject(error);
      });
  })
};
