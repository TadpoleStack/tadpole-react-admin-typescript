import CryptoJS from "crypto-js";
import screenfull from "screenfull";
import printJS from "print-js";
const TOKEN = "Tadpole_TOKEN";

/**
 * 设置token
 * @param {token} token
 */
const setToken = (token: string): void => {
  sessionStorage.setItem(TOKEN, token);
};
/**
 * 获取token
 */
const getToken = (): string|null => sessionStorage.getItem(TOKEN);
/**
 * 删除token
 */
const clearToken = (): void => {
  sessionStorage.removeItem(TOKEN);
};
/**
 * 替换eval避免报错
 * @param {eval解析} fn
 */
const evil = (fn: string): any => {
  let Fn = Function; //一个变量指向Function，防止有些前端编译工具报错
  return new Fn("return " + fn)();
};

export {
  setToken,
  getToken,
  clearToken,
  evil,
  CryptoJS,
  screenfull,
  printJS,
};
