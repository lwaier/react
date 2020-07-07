import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom';
import Login from './login/login'; //登录页
import Register from './login/register'; //注册页页
import Fastlogin from './login/fastlogin'; //快速登录页

import Guide from "./guide";    //引导页



export default ()=>{
    return (
        <div>
            <Switch>
                <Route path="/" exact render={()=><Redirect to="/guide" /> } />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/fastlogin" component={Fastlogin} />
                <Route path="/guide" component={Guide} />
            </Switch>
        </div>
    )
}