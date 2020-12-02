import axios from 'axios';
import { message } from 'antd';
import { BaseURL } from './BaseURL';

let hide = null;
const instance = axios.create({
  timeout: 10000, // 设置超时时间10s
  baseURL: BaseURL, // 根据自己配置的反向代理去设置不同环境的baeUrl
  headers: {
    post: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  },
});

// http状态码信息
const httpCode = {
  400: '请求参数错误',
  401: '权限不足, 请重新登录',
  403: '服务器拒绝本次访问',
  404: '请求资源未找到',
  500: '内部服务器错误',
  501: '服务器不支持该请求中使用的方法',
  502: '网关错误',
  504: '网关超时',
};

/** 添加请求拦截器 * */
instance.interceptors.request.use(
  (config) => {
    // 设置token
    // config.headers.token = '';
    hide = message.loading({ content: 'Loading...', duration: 0 });
    // 返回二进制则转换为 blob
    // if (config.url.includes('pur/contract/export')) {
    //   config.headers.responseType = 'blob';
    // }
    // 文件上传，发送的是二进制流，设置请求头的'Content-Type'
    // if (config.url.includes('pur/contract/upload')) {
    //   config.headers['Content-Type'] = 'multipart/form-data';
    // }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

/** 添加响应拦截器  * */
instance.interceptors.response.use(
  (response) => {
    hide();
    if (response.statusText === 'ok') {
      // 响应结果里的statusText: ok是我与后台的约定，大家可以根据实际情况去做对应的判断
      return Promise.resolve(response.data);
    }
    message.error('响应超时');
    return Promise.reject(response.data.message);
  },
  (error) => {
    hide();
    if (error.response) {
      // 根据请求失败的http状态码去给用户相应的提示
      const tips = error.response.status in httpCode ? httpCode[error.response.status] : error.response.data.message;
      message.error(tips);
      if (error.response.status === 401) {
        // 登录失败/未登录 回到等路也
        // this.props.history.push(LOGIN);
      }
      return Promise.reject(error);
    }
    message.error('请求超时, 请刷新重试');
    return Promise.reject(error);
  }
);

/* 统一封装get请求 */
export const get = (url, params, config = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'get',
      url,
      params,
      ...config,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/* 统一封装post请求  */
export const post = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'post',
      url,
      data,
      ...config,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
