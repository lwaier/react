import React from 'react'
import { Button,message } from 'antd';
import axios from './../../utils/ajax'
import './login.scss'

export default ()=>{
    
    if(localStorage.getItem('userInfo')){
        var username = JSON.parse(localStorage.getItem('userInfo') as string).username
        var password = JSON.parse(localStorage.getItem('userInfo') as string).password
    }

    const login = ()=>{
        axios.post('/lr/login',{
            username,
            password,
            autoFlag:true
        }).then(res=>{
            console.log(res,'登录返回值')
            if(res.data.code === '000007'){
                message.warning('直接登陆已失效,请前往登陆页重新登陆')
                sessionStorage.removeItem("userInfo"); //清空用户信息
                localStorage.removeItem('userInfo');//清空用户信息


                //此处跳转返回登录页

            }else if(res.data.code === '000006'){
                message.warning('不要修改token哦,老老实实去登陆') 


                //此处跳转返回登录页

            }else if(res.data.code === '000000'){
                message.success('登录成功')
                let userInfo = {
                    username,
                }
                sessionStorage.setItem("userInfo",JSON.stringify(userInfo)); //将用户名存入sessionStorage
            }
        })
    }

    return(
        <div style={{height:'100vh',position:'relative'}}>
            <div className="login_mi">
                <div>您已记住通行证:{username}</div> 
                <Button className="mi_login" onClick={login}>直接开启梦幻之旅</Button>
            </div>
        </div>
    )
}