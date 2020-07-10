import React, { useState } from 'react'
import { Input,Button, message ,Checkbox } from 'antd';
import { UserOutlined,EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import "./login.scss"
import {Ihistory,Icheckbox} from './../../common/interface'
import {getValue} from './../../common/api'
import axios from './../../utils/ajax'

export default (props:Ihistory)=>{
    const history = props.history;
    const goToLogin = (url:string)=>{
        history.push(url)
    }

 
    const [username,setUsername] = useState(''); //用户名
    const [password,setPassword] = useState(''); //密码
    const [miFlag,setMiFlag] = useState(false); //是否记住密码
 
    const setUsernameFn = (value:string)=>{
        setUsername(value)
    }
    const setPasswordFn = (value:string)=>{
        setPassword(value)
    }
    const miFlagFn = (data:Icheckbox)=>{
        setMiFlag(data.target.checked);
    }

    const login = ()=>{
        console.log(username,'获取到的username值')
        console.log(password,'获取到的password值')
        console.log(miFlag,'获取到的是否记住密码的值')
        axios.post('/lr/login',{
            username,
            password,
            miFlag 
        }).then(res=>{
            console.log(res,'登录返回值')
            if(res.data.code === '000005'){
                message.warning('用户名或密码错误')
            }else if(res.data.code === '000006'){
                message.warning('用户名或密码错误')
            }else if(res.data.code === '000000'){
                message.success('登录成功')
                let userInfo = {
                    username,
                }
                sessionStorage.setItem("userInfo",JSON.stringify(userInfo)); //将用户名存入sessionStorage
                if(res.data.result){
                    let userInfo = {
                        username,
                        password:res.data.result
                    }
                    localStorage.setItem("userInfo",JSON.stringify(userInfo))
                }; //如果用户点击了记住密码则将密码存入localstorage

                //跳转到内容页
                if(localStorage.getItem('beforeLoginPath')){
                    props.history.push(localStorage.getItem('beforeLoginPath') as string)
                }else{
                    props.history.push('/home/index')
                }

            }
        })
    }


    return(
        <div style={{height:'100vh',position:'relative'}}>
            <div className="username">
                <div>
                    账号: 
                </div>
                <div>
                    <Input size="large" placeholder="large size" prefix={<UserOutlined />} onChange={(data)=>{getValue(data,setUsernameFn)}}/>
                </div>
            </div>
            <div className="password">
                <div>
                    密码: 
                </div>
                <div>
                    <Input.Password
                        size="large" 
                        placeholder="input password"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        onChange={(data)=>{getValue(data,setPasswordFn)}}
                    />
                </div>
            </div>
            <div className="miflag">
                <span style={{marginRight:'.2rem'}}>是否记住密码</span>
                <Checkbox onChange={miFlagFn}></Checkbox>
            </div>

            <Button className="button_login" onClick={login}>开启梦幻之旅</Button>
            <div className="go_page go_left" onClick={()=>{goToLogin('/fastlogin')}}>快速登录 {">"}</div>
            <div className="go_page go_right" onClick={()=>{goToLogin('/register')}}>注册账号 {">"}</div>
        </div>
    )
}