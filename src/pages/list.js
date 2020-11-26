import React from 'react'
import '../assets/css/list.css'
import { playDetail } from '../utils/axios'

class List extends React.Component {
  constructor() {
    super()
    this.state = {
      playlist: {}
    }
    this.headbg = React.createRef()
    this.headimg = React.createRef()
  }

  query(url) {
    let arr = url.slice(1)
    let newArr = arr.split('&')
    let obj = {}
    newArr.forEach((item, index) => {
      let a = item.split('=')
      obj[a[0]] = a[1]
    })
    return obj
  }

  componentDidMount() {
    let url = this.query(this.props.location.search)
    playDetail({
      id: url.id
    })
      .then(res => {
        if (res.code === 200) {
          this.setState({
            playlist: res.playlist
          })
          this.headbg.current.style.backgroundImage = `url('${res.playlist.coverImgUrl}')`
          this.headimg.current.src = res.playlist.creator.avatarUrl
        }
      })
  }

  toPlay(id) {
    this.props.history.push('/play?id=' + id)
  }

  changeCount(count) {
    if (count / 10000 < 1) {
      return count
    } else if (count / 10000 >= 1 && count / 100000000 < 1) {
      return (count / 10000).toFixed(1) + '万'
    } else if (count / 100000000 >= 1) {
      return (count / 10000).toFixed(1) + '亿'
    }
  }


  render() {
    let { playlist } = this.state

    return (<div id='list'>
      {/* <div className='head'>
        <div className='content'>
          <h2 className='title'>[华语速爆新歌]  陈奕迅淡然呼出爱情无形重量</h2>
          <p className='tag'>每周一更新</p>
          <p className='down'>
            <i>优质华语新歌，网易云音乐每周二精选推荐。</i><br />
            <span><em>本期封面：陈奕迅</em></span>
          </p>
        </div>
      </div> */}

      <div className='listHead'>
        <div className='bg' ref={this.headbg} style={{ "backgroundImage": "url('https://p1.music.126.net/hh7G2R1G51aG_0q3c7lLwQ==/109951165412937994.jpg?imageView=1&type=webp&thumbnail=378x0')" }}></div>
        <div className='img' >
          <img src={playlist.coverImgUrl} />
          <p className='playNum'><i></i>{this.changeCount(playlist.playCount)}</p>
        </div>
        <div className='info'>
          <h2>{playlist.name}</h2>
          <p>
            <img ref={this.headimg} src='https://p2.music.126.net/hh7G2R1G51aG_0q3c7lLwQ==/109951165412937994.jpg?imageView=1&type=webp&thumbnail=378x0' />
            {
              playlist.creator ? playlist.creator.nickname : ''
            }
          </p>
        </div>
      </div>

      <p className='songsListName'>歌曲列表</p>

      <ul className='list'>
        {playlist.tracks ?
          playlist.tracks.map((item, index) => {
            return (<li key={item.id} onClick={this.toPlay.bind(this, item.id)}>
              <h2 className='num'>{index + 1}</h2>
              <div className='left'>
                <p>{item.name}<span>{item.note}</span></p>
                <h6><i></i>{
                  item.ar.map((singer, i, arr) => {
                    let a = arr.length - 1 === i ? '' : ' / '
                    return singer.name + a
                  })
                }{item.al.name ? ' - ' + item.al.name : ''}</h6>
              </div>
              <div className='right'></div>
            </li>)
          }) : []
        }
      </ul>
    </div>)
  }
}
export default List