import request from '@/utils/request'
// import qs from 'qs'

//!!!!!!!!
//注意 使用参数为data ,后台需要用json接收
//而使用其他参数,后台就是普通的form-data接收,但是需要写 params:{ 参数,参数}

//form-data 传递多选择框不成功
// export function goodsList(query) {
//   return request({
//     url: '/goods/list',
//     method: 'post',
//     params: query
//   })
// }

//json 格式 ,因为多选框 后台使用form-data无法接收,注意!!!
export function goodsList(query) {
  return request({
    url: '/goods/list',
    method: 'post',
    data: query
  })
}

export function queryConditions() {
  return request({
    url: '/goods/conditions',
    method: 'get',
  })
}
//data为参数
export function createData(data) {
  return request({
    url: '/goods/create',
    method: 'post',
    data
  })
}
//data为参数
export function updateData(data) {
  return request({
    url: '/goods/update',
    method: 'post',
    data
  })
}

//修改商品的发布状态
export function changeGoodsStatus(data){
  return request({
    url: '/goods/changeGoodsStatus',
    method: 'post',
    data
  })
}
//删除
export function deleteGoods(id){
  return request({
    url: '/goods/deleteGoods/'+id,
    method: 'delete',
  })
}

// export function fetchArticle(id) {
//   return request({
//     url: '/article/detail',
//     method: 'get',
//     params: { id }
//   })
// }

// export function fetchPv(pv) {
//   return request({
//     url: '/article/pv',
//     method: 'get',
//     params: { pv }
//   })
// }

// export function createArticle(data) {
//   return request({
//     url: '/article/create',
//     method: 'post',
//     data
//   })
// }

// export function updateArticle(data) {
//   return request({
//     url: '/article/update',
//     method: 'post',
//     data
//   })
// }
