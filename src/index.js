// 引入核心库
import React from 'react'
// 引入DOM库
import ReactDOM from 'react-dom'
// 全局引入rem.js文件
import './assets/js/remScale'
// import './assets/js/flexible'
// 全局引入重置样式
import './assets/css/reset.css'
// import './assets/css/normalize.css'

// 引入渲染的组件
import App from './App'
// 引入路由模式
import { BrowserRouter } from 'react-router-dom'
// import { HashRouter } from 'react-router-dom'
// 执行渲染函数
ReactDOM.render(<BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
</BrowserRouter>, document.getElementById('root'))