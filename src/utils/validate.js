/**
 * Created by PanJiaChen on 16/11/18.
 */
import {
  getAllUserName
} from '@/api/user.js'

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 此处asyn await 在本方法查询用户列表,返回集合未实现
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str, valid_map) {
  // const valid_map = ['admin', 'editor']


  // let valid_map = []

  // getAllUserName().then(res=>{
  //   valid_map=res.data
  // }).catch((e) => {});


  // let res = await getAllUserName()
  // valid_map = res.data 
  console.log(valid_map)

  return valid_map.indexOf(str.trim()) >= 0
}
