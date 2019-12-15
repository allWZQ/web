import Cookie from "js-cookie";

const admintoken = "admin_token";
const usernamekey = "username";

export function getToken() {
  return Cookie.get(admintoken);
}
export function setToken(token) {
  return Cookie.set(admintoken, token);
}
export function removeToken() {
  return Cookie.remove(admintoken);
}
export function setUserName(value) {
  return Cookie.set(usernamekey, value);
}
export function getUserName() {
  return Cookie.get(usernamekey);
}
export function removeUserNmae() {
  return Cookie.remove(usernamekey);
}
