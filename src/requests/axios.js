import Vue from 'vue'
import axios from 'axios'
import store from '@/store'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // store.state.PROGRESS_BAR = 0;
  // let timer = setInterval(() => {
  //     store.state.PROGRESS_BAR += 1;
  //     if (store.state.PROGRESS_BAR >= 100) {
  //       clearInterval(timer);
  //     }
  // },200);
  config.xsrfCookieName = 'ss_tk';
  config.xsrfHeaderName = 'X-TOKEN-KEY';

  // console.log(config)
  return config;
}, function (error) {
  // Do something with request error
  // store.state.PROGRESS_BAR = 99;
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  // store.state.PROGRESS_BAR = 99;
  // console.log(response);
  let data = response.data;
  if (data.status===1) {
    return Promise.reject(data);
  }
  return data;
}, function (error) {
  // Do something with response error
  // store.state.PROGRESS_BAR = 99;
  return Promise.reject(error);
});
export default axios;

// Vue.prototype.$ajax = axios;
