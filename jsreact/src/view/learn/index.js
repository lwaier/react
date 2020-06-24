import React from 'react'
import store from './../../store'
//此组件学习生命周期钩子函数
export default class Learn extends React.Component{
    setAa(){
        store.dispatch({
            type:'000',
            bb:456,
            
        })
    }
    render(){
        return(
            <div>
                <p onClick={()=>{this.setAa()}}>
                    learn
                </p>
                
                <p style={{color:'blue'}}>
                    {store.getState().learn.aa.bb[0][0].name[0]}
                </p>
            </div>
        )
    }
}