import axios from 'axios';
import qs from 'qs'

// 全局配置
// axios.defaults.headers.common["token"] = ""
// axios.defaults.headers.post["Content-Type"] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = 'http://134.175.100.63:6677';
axios.defaults.baseURL = 'http://127.0.0.1:6677';

// 配置请求拦截
/*
axios.interceptors.request.use(function (config) {
  // 手动将参数转换为查询字符串，为了呼应设置Content-type = 'application/x-www-form-urlencoded;charset=UTF-8';
  if(config.method === "post"){
    config.data = qs.stringify(config.data)
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});
*/

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // 将后台的参数结果设置到response
  let {data} = response;
  response.data = data.data;
  response.status = data.status;
  response.statusText = data.message;
  return response;
}, function (error) {
  return Promise.reject(error);
});

/**
 * 提交post请求 发送的数据为查询字符串，key=val&key=val
*/
export function post(url,data){
  return axios({
    method:"post",
    url,
    data:qs.stringify(data),
    timeout:10000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}

/**
 * 提交post请求 发送的数据为查询字符串，当参数为数组的时候适用该方法
 * ids=1&ids=2
*/
export function post_array(url,data){
  return axios({
    method:"post",
    url,
    data:qs.stringify(data,{arrayFormat:"repeat"}),
    timeout:10000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}
export function post_array_dots(url,data){
  return axios({
    method:"post",
    url,
    data:qs.stringify(data,{allowDots: true}),
    timeout:10000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}
/**
 * 提交post请求 发送的数据为json字符串
*/
export function post_json(url,data){
  return axios({
    method:"post",
    url,
    data,
    timeout:10000
  })
}
export function get (url, params) {
  return axios({
    method: 'get',
    url,
    params, // get 请求时带的参数
    timeout: 10000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
}

export default axios;