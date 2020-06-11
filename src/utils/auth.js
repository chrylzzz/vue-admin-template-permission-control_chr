import Cookies from 'js-cookie'

// const TokenKey = 'vue_admin_template_token'
const TokenKey = 'chryl_token'

export function getToken() {
  return Cookies.get(TokenKey)
}
/**
 * 这里修改了cookie保存的时间,但是服务关闭,或者窗口关闭还是会清除cookie
 *  那么就需要 修改 removeToken(store/module/user.js),查看哪里删除了toekn
 */
export function setToken(token) {
  // return Cookies.set(TokenKey, token)
  return Cookies.set(TokenKey, token, { expires: 7 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
