import React from 'react'
import { Input,Button } from 'antd';
import { UserOutlined,EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import "./login.scss"

export default (props:{history:{}})=>{
    const history = props.history;
    const goToLogin = (url:string)=>{
        (history as {push:(str:string,opt?:{})=>void}).push(url)
    }
    return(
        <div style={{height:'100vh',position:'relative'}}>
            <div className="username">
                <div>
                    账号: 
                </div>
                <div>
                    <Input size="large" placeholder="large size" prefix={<UserOutlined />} />
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
                    />
                </div>
            </div>
            <Button className="button_login" onClick={()=>{ console.log('我登录啦') }}>开启梦幻之旅</Button>
            <div className="go_page go_left" onClick={()=>{goToLogin('/fastlogin')}}>快速登录 {">"}</div>
            <div className="go_page go_right" onClick={()=>{goToLogin('/register')}}>注册账号 {">"}</div>
        </div>
    )
}