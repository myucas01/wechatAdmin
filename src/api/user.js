import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  })
}

export function fetchSave(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

export function fetchAdd(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

export function listAddress(query) {
  return request({
    url: '/address/list',
    method: 'get',
    params: query
  })
}

export function resetPwd(query) {
  return request({
    url: '/user/reset_pwd',
    method: 'get',
    params: query
  })
}

export function listCollect(query) {
  return request({
    url: '/collect/list',
    method: 'get',
    params: query
  })
}

export function listFeedback(query) {
  return request({
    url: '/feedback/list',
    method: 'get',
    params: query
  })
}

export function listFootprint(query) {
  return request({
    url: '/footprint/list',
    method: 'get',
    params: query
  })
}

export function listHistory(query) {
  return request({
    url: '/history/list',
    method: 'get',
    params: query
  })
}

// 企业列表
export function companyList(query) {
  return request({
    url: '/company/list',
    method: 'get',
    params: query
  })
}

// 企业详情
export function companyRead(query) {
  return request({
    url: '/company/read',
    method: 'get',
    params: query
  })
}

// 企业列表新增
export function companyAdd(data) {
  return request({
    url: '/company/add',
    method: 'post',
    data
  })
}

// 企业列表编辑
export function companyEdit(data) {
  return request({
    url: '/company/update',
    method: 'post',
    data
  })
}

// 企业账号
export function companyUserList(query) {
  return request({
    url: '/company/account/list',
    method: 'get',
    params: query
  })
}

// 企业账号新增
export function companyUserAdd(data) {
  return request({
    url: '/company/account/add',
    method: 'post',
    data
  })
}

// 企业账号详情
export function companyUserRead(query) {
  return request({
    url: '/company/account/detail',
    method: 'get',
    params: query
  })
}

// 企业账号编辑
export function companyUserEdit(data) {
  return request({
    url: '/company/account/update',
    method: 'post',
    data
  })
}

// 行政区域
export function regionClist(query) {
  return request({
    url: '/region/list',
    method: 'get',
    params: query
  })
}

// 子公司信息列表
export function companySonList(query) {
  return request({
    url: '/company/sonList',
    method: 'get',
    params: query
  })
}

// 查询收货地址详细信息
export function receivingAddress(query) {
  return request({
    url: '/address/detail',
    method: 'get',
    params: query
  })
}

// 修改企业收货地址
export function receivingAddressUpdate(query) {
  return request({
    url: '/address/update',
    method: 'post',
    data: query
  })
}

// 查看操作日志
export function logList(query) {
  return request({
    url: '/log/list',
    method: 'get',
    params: query
  })
}
