import request from '@/utils/request'

export function list(query) {
  return request({
    url: '/payment/query',
    method: 'get',
    params: query
  })
}

export function detail(query) {
  return request({
    url: '/payment/detail',
    method: 'get',
    params: query
  })
}

export function handle(data) {
  return request({
    url: '/payment/edit',
    method: 'post',
    data
  })
}
