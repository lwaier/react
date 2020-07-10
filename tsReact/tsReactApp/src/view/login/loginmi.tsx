import React from 'react'
import { Button,message,Modal,notification  } from 'antd';
import axios from './../../utils/ajax'
import {Ihistory} from './../../common/interface'
import './login.scss'

export default (prop:Ihistory)=>{
    
    const goLogin =()=>{
        prop.history.push('/login')
    }
    const messagetext = ()=>{  
        notification.open({
            message: '注意事项',
            description:'使用记住密码功能后,本站会将用户的密码加密保存在本地,通过加密密码登录,无需担心原始密码泄露,但拥有加密密码也可登录,若担心由于自己疏忽而导致在其他设备(如在网咖使用记住密码功能的网咖电脑)上的加密密码泄露,重新设置原始密码即可保证账号安全',
        });
    }

    const warningFn=(type:number)=>{
        Modal.warning({
            title: '直接登陆失效,请重新登录',
            content: type===0?'距离上次密码登陆已有7天,系统需要重新验证身份':type===1?'token发生意外错误,导致该密码错误,请前往登录页重新登录':type===2?'请前往登录页重新登录':type===3?'token发生意外错误,请前往登录页重新登录':'',
            onOk(){
                console.log('我要去登录页')
                goLogin()
            } 
        });
    }


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
            if(res.data.code === '000008'){
                //000005 则代表本地localstorage中的用户名错误
                warningFn(3)
                //此处跳转返回登录页
            }else if(res.data.code === '000007'){
                sessionStorage.removeItem("userInfo"); //清空用户信息
                localStorage.removeItem('userInfo');//清空用户信息
                warningFn(0)
                //此处跳转返回登录页

            }else if(res.data.code === '000006'){
                sessionStorage.removeItem("userInfo"); //清空用户信息
                localStorage.removeItem('userInfo');//清空用户信息
                warningFn(1)
                //此处跳转返回登录页
            }else if(res.data.code === '000005'){
                //000005 则代表本地localstorage中的用户名错误
                warningFn(2)
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
            <div className="go_page go_right" onClick={goLogin}>
                密码登录 {">"}
            </div>
            <div className="go_page go_left" onClick={messagetext}>
                注意事项 {">"}
            </div>
        </div>
    )
}