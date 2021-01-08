import axios from "axios";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "@/utils/public";
const baseURL = "/";
const timeout = 80 * 1000;
const ajax = axios.create({
  baseURL,
  timeout,
});

ajax.interceptors.request.use(
  (config) => {
    Nprogress.start();
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    } else {
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ajax.interceptors.response.use(
  (res) => {
    Nprogress.done();
    let errcode = res.data.errcode;
    if (errcode === 10001) {
      sessionStorage.clear();
      return Promise.reject(res);
    } else if (errcode === 10000) {
      return Promise.reject(res);
    }
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default ajax;
