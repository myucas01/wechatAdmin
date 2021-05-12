import request from '@/utils/request'
import Qs from 'qs'

export function listOrder(query) {
  return request({
    url: '/order/list',
    method: 'get',
    params: query,
    paramsSerializer: function(params) {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    }
  })
}

export function detailOrder(id) {
  return request({
    url: '/order/detail',
    method: 'get',
    params: { id }
  })
}

export function exportExcel(query) {
  return request({
    url: '/order/exportOrder',
    method: 'get',
    params: query,
    //responseType: 'arraybuffer'
  })
}

// export function exportExcel(url) {
//   return  request.get(url,{responseType: 'arraybuffer'})
//   .then(
//     function(res) {
//       return res
//     }.bind(this)
//   )
//   .catch(
//     function(error) {
//       alert("网络请求出错");
//     }.bind(this)
//   );
// }

export function shipOrder(data) {
  return request({
    url: '/order/ship',
    method: 'post',
    data
  })
}

export function refundOrder(data) {
  return request({
    url: '/order/refund',
    method: 'post',
    data
  })
}

export function replyComment(data) {
  return request({
    url: '/order/reply',
    method: 'post',
    data
  })
}

export function remarks(data) {
  return request({
    url: '/order/remarks',
    method: 'post',
    data
  })
}

export function ship(data) {
  return request({
    url: '/order/ship',
    method: 'post',
    data
  })
}

export function count() {
  return request({
    url: '/order/count',
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: '/order/update',
    method: 'post',
    data
  })
}
