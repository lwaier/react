import React from 'react'
import {Route,Redirect} from 'react-router-dom';
import Login from './login/login'; //登录页
import LoginMi from './login/loginmi'; //登录页
import Register from './login/register'; //注册页页
import Fastlogin from './login/fastlogin'; //快速登录页
import Home from './home/index'

import Guide from "./guide";    //引导页
import './index.scss'

import ActiveRouter from './../components/activeRouter/activeRouter'



export default ()=>{
    return (
        <div>
            {/* <Switch> */}
            <ActiveRouter>
                <Route path="/" exact render={()=><Redirect to="/guide" /> } />
                <Route path="/login" component={Login} />
                <Route path="/loginmi" component={LoginMi} />
                <Route path="/register" component={Register} />
                <Route path="/fastlogin" component={Fastlogin} />
                <Route path="/guide" component={Guide} />
                <Route path="/home" component={Home} />
            </ActiveRouter>
            {/* </Switch> */}
        </div>
    )
}