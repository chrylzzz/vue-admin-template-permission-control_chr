import request from '@/utils/request'

export function goodsList(query) {
  return request({
    url: '/goods/list',
    method: 'get',
    params: query
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
export function updateData(data) {
  return request({
    url: '/goods/update',
    method: 'post',
    data
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
