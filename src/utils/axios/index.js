import http from './axios'

// 推荐歌单
export function recMusic(params) {
  return http.get('/personalized', { params })
}

// 推荐新音乐
export function newSong(params) {
  return http.get('/personalized/newsong', { params })
}

// 热搜列表(简略) 
export function searchHot() {
  return http.get('/search/hot')
}

// 搜索
export function searchInfo(params) {
  return http.get('/cloudsearch', { params })
}

// 搜索多重匹配
export function searchMul(params) {
  return http.get('/search/multimatch', { params })
}

// 搜索建议
export function searchSug(params) {
  return http.get('/search/suggest', { params })
}

// 热歌榜
export function hotSongs() {
  return http.get('/top/list?id=3778678')
}

// 轮播图
export function banner() {
  return http.get('/banner?type=2')
}

// 封装歌单详情
export function playDetail(params){
  return http.get('/playlist/detail',{
      params
  })
}

//获取歌曲详情
export function songDetail(params){
  return http.get('/song/detail',{
      params
  })
}

//获取音乐URL
export function playUrl(params){
  return http.get('/song/url',{
      params
  })
}

//获取歌词
export function getLyric(params){
  return http.get('/lyric',{
      params
  })
}