import axios from 'axios'

let http = axios.create()

// 请求拦截
http.interceptors.request.use(req => {
//   let userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {}
//   req.headers.authorization = userInfo.token
  return req
})

// 登录拦截
http.interceptors.response.use(res => {
  
  return res.data
})

export default http