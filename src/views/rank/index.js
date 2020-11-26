import React from 'react'
import '../../assets/css/rank.css'
import { hotSongs } from '../../utils/axios'

class Rank extends React.Component {
  constructor() {
    super()
    this.state = {
      listInfo: [],
      time: ''
    }
  }

  componentDidMount() {
    hotSongs()
      .then(res => {
        console.log(res);
        if (res.code === 200) {
          this.setState({
            listInfo: res.playlist.tracks.slice(0, 20),
            time: res.playlist.updateTime
          })
        }
      })
  }
  toPlay(id) {
    this.props.history.push('/play?id=' + id)
  }

  getTime(time) {
    let m = new Date(time).getMonth() + 1
    let d = new Date(time).getDate()
    return `${m}月${d}日`
  }

  render() {
    let { listInfo, time } = this.state

    return (<div className='rank'>
      <div className='head'>
        <div className='bg'></div>
        <p>更新时间：{ this.getTime(time) }</p>
      </div>
      <ul className='list'>
        {
          listInfo.map((item, index) => {
            return (<li key={item.id} onClick={this.toPlay.bind(this, item.id)}>
              <h2 className='num'>{(index + 1).toString().padStart(2, '0')}</h2>
              <div className='left'>
                <p>{item.name}</p>
                <h6><i></i>{
                  item.ar.map((singer, i, arr) => {
                    let a = arr.length - 1 === i ? '' : ' / '
                    return singer.name + a
                  })
                } - {item.al.name}</h6>
              </div>
              <div className='right'></div>
            </li>)
          })
        }

        {/* <li>
          <h2 className='num'>01</h2>
          <div className='left'>
            <p>如果当时2020<span>(不曾遗忘的符号)</span></p>
            <h6><i></i>许嵩 / 朱婷婷 - 如果当时2020</h6>
          </div>
          <div className='right'></div>
        </li> */}
      </ul>

      <div className='watch'><span>查看完整榜单</span></div>
    </div>)
  }
}
export default Rank