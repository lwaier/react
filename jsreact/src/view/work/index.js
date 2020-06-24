import React from 'react'
import store from './../../store'
import Q from './components/Q'
import PropTypes from 'prop-types'

export default class Work extends React.Component{
    constructor(){
        super();
        this.state={
            aa : 100
        }
    }
    getChildContext(){
        return {
            userage:105
        }
    }
    setProp(){
        this.setState({
            aa:1222
        })
    }
    render(){
        return(
            <div>
                dsasasdsdasdsa
                <p style={{color:'red'}} onClick={()=>{this.setProp()}}>
                    {store.getState().work.name}
                    {store.getState().learn.aa.bb[0][0].name[0]}
                </p>
                <Q name={this.state.aa}>
                    <span>魔鬼1</span>
                    <span>魔鬼2</span>
                    <span>魔鬼3</span>
                </Q>
            </div>
        )
    }
    renderChild (child) { // 控制内容的分发
       console.log(child,'获取到的child');
    }
}

Work.childContextTypes = {
    userage : PropTypes.number
}