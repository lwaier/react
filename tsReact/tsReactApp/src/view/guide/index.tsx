//引导页
import React,{useEffect} from 'react';
import Swiper from "swiper";
import './index.scss'
import { Button } from 'antd';
import {Ihistory} from './../../common/interface'

export default (props:Ihistory)=>{
    const history = props.history;
    const goToLogin = ()=>{
        history.push('/login')
    }

    useEffect(()=>{
        new Swiper('.swiper-container',{
            loop:false,
            pagination: {//小圆点分页
                el: '.swiper-pagination',
                dynamicBullets: true,
            },
        })
    },[]); //只会在加载后执行一次swiper

    return(
        <div style={{width:'100%',height:'100vh'}}>
            <div className='swiper-container' style={{width:'100%',height:'100vh'}}>
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <div className="guide_one">
                            <div>您好!</div>
                            <div>欢迎来到这个梦幻世界</div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="guide_one">
                            <div>自然</div>
                            <div>清新脱俗 尽显自然之美</div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="guide_one">
                            <div>梦幻</div>
                            <div>一面科技 一面梦幻</div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="guide_one">
                            <div>入梦</div>
                            <div>一沙一世界 一叶一菩提</div>
                        </div>
                        <Button className="button_login" onClick={()=>{goToLogin()}}>开启梦幻之旅</Button>
                    </div>
                </div>
                <div className="swiper-pagination"></div>
            </div>
        </div>
    )
}