import Axios from "axios";
import Qs from "qs";

// 允许Cookies跨域
Axios.defaults.withCredentials = true;

// 挂载环境接口地址，实现通过不同的打包命令切换baseUrl地址
Axios.defaults.baseURL = process.env.VUE_APP_DEV;

const service = Axios.create({
  baseURL: prosecc.env.VUE_APP_DEV,
  timeout: 10000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  },
  withCredentials: true
});

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    service
      .post(url, qs.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
