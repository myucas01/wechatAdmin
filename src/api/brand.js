import request from '@/utils/request'

export function listBrand(query) {
  return request({
    url: '/brand/list',
    method: 'get',
    params: query
  })
}
export function distributeRead(query) { // 查询可配送地址
  return request({
    url: '/distribute/read',
    method: 'get',
    params: query
  })
}
export function distributeInsert(params) { // 配送管理添加配送范围
  return request({
    url: '/distribute/insert',
    method: 'post',
    params
  })
}
export function createBrand(data) {
  return request({
    url: '/brand/create',
    method: 'post',
    data
  })
} 

export function readBrand(data) {
  return request({
    url: '/brand/read',
    method: 'get',
    data
  })
}

export function updateBrand(data) {
  return request({
    url: '/brand/update',
    method: 'post',
    data
  })
}

export function deleteBrand(data) {
  return request({
    url: '/brand/delete',
    method: 'post',
    data
  })
}
