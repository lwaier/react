import {createStore,applyMiddleware} from 'redux';
import Promise from 'redux-promise';
import Thunk from 'redux-thunk';
import reducer from './api';

const store = createStore(reducer,applyMiddleware(Thunk,Promise)) 

export default store;