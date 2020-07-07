import {createStore,applyMiddleware} from 'redux';
import Promise from 'redux-promise'; //actions中允许使用异步
import Thunk from 'redux-thunk';//actions中允许使用异步
import reducer from './reducer' //reducer

const store = createStore(reducer,applyMiddleware(Thunk,Promise)); //创建store

export default store; 


