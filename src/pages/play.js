import React from 'react'
import '../assets/css/play.css'
import qs from 'querystring'
import { getLyric, playUrl, songDetail } from '../utils/axios'
import axios from 'axios'
import $ from 'jquery'

import Img from '../assets/images/needle-ip6.png'

class Play extends React.Component {
  constructor() {
    super()
    this.state = {
      img: Img,
      songUrl: '',
      songDetail: {},
      lyric: '',
      playTime: '00:00',
      flag: false,
    }
    this.audio = React.createRef()
  }

  componentDidMount() {
    let query = this.props.location.search.slice(1)
    axios.all([
      getLyric({
        id: qs.parse(query).id
      }),
      playUrl({
        id: qs.parse(query).id
      }),
      songDetail({
        ids: qs.parse(query).id
      }),
    ])
      .then(axios.spread((playDetail, playUrl, songDetail) => {
        if (playDetail.code === 200) {
          let lyricInfo = "";
          lyricInfo = playDetail.lrc.lyric
          let reg = /\[(.*?)](.*)/g;
          let obj = {}
          lyricInfo.replace(reg, (a, b, c) => {
            b = b.slice(0, 5)
            obj[b] = c
          })
          this.setState({
            lyric: obj
          }, () => {
            let audio = this.audio.current
            audio.ontimeupdate = () => {
              // console.log(audio.currentTime);
              let nowTime = this.formateTime(audio.currentTime)
              if (nowTime in this.state.lyric) {
                this.setState({
                  playTime: nowTime
                }, () => {
                  this.moveLyric()
                })
              }
            }
          })
        }
        if (playUrl.code === 200) {
          this.setState({
            songUrl: playUrl.data[0].url
          })
        }
        if (songDetail.code === 200) {
          this.setState({
            songDetail: songDetail.songs[0]
          })
        }
      }))
  }

  formateTime(timer) {
    let m = (Math.floor(timer / 60) + '').padStart(2, '0')
    let s = (Math.floor(timer % 60) + '').padStart(2, '0')
    return `${m}:${s}`
  }

  // 歌词滚动
  moveLyric() {
    let active = $('.active')[0]
    let index = $('.geci_box').children().index(active);
    $('.geci_box').css('transform', `translateY(-${index * 31}px)`)
  }

  play() {
    this.setState({
      flag: !this.state.flag
    })
    if (this.state.flag) {
      this.audio.current.pause()
      $('.play_icon').css('display', 'block')
    } else {
      this.audio.current.play()
      $('.play_icon').css('display', 'none')
    }
  }

  render() {
    let { img, songDetail, songUrl, lyric, playTime } = this.state

    return (<div className="play">
      <div className="play_top">
        <img src={img} />
      </div>
      <div className="play_img_all">
        <i className="play_icon"></i>
        <div className="play_img_box">
          <div className="small_img" onClick={this.play.bind(this)}>
            <img src={songDetail.al ? songDetail.al.picUrl : ''} />
          </div>
        </div>
      </div>
      <div className="play_txt">
        <div className="play_txt_name">
          <span>{songDetail.ar ?
            songDetail.ar.map((singer, i, arr) => {
              let a = arr.length - 1 === i ? '' : ' / '
              return singer.name + a
            }) : ''
          } </span> - <span>{songDetail.name}</span>
        </div>
        <div className="play_txt_geci">
          <div className="geci_box">
            {
              Object.entries(lyric).map((item, index) => {
                if (playTime == item[0]) {
                  return <p key={index} className='active'>{item[1]}</p>
                } else {
                  return <p key={index} className='unactive'>{item[1]}</p>
                }
              })
            }
          </div>
        </div>
      </div>
      <div className="audio_box">
        <audio ref={this.audio} src={songUrl} autoPlay ></audio>
      </div>
    </div>)
  }
}
export default Play