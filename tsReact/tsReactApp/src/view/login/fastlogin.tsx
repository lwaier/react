import React,{useRef,useState} from 'react'
import { Input,Button, message } from 'antd';
import { UserOutlined} from '@ant-design/icons';
import "./login.scss"
import {IinputeValue,Ihistory} from './../../common/interface'
import axios from './../../utils/ajax'


export default (props:Ihistory)=>{
    console.log(props)
    //得到用户输入的数据
    let [username,setUsername] = useState(''); //用户名
    let [usercode,setUsercode] = useState(''); //code值

    const getValue = (data:IinputeValue,code:number)=>{
        data.persist()
        switch(code){
            case 0:
                setUsername(data.target.value);
            return;
            case 2:
                setUsercode(data.target.value);
            return;
            default:
                return ""
        }
    }
    
    //用户点击注册
    const registerFn = ()=>{
        console.log(username)
        console.log(usercode)
        
        if(username===""||usercode===""){
            message.warning('用户名,密码或验证码为空');
            return;
        }

        axios.post('/lr/fastLogin',{username,usercode}).then(res=>{
           console.log(res,'获取的返回值')
           if(res.data.code==='000005'){
                message.warning('用户名错误')
           }else if(res.data.code==='000004'){
                message.warning('验证码不正确')
           }else if(res.data.code==='000003'){
                message.warning('验证码已失效')
           }else if(res.data.code==='000000'){
                message.success('登录成功')
                if(localStorage.getItem('beforeLoginPath')){
                    props.history.push(localStorage.getItem('beforeLoginPath') as string)
                }else{
                    props.history.push('/home/index')
                }
           }
        })
    }


    //用户点击获取验证码
    const [countBefore,countSet] = useState(60) 
    const count = useRef(60); //时间限制60s 用户点击一次获取验证码后需60s后才能再次点击
    let [getCodeFlag,setGetCodeFlag] = useState(true); //注册按钮是否可以点击(标量 - true可点击 false不可点击)
    //用户点击获取验证码
    const getCode = ()=>{

        if(!username){
            message.warning('用户名为空');
            return;
        }; 

        let timer:any; //定时器

        if(!getCodeFlag){
            return;
        }

        axios.post('/lr/getCode',{username,fastLoginCode:true}).then(res=>{
            if(res.data.code === '000000'){
                message.success('发送成功');
                setGetCodeFlag(false); //设置注册按钮为不可点击
                timer=setInterval(()=>{
                    if(count.current<1){
                        clearInterval(timer);
                        setGetCodeFlag(true); //重置按钮为可点击
                        count.current=60
                        countSet(60)
                        timer=null;
                        return;
                    }; //当时间为0s的时候可以继续点击,此时需要清除定时器
                    count.current--;
                    countSet(count.current)
                },1000)
            }else{
                message.error('发送失败');
            }
        })

    }



    const history = props.history;
    const goToLogin = (url:string)=>{
        history.push(url)
    }
    return(
        <div style={{height:'100vh',position:'relative'}}>
            <div className="username">
                <div>
                    账号: 
                </div>
                <div>
                    <Input size="large" maxLength={11} placeholder="large size" prefix={<UserOutlined />} onChange={(data)=>{getValue(data,0)}}/>
                </div>
            </div>
            
            <div className="code_register">
                <div>
                    验证码: 
                </div>
                <div>
                    <Input size="large"  onChange={(data)=>{getValue(data,2)}}></Input>
                </div>
                <div>
                    <Button className="get_code_button" style={{color:countBefore===60?'':'#ccc'}} onClick={getCode}>{countBefore===60?'获取验证码':countBefore+'s后可点击'}</Button>
                </div>
            </div> 
            <Button className="button_login" onClick={registerFn}>立即登录</Button>
            <div className="go_page go_left" onClick={()=>{goToLogin('/register')}}>注册账号 {">"}</div>
            <div className="go_page go_right" onClick={()=>{goToLogin('/login')}}>密码登录 {">"}</div>
        </div>
    )
}