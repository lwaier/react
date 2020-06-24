import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store'

import 'antd/dist/antd.css'

// ReactDOM.render(
//   //表示严格模式 可以在任何jsx中使用 对一部分代码进行严格模式检查
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const hotRender = ()=>{
  render(
    // <React.StrictMode>
    <App />
 ,
  document.getElementById('root')
  )
}
hotRender()

store.subscribe(hotRender)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
