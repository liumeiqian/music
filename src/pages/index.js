import React from 'react'
// 引入二级路由
import Recommend from '../views/home'
import Rank from '../views/rank'
import Search from '../views/search'
// 引入路由文件
import { Switch, Route, NavLink, Redirect } from 'react-router-dom'

import Img from '../assets/images/header.png'

import '../assets/css/index.css'

class Index extends React.Component {
  render() {
    return (<div className="index">
      <div className='head'>
        <div className='navTitle'><img src={Img}/></div>
        <div className='navBar'>
          <NavLink activeClassName="active" to='/index/recommend'><span><em>推荐音乐</em></span></NavLink>
          <NavLink activeClassName="active" to='/index/rank'><span><em>排行榜</em></span></NavLink>
          <NavLink activeClassName="active" to='/index/search'><span><em>搜索</em></span></NavLink>
        </div>
      </div>
      {/* 二级路由出口 */}
      <Switch>
        <Route path='/index/recommend' component={Recommend}></Route>
        <Route path='/index/rank' component={Rank}></Route>
        <Route path='/index/search' component={Search}></Route>
        <Redirect to='/index/recommend'></Redirect>
      </Switch>
    </div>)
  }
}
export default Index