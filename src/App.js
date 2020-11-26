import React from 'react'
// 引入一级路由
import Index from './pages/index'
import List from './pages/list'
import Play from './pages/play'
// 引入路由的相关属性
import { Switch, Route, Redirect } from 'react-router-dom'

 class App extends React.Component{
 render(){
  return (<div>
    {/* 一级路由出口 */}
    <Switch>
      <Route path='/index' component={Index}></Route>
      <Route path='/list' component={List}></Route>
      <Route path='/play' component={Play}></Route>
      <Redirect to='/index'></Redirect>
    </Switch>
  </div>)
  }
}
 export default App