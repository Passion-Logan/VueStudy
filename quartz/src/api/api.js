/**
* api接口统一管理
  p: 请求参数
*/
import { get, post } from "./http";

// 用户登录
export const checkLogin = p => post("api/login", p);
