import React from 'react'
import '../../assets/css/search.css'
import axios from 'axios'
import { searchHot, searchInfo, searchMul, searchSug } from '../../utils/axios'

class Search extends React.Component {
  constructor() {
    super()
    this.state = {
      value: '',
      isShow: false,
      isSearch: false,
      listInfo: [],
      hotList: [],
      bestalbum: [],
      bestartist: [],
      allMatch: [],
    }
    this.hotListInfo = React.createRef()
  }

  componentDidMount() {
    axios.all([searchHot()])
      .then(axios.spread((searchHot) => {
        if (searchHot.code === 200) {
          this.setState({
            hotList: searchHot.result.hots
          })
        }
      }))
  }

  del() {
    this.setState({
      value: '',
      isShow: false,
      isSearch: false
    })
  }

  changeVal(e) {
    if (e.target.value != '') {
      searchSug({
        keywords: e.target.value,
        type: 'mobile'
      })
        .then(res => {
          if (res.code === 200) {
            this.setState({
              allMatch: res.result.allMatch ? res.result.allMatch : []
            })
          }
        })
    }

    this.setState({
      value: e.target.value,
      isShow: false,
      isSearch: e.target.value ? true : false
    })
  }

  enter(e) {
    if (e.keyCode === 13 && e.target.value != '') {
      searchInfo({ keywords: e.target.value })
        .then(res => {
          if (res.code === 200) {
            this.setState({
              listInfo: res.result.songs
            })
          }
        })
      searchMul({ keywords: e.target.value })
        .then(res => {
          if (res.code === 200) {
            console.log(res.result);
            this.setState({
              bestalbum: res.result.album ? res.result.album : [],
              bestartist: res.result.artist ? res.result.artist : []
            })
          }
        })
      this.setState({
        isShow: true,
        isSearch: false
      })
    }
  }

  getsearch(i) {
    searchInfo({ keywords: this.state.hotList[i].first })
      .then(res => {
        if (res.code === 200) {
          console.log(res.result);
          this.setState({
            listInfo: res.result.songs
          })
        }
      })
    searchMul({ keywords: this.state.hotList[i].first })
      .then(res => {
        if (res.code === 200) {
          this.setState({
            bestalbum: res.result.album ? res.result.album : [],
            bestartist: res.result.artist ? res.result.artist : []
          })
        }
      })
    this.setState({
      value: this.state.hotList[i].first,
      isShow: true,
      isSearch: false
    })
  }

  toPlay(id) {
    this.props.history.push('/play?id=' + id)
  }

  render() {
    let { value, listInfo, hotList, isSearch, isShow, bestartist, bestalbum, allMatch } = this.state

    let del = value ? <div className='del' onClick={this.del.bind(this)}></div> : '';

    let searching = isSearch ? <h2 className='searching'>搜索"{value}"</h2> : '';

    let searchitem = isSearch ? (<ul className='searchitem'>
      {
        allMatch.map(item => {
          return <li className='searchitem_li' key={item.keyword}>
            <i></i>
            <p>{item.keyword}</p>
          </li>
        })
      }
    </ul>) : ''

    let aims = isShow ? (<div className='content'>
      <h3 className='title'>最佳匹配</h3>
      <ul className='best'>
        {
          bestartist.map(item => {
            return (<li key={item.name}>
              <div className='img'><img src={item.picUrl} /></div>
              <h2 className='singer'>歌手: <span>{item.name}</span>({item.alias[0]})</h2>
              <div className='arrow'></div>
            </li>)
          })
        }
        {
          bestalbum.map(item => {
            return <li key={item.id}>
              <div className='album img'><img src={item.picUrl} /></div>
              <h2 className='albumName singer'>专辑: {item.name}<p><span>{
                item.artists.map((singer, i, arr) => {
                  let a = arr.length - 1 === i ? '' : ' / '
                  return singer.name + a
                })
              }</span></p></h2>
              <div className='arrow'></div>
            </li>
          })
        }

      </ul>

      <ul className='list'>
        {
          listInfo.map(item => {
            return (<li key={item.id} onClick={this.toPlay.bind(this, item.id)}>
              <div className='left'>
                <p>{item.name}</p>
                <h6><i></i><span>{
                  item.ar.map((singer, i, arr) => {
                    let a = arr.length - 1 === i ? '' : ' / '
                    return singer.name + a
                  })
                }</span> - {item.al.name}</h6>
              </div>
              <div className='right'></div>
            </li>)
          })
        }
      </ul>
    </div>) : ''

    let hostSearch = !value ? <div className='hotSeach'>
      <p className='hottitle'>热门搜索</p>
      <ul className='hotList'>
        {
          hotList.map((item, index) => {
            return <li key={item.first} onClick={this.getsearch.bind(this, index)}>{item.first}</li>
          })
        }
      </ul>
    </div> : ''

    return (<div className='search'>
      <div className='inp'>
        <div className='bg'>
          <input type='text' value={value} onChange={this.changeVal.bind(this)} onKeyUp={this.enter.bind(this)} placeholder='搜索歌曲、歌手、专辑' />
          {del}
        </div>
      </div>

      {searching}

      {hostSearch}

      {searchitem}

      {aims}

    </div>)
  }
}
export default Search